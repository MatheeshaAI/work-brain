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

  // Click the status dropdown div using Playwright's click (not JS click)
  // Locate the div showing "Quoted" text inside the status label
  const statusDropdownDiv = page.locator('[title="Status"] ~ div .v-popper--theme-dropdown > div').first();
  
  // Alternative: use the label with title="Status"
  const label = page.locator('label:has(p[title="Status"])');
  const count = await label.count();
  console.log('Status label count:', count);
  
  if (count > 0) {
    // Click the dropdown div within the label
    await label.locator('.v-popper--theme-dropdown > div').click();
    await page.waitForTimeout(800);
    
    // Check what appeared
    const content = await page.evaluate(() => {
      const popperInners = Array.from(document.querySelectorAll('.v-popper__inner'));
      return popperInners.map(el => ({
        visible: window.getComputedStyle(el).display !== 'none',
        text: el.innerText?.trim().substring(0, 200)
      }));
    });
    console.log('Popper inners:', JSON.stringify(content, null, 2));
  }

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
