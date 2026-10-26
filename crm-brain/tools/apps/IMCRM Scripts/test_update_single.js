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

  // Step 1: Find the status popper (the one with class ending in 'relative' not 'relative inline-block')
  // and click it to open the dropdown
  await page.evaluate(() => {
    const poppers = Array.from(document.querySelectorAll('.v-popper.v-popper--theme-dropdown.x-popover'));
    // The status one has class ending in 'relative' (not 'relative inline-block')
    const statusPopper = poppers.find(p => p.className.trim().endsWith('relative'));
    if (statusPopper) {
      const innerDiv = statusPopper.querySelector('div');
      if (innerDiv) innerDiv.click();
      else statusPopper.click();
    }
  });
  
  await page.waitForTimeout(800);

  // Step 2: Check if dropdown opened and find options
  const dropdownInfo = await page.evaluate(() => {
    // Look for popper content that's now visible
    const popperContents = Array.from(document.querySelectorAll('.v-popper__inner, .v-popper__popper'));
    const visible = popperContents.filter(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    
    const allListItems = Array.from(document.querySelectorAll('li, [role="option"], .dropdown-item'))
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none';
      })
      .map(el => el.innerText?.trim())
      .filter(t => t && t.length < 50);
    
    return { visiblePoppers: visible.length, allListItems };
  });
  console.log('Dropdown state:', JSON.stringify(dropdownInfo, null, 2));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
