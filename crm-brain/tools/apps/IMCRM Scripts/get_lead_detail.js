/**
 * IMCRM Lead Detail Extractor
 * Usage: node get_lead_detail.js <REF_ID>
 * Example: node get_lead_detail.js DDXHGFKQ
 *
 * Saves Google session to avoid re-authenticating each run.
 */

const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2];
if (!REF_ID) {
  console.error('Usage: node get_lead_detail.js <REF_ID>');
  process.exit(1);
}

const LEAD_URL = `https://imcrm.alfred.ae/quotes/health/${REF_ID}`;
const SESSION_DIR = path.join(__dirname, 'crm-session');

async function login(page) {
  await page.click('text="Google Login"');
  await page.waitForURL('**/accounts.google.com/**');

  await page.fill('input[type="email"]', process.env.IMCRM_EMAIL || process.env.EMAIL);
  await page.click('#identifierNext, button:has-text("Next")');
  await page.waitForTimeout(1500);

  await page.fill('input[type="password"]', process.env.IMCRM_PASSWORD || process.env.PASSWORD);
  await page.click('#passwordNext, button:has-text("Next")');

  await page.waitForURL('**/imcrm.alfred.ae/**', { timeout: 30000 });
}

function extractText(cells, index) {
  return cells[index] ? cells[index].innerText.trim() : '';
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, {
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(LEAD_URL);

  // Auto-login if session is missing or expired
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(LEAD_URL);
  }

  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });

  // Expand Member Details
  const memberBtn = page.locator('button:has-text("Member Details")');
  if (await memberBtn.count() > 0) {
    await memberBtn.first().click();
    await page.waitForTimeout(800);
  }

  const data = await page.evaluate(() => {
    const text = (el) => (el && el.innerText ? el.innerText.trim() : '');

    let refId = '', createdDate = '';
    let firstName = '', lastName = '', mobile = '', email = '',
        nationality = '', dob = '', gender = '', emirate = '',
        memberCategory = '';

    // Ref-ID is stored in a custom generic pair, not a dt/dd
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && text(el) === 'Ref-ID') {
        refId = text(el.nextElementSibling);
      }
    });

    document.querySelectorAll('dt').forEach(dt => {
      const key = text(dt).toUpperCase();
      const val = text(dt.nextElementSibling);
      if (key === 'CREATED DATE')   createdDate   = val;
      if (key === 'FIRST NAME')     firstName     = val;
      if (key === 'LAST NAME')      lastName      = val;
      if (key === 'MOBILE NUMBER')  mobile        = val;
      if (key === 'EMAIL')          email         = val;
      if (key === 'NATIONALITY')    nationality   = val;
      if (key === 'DATE OF BIRTH')  dob           = val;
      if (key === 'GENDER')         gender        = val;
      if (key === 'EMIRATE OF VISA') emirate      = val;
      if (key === 'MEMBER CATEGORY') memberCategory = val;
    });

    // Members table — header row contains "MEMBER NAME" or "Member Name"
    const memberTable = Array.from(document.querySelectorAll('table')).find(
      t => t.innerText && (t.innerText.includes('MEMBER NAME') || t.innerText.includes('Member Name'))
    );

    const members = [];
    if (memberTable) {
      // Identify column positions from header row
      const headerCells = Array.from(memberTable.querySelectorAll('thead tr th, tbody tr:first-child th'));
      const colMap = {};
      headerCells.forEach((th, i) => {
        const k = text(th).toUpperCase();
        colMap[k] = i;
      });

      const rows = Array.from(memberTable.querySelectorAll('tbody tr'));
      rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length < 5) return;
        // Column order from IMCRM: Name, PEC, Gender, DOB, Relation, Nationality, Emirate, Category
        members.push({
          name:           text(cells[0]),
          pec:            text(cells[1]),
          gender:         text(cells[2]),
          dob:            text(cells[3]),
          relation:       text(cells[4]),
          nationality:    text(cells[5]) || '',
          emirate:        text(cells[6]) || '',
          memberCategory: text(cells[7]) || '',
        });
      });
    }

    return { refId, createdDate, firstName, lastName, mobile, email, nationality, dob, gender, emirate, memberCategory, members };
  });

  await browser.close();

  // Format output
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const lines = [
    `Lead Details`,
    `Ref-ID: HEA-${REF_ID}`,
    `Created Date: ${data.createdDate}`,
    `Name: ${fullName}`,
    `Mobile: ${data.mobile}`,
    `Email: ${data.email}`,
    `Nationality: ${data.nationality}`,
    `Date of Birth: ${data.dob}`,
    `Emirate of Visa: ${data.emirate}`,
    `Gender: ${data.gender}`,
    `Member Category: ${data.memberCategory}`,
    ``,
    `Member Details`,
    `Number of Members: ${data.members.length}`,
  ];

  data.members.forEach((m, i) => {
    lines.push(``);
    lines.push(`Member ${i + 1}:`);
    lines.push(`  Member Name: ${m.name}`);
    lines.push(`  Relationship: ${m.relation}`);
    lines.push(`  Gender: ${m.gender}`);
    lines.push(`  Date of Birth: ${m.dob}`);
    lines.push(`  Nationality: ${m.nationality}`);
    lines.push(`  Emirates of Visa: ${m.emirate}`);
    lines.push(`  Member Category: ${m.memberCategory}`);
  });

  console.log(lines.join('\n'));
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
