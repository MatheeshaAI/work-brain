const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2] || '3DCL46GD';
const SESSION_DIR = path.join(__dirname, 'crm-session');

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();
  await page.goto(`https://imcrm.alfred.ae/quotes/health/${REF_ID}`);
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });

  const dump = await page.evaluate(() => {
    // Dump all select elements
    const selects = Array.from(document.querySelectorAll('select')).map(s => ({
      id: s.id, name: s.name, value: s.value,
      selectedText: s.options[s.selectedIndex]?.text,
      options: Array.from(s.options).map(o => o.text)
    }));
    
    // Dump all dt/dd pairs
    const dts = Array.from(document.querySelectorAll('dt')).map(dt => ({
      key: dt.innerText?.trim(),
      val: dt.nextElementSibling?.innerText?.trim()
    }));

    // Look for any text containing "Quoted", "Followed Up", "Policy Booked" etc
    const statusKeywords = ['Quoted', 'Followed Up', 'Policy Booked', 'New', 'Won', 'Lost', 'Payment'];
    const found = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0) {
        const t = el.innerText?.trim();
        if (t && statusKeywords.some(k => t === k || t.includes(k))) {
          found.push({ tag: el.tagName, class: el.className, text: t, parentClass: el.parentElement?.className });
        }
      }
    });

    return { selects, dts, statusMatches: found };
  });

  console.log('=== SELECTS ===');
  console.log(JSON.stringify(dump.selects, null, 2));
  console.log('=== DTs ===');
  dump.dts.forEach(d => console.log(`  [${d.key}] => [${d.val}]`));
  console.log('=== STATUS KEYWORD MATCHES ===');
  console.log(JSON.stringify(dump.statusMatches, null, 2));

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
