const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2] || '3DCL46GD';
const SESSION_DIR = path.join(__dirname, 'crm-session');

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: false });
  const page = await browser.newPage();
  await page.goto(`https://imcrm.alfred.ae/quotes/health/${REF_ID}`);
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(2000);

  // Get full page HTML snippet around status-like elements
  const html = await page.content();
  // Find lines containing status keywords
  const lines = html.split('\n');
  const relevant = lines.filter(l => 
    /quoted|followed.up|policy.booked|lead.status|quote.status|status.*select|select.*status/i.test(l)
  );
  console.log('=== Relevant HTML lines ===');
  relevant.slice(0, 50).forEach(l => console.log(l.substring(0, 200)));

  // Also try to get the page title / header area
  const headerText = await page.evaluate(() => {
    // Look for any element with "Quoted", "Followed Up" etc. using TreeWalker
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent?.trim();
      if (t && /^(Quoted|Followed Up|Policy Booked|New|Won|Lost|Cancelled|Payment Pending|Payment Initiated)$/.test(t)) {
        texts.push({ text: t, parentTag: node.parentElement?.tagName, parentClass: node.parentElement?.className });
      }
    }
    return texts;
  });
  console.log('\n=== Status text nodes ===');
  console.log(JSON.stringify(headerText, null, 2));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
