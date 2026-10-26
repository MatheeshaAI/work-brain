const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const SESSION_DIR = path.join(__dirname, 'crm-session');

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();
  await page.goto(`https://imcrm.alfred.ae/quotes/health/TPP3UT44`);
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(2000);

  // Find and click the "Change Status" button/dropdown
  const changeStatusEl = await page.locator('text="Change Status"').first();
  
  // Get HTML around the Change Status element
  const html = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*'));
    for (const el of els) {
      if (el.children.length === 0 && el.innerText?.trim() === 'Change Status') {
        // Go up a few levels to get context
        let parent = el;
        for (let i = 0; i < 5; i++) parent = parent.parentElement || parent;
        return parent.outerHTML.substring(0, 3000);
      }
    }
    return 'Not found';
  });
  console.log('Change Status context HTML:');
  console.log(html.substring(0, 3000));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
