const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const SESSION_DIR = path.join(__dirname, 'crm-session');

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: false });
  const page = await browser.newPage();
  await page.goto(`https://imcrm.alfred.ae/quotes/health/TPP3UT44`);
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(2000);

  // Get HTML of the full Lead Status section
  const html = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*'));
    for (const el of els) {
      if (el.children.length === 0 && el.innerText?.trim() === 'Lead Status') {
        // Go up to the section container
        let parent = el;
        for (let i = 0; i < 4; i++) parent = parent.parentElement || parent;
        return parent.outerHTML.substring(0, 5000);
      }
    }
    return 'Not found';
  });
  console.log('Lead Status section HTML:');
  console.log(html);

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
