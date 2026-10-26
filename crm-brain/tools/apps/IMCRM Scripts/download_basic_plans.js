/**
 * IMCRM Basic Plan Downloader
 * Selects the first 5 entry-level plans excluding Fidelity United and downloads comparison PDF.
 * Note: IMCRM limits PDF comparison to 5 plans.
 *
 * Usage: node download_basic_plans.js <REF_ID>
 * Output: PDF saved to Workspace/Documents/HEA-[REF_ID]-[LeadName]/
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2];
if (!REF_ID) {
  console.error('Usage: node download_basic_plans.js <REF_ID>');
  process.exit(1);
}

const LEAD_URL = `https://imcrm.alfred.ae/quotes/health/${REF_ID}`;
const SESSION_DIR = path.join(__dirname, 'crm-session');
const DOCS_ROOT = path.resolve(__dirname, '..', 'Workspace', 'Documents');

const EXCLUDED_PROVIDERS = ['fidelity united'];
const MAX_PLANS = 5; // IMCRM PDF comparison is capped at 5 plans

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
  const browser = await chromium.launchPersistentContext(SESSION_DIR, {
    headless: true,
    acceptDownloads: true
  });
  const page = await browser.newPage();

  await page.goto(LEAD_URL);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(LEAD_URL);
  }
  await page.waitForSelector('text="Customer Profile"', { timeout: 20000 });
  await page.waitForTimeout(3000);

  // Get lead name for folder path
  const leadName = await page.evaluate(() => {
    let first = '', last = '';
    document.querySelectorAll('dt').forEach(dt => {
      const k = dt.innerText.trim().toUpperCase();
      if (k === 'FIRST NAME') first = (dt.nextElementSibling?.innerText || '').trim();
      if (k === 'LAST NAME') last = (dt.nextElementSibling?.innerText || '').trim();
    });
    return `${first}-${last}`.replace(/\s+/g, '-');
  });

  const folderName = `HEA-${REF_ID}-${leadName}`;
  const downloadDir = path.join(DOCS_ROOT, folderName);
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

  // Scroll to Available Plans
  await page.evaluate(() => {
    const ap = Array.from(document.querySelectorAll('h3')).find(e => e.innerText.includes('Available Plans'));
    if (ap) ap.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(6000);

  // Select first MAX_PLANS non-excluded entry-level plans
  const result = await page.evaluate(({ excluded, max }) => {
    const tbl = Array.from(document.querySelectorAll('table')).find(t => t.innerText.includes('PLAN NAME'));
    if (!tbl) return { error: 'No plans table found' };

    const checkboxes = Array.from(tbl.querySelectorAll('input[type=checkbox]'));
    const rows = Array.from(tbl.querySelectorAll('tbody tr'));
    const selected = [], skipped = [];

    rows.forEach((row, rowIdx) => {
      const cells = Array.from(row.querySelectorAll('td'));
      // cells[0]=checkbox, cells[1]=provider+badge, cells[2]=planName, cells[3]=planType
      const providerRaw = cells[1] ? cells[1].innerText.split('\n')[0].trim() : '';
      const provider = providerRaw.toLowerCase();
      const planName = cells[2] ? cells[2].innerText.trim() : '';
      const checkboxIdx = rowIdx + 1;

      if (!provider) return;

      if (excluded.some(ex => provider.includes(ex))) {
        skipped.push({ provider: providerRaw, planName, reason: 'excluded' });
        return;
      }

      if (selected.length >= max) {
        skipped.push({ provider: providerRaw, planName, reason: 'limit reached' });
        return;
      }

      if (checkboxes[checkboxIdx]) {
        checkboxes[checkboxIdx].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        selected.push({ provider: providerRaw, planName });
      }
    });

    return { selected, skipped };
  }, { excluded: EXCLUDED_PROVIDERS, max: MAX_PLANS });

  if (result.error) {
    console.error('Error:', result.error);
    await browser.close();
    process.exit(1);
  }

  console.log(`\nSelected ${result.selected.length} plans:`);
  result.selected.forEach(p => console.log(`  ✓ ${p.provider} — ${p.planName}`));
  console.log(`\nSkipped:`);
  result.skipped.forEach(p => console.log(`  ✗ ${p.provider} — ${p.planName} (${p.reason})`));

  // Wait for Vue to process selection
  await page.waitForTimeout(3000);

  // Download PDF
  const dlBtn = page.locator('button:has-text("Download PDF")');
  if (await dlBtn.count() === 0) {
    console.error('\nNo "Download PDF" button found.');
    await browser.close();
    process.exit(1);
  }

  console.log('\nDownloading PDF...');
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    dlBtn.first().click()
  ]);

  const filename = download.suggestedFilename() || `Basic_Plans_HEA-${REF_ID}.pdf`;
  const savePath = path.join(downloadDir, filename);
  await download.saveAs(savePath);

  console.log(`\nPDF saved to: ${savePath}`);
  console.log(`Folder: ${folderName}`);

  await browser.close();
}

run().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
