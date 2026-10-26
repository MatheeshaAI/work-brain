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

  // Debug: find h3 elements
  const debug = await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3')).map(h => ({ text: h.innerText?.trim(), class: h.className }));
    // Find all elements with 'truncate' class
    const truncates = Array.from(document.querySelectorAll('.truncate')).map(el => ({
      tag: el.tagName,
      text: el.innerText?.trim().substring(0, 50),
      class: el.className,
      parentClass: el.parentElement?.className
    }));
    return { h3s, truncates };
  });
  console.log('H3 elements:', JSON.stringify(debug.h3s, null, 2));
  console.log('Truncate elements (first 10):', JSON.stringify(debug.truncates.slice(0, 10), null, 2));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
