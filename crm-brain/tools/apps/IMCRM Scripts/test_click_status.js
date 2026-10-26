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

  // Find Lead Status section and the dropdown within it
  const info = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(h => h.innerText?.trim() === 'Lead Status');
    if (!h3) return { error: 'No Lead Status h3' };
    
    // Go up to find section container
    let container = h3;
    for (let i = 0; i < 6; i++) {
      container = container.parentElement;
      if (!container) break;
    }
    
    // Find .truncate elements within container
    const truncates = Array.from(container?.querySelectorAll('.truncate') || []).map(el => ({
      tag: el.tagName, text: el.innerText?.trim(), class: el.className
    }));
    
    // Find .v-popper within container
    const poppers = Array.from(container?.querySelectorAll('.v-popper') || []).map(el => ({
      class: el.className, text: el.innerText?.trim().substring(0, 100)
    }));

    return { containerTag: container?.tagName, containerClass: container?.className?.substring(0,100), truncates, poppers };
  });
  console.log(JSON.stringify(info, null, 2));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
