/**
 * Test status update on a single lead
 */
const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2] || 'TPP3UT44';
const SESSION_DIR = path.join(__dirname, 'crm-session');

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();
  await page.goto(`https://imcrm.alfred.ae/quotes/health/${REF_ID}`);
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(2000);

  // Step 1: Get current status
  const statusBefore = await page.evaluate(() => {
    // Find the status display div in Lead Status section
    const leadStatusSection = Array.from(document.querySelectorAll('h3')).find(h => h.innerText?.trim() === 'Lead Status');
    if (leadStatusSection) {
      const section = leadStatusSection.closest('[data-v-c6893be1]')?.parentElement;
      const truncateDiv = section?.querySelector('.truncate.pr-8');
      if (truncateDiv) return truncateDiv.innerText?.trim();
    }
    return 'NOT FOUND';
  });
  console.log('Status before:', statusBefore);

  if (statusBefore !== 'Quoted') {
    console.log('Not Quoted — no update needed');
    await browser.close();
    return;
  }

  // Step 2: Click the status dropdown to open it
  // The clickable div is inside .v-popper--theme-dropdown in the Lead Status section
  await page.evaluate(() => {
    const leadStatusSection = Array.from(document.querySelectorAll('h3')).find(h => h.innerText?.trim() === 'Lead Status');
    if (leadStatusSection) {
      const section = leadStatusSection.closest('[data-v-c6893be1]')?.parentElement;
      const popper = section?.querySelector('.v-popper--theme-dropdown');
      if (popper) {
        const clickDiv = popper.querySelector('div');
        if (clickDiv) clickDiv.click();
      }
    }
  });
  await page.waitForTimeout(700);

  // Step 3: See what's in the open dropdown
  const dropdownContent = await page.evaluate(() => {
    // Look for visible dropdown content
    const popperContent = document.querySelector('.v-popper__popper:not([style*="display: none"])');
    if (popperContent) {
      return { found: true, html: popperContent.innerHTML.substring(0, 2000) };
    }
    // Try finding any list items that appeared
    const listItems = Array.from(document.querySelectorAll('.v-popper__inner li, .v-popper__inner [role="option"], .x-select-option'));
    return { found: listItems.length > 0, items: listItems.map(li => li.innerText?.trim()) };
  });
  console.log('Dropdown content:', JSON.stringify(dropdownContent, null, 2));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
