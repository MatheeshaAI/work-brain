/**
 * IMCRM Entry Level Plan Selector + PDF Downloader
 * Usage: node get_entry_plans.js <REF_ID> <DOWNLOAD_DIR>
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2];
if (!REF_ID) {
  console.error('Usage: node get_entry_plans.js <REF_ID> [download_dir]');
  process.exit(1);
}

const LEAD_URL = `https://imcrm.alfred.ae/quotes/health/${REF_ID}`;
const SESSION_DIR = path.join(__dirname, 'crm-session');
const DOWNLOAD_DIR = process.argv[3] || path.resolve(__dirname, '..', 'Workspace', 'Documents');

async function login(page) {
  await page.click('text="Google Login"');
  await page.waitForURL('**/accounts.google.com/**');
  await page.fill('input[type="email"]', process.env.EMAIL);
  await page.click('#identifierNext, button:has-text("Next")');
  await page.waitForTimeout(1500);
  await page.fill('input[type="password"]', process.env.PASSWORD);
  await page.click('#passwordNext, button:has-text("Next")');
  await page.waitForURL('**/imcrm.alfred.ae/**', { timeout: 30000 });
}

async function run() {
  if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  const browser = await chromium.launchPersistentContext(SESSION_DIR, {
    headless: true,
    acceptDownloads: true,
    downloadsPath: DOWNLOAD_DIR
  });
  const page = await browser.newPage();

  await page.goto(LEAD_URL);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(LEAD_URL);
  }

  await page.waitForSelector('text="Customer Profile"', { timeout: 20000 });
  console.log('Page loaded');
  await page.waitForTimeout(3000);

  // Scroll to Available Plans to trigger load
  await page.evaluate(() => {
    const ap = Array.from(document.querySelectorAll('h3')).find(e => e.innerText.includes('Available Plans'));
    if (ap) ap.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(6000);
  console.log('Scrolled to plans');

  // Check rows in plans table
  const rows = await page.evaluate(() => {
    const plansTable = Array.from(document.querySelectorAll('table')).find(t => t.innerText.includes('PLAN NAME'));
    if (!plansTable) return [];
    return Array.from(plansTable.querySelectorAll('tbody tr')).map((r, i) => ({
      i,
      text: r.innerText.trim().substring(0, 120)
    }));
  });
  console.log('Plan rows found:', rows.length);
  rows.forEach(r => console.log(`  Row ${r.i}: ${r.text.substring(0, 80)}`));

  // Click checkboxes for target plans (indices into tbody rows, +1 for header checkbox)
  // tbody row 0 = FU Plan G, 1 = TE APN, 2 = QIC BLUE01, 3 = TE ECareBlue1, 4 = QIC BLUE02, 5 = TE ECareBlue2
  // Checkbox index: 0=header, 1=row0, 2=row1...
  const targetRows = [1, 2, 3, 4, 5]; // TE APN, QIC BLUE01, TE ECareBlue1, QIC BLUE02, TE ECareBlue2
  const clickResult = await page.evaluate((targets) => {
    const plansTable = Array.from(document.querySelectorAll('table')).find(t => t.innerText.includes('PLAN NAME'));
    if (!plansTable) return 'no table';
    const checkboxes = Array.from(plansTable.querySelectorAll('input[type=checkbox]'));
    const results = [];
    for (const i of targets) {
      if (checkboxes[i]) {
        checkboxes[i].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        results.push({ index: i, checked: checkboxes[i].checked });
      } else {
        results.push({ index: i, error: 'not found' });
      }
    }
    return results;
  }, targetRows);
  console.log('Checkbox results:', JSON.stringify(clickResult));
  await page.waitForTimeout(2000);

  // Look for Download PDF button (may appear after selection)
  const allBtns = await page.evaluate(() =>
    Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean)
  );
  console.log('All buttons after selection:', JSON.stringify(allBtns));

  // Try to find and click download button
  const dlBtn = await page.$('button:has-text("Download"), button:has-text("PDF"), button:has-text("download"), a:has-text("Download PDF")');
  if (dlBtn) {
    console.log('Found download button — clicking...');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      dlBtn.click()
    ]);
    const suggestedName = download.suggestedFilename() || `Entry_Plans_${REF_ID}.pdf`;
    const savePath = path.join(DOWNLOAD_DIR, suggestedName);
    await download.saveAs(savePath);
    console.log('PDF saved to:', savePath);
  } else {
    console.log('No download button found. Buttons available:', allBtns);
  }

  await browser.close();
}

run().catch(e => { console.error('Error:', e.message); process.exit(1); });
