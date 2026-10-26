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

  const debug = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent?.trim();
      if (t) texts.push(t);
    }
    // Find "Status" occurrences and show surrounding context
    const results = [];
    texts.forEach((t, i) => {
      if (t === 'Status') {
        results.push({ idx: i, before: texts.slice(Math.max(0,i-3), i), after: texts.slice(i+1, i+6) });
      }
      if (t === 'Quoted' || t === 'Followed Up' || t === 'Change Status') {
        results.push({ FOUND: t, idx: i, before: texts.slice(Math.max(0,i-3), i), after: texts.slice(i+1, i+4) });
      }
    });
    return results;
  });

  console.log(JSON.stringify(debug, null, 2));
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
