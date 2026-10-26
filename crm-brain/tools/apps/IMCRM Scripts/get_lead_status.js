/**
 * Batch Lead Status Checker
 * Usage: node Scripts/get_lead_status.js <REF_ID1> <REF_ID2> ...
 */

const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_IDS = process.argv.slice(2);
if (!REF_IDS.length) {
  console.error('Usage: node get_lead_status.js <REF_ID1> <REF_ID2> ...');
  process.exit(1);
}

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

async function getLeadStatus(page, refId) {
  const url = `https://imcrm.alfred.ae/quotes/health/${refId}`;
  await page.goto(url);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(url);
  }
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });

  const data = await page.evaluate(() => {
    const text = (el) => (el && el.innerText ? el.innerText.trim() : '');
    let firstName = '', lastName = '', status = '';

    document.querySelectorAll('dt').forEach(dt => {
      const key = text(dt).toUpperCase();
      const val = text(dt.nextElementSibling);
      if (key === 'FIRST NAME') firstName = val;
      if (key === 'LAST NAME')  lastName  = val;
    });

    // Status is usually in a select element or a badge/span
    const selectEl = document.querySelector('select[name="status"], select#status, select[id*="status"]');
    if (selectEl) {
      status = selectEl.options[selectEl.selectedIndex]?.text || selectEl.value;
    }
    if (!status) {
      // Try looking for a badge or status label
      document.querySelectorAll('*').forEach(el => {
        if (el.children.length === 0 && text(el).toUpperCase() === 'STATUS') {
          status = text(el.nextElementSibling) || text(el.parentElement?.nextElementSibling);
        }
      });
    }
    if (!status) {
      // Try select elements generally — find ones near "Status" label
      const allSelects = Array.from(document.querySelectorAll('select'));
      for (const sel of allSelects) {
        const label = document.querySelector(`label[for="${sel.id}"]`);
        if (label && text(label).toUpperCase().includes('STATUS')) {
          status = sel.options[sel.selectedIndex]?.text || sel.value;
          break;
        }
      }
    }
    // Fallback: get ALL select values
    if (!status) {
      const allSelects = Array.from(document.querySelectorAll('select'));
      status = allSelects.map(s => `${s.name||s.id}: ${s.options[s.selectedIndex]?.text||s.value}`).join(' | ');
    }

    return { firstName, lastName, status };
  });

  return { refId, name: `${data.firstName} ${data.lastName}`.trim(), status: data.status };
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();

  for (const refId of REF_IDS) {
    try {
      const result = await getLeadStatus(page, refId);
      console.log(`${result.refId}|${result.name}|${result.status}`);
    } catch (err) {
      console.log(`${refId}|ERROR|${err.message}`);
    }
  }

  await browser.close();
}

run().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
