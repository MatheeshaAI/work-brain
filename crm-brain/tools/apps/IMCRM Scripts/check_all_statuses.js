/**
 * Batch Lead Status Checker (read-only)
 */
const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_IDS = process.argv.slice(2);
if (!REF_IDS.length) { console.error('No REF_IDs provided'); process.exit(1); }

const SESSION_DIR = path.join(__dirname, 'crm-session');

async function login(page) {
  await page.click('text="Google Login"');
  await page.waitForURL('**/accounts.google.com/**');
  await page.fill('input[type="email"]', process.env.IMCRM_EMAIL || process.env.EMAIL);
  await page.click('#identifierNext, button:has-text("Next")');
  await page.waitForTimeout(1500);
  await page.fill('input[type="password"]', process.env.IMCRM_PASSWORD || process.env.PASSWORD);
  await page.click('#passwordNext, button:has-text("Next")');
  await page.waitForURL('**/imcrm.alfred.ae/**', { timeout: 30000 });
}

async function getNameAndStatus(page) {
  return await page.evaluate(() => {
    const dts = Array.from(document.querySelectorAll('dt'));
    let first = '', last = '';
    for (const dt of dts) {
      const key = dt.innerText?.trim().toUpperCase();
      if (key === 'FIRST NAME') first = dt.nextElementSibling?.innerText?.trim() || '';
      if (key === 'LAST NAME')  last  = dt.nextElementSibling?.innerText?.trim() || '';
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent?.trim();
      if (t) texts.push(t);
    }

    // Find FIRST "Lead Status" then look for "Status" right after it
    let status = 'UNKNOWN';
    for (let i = 0; i < texts.length; i++) {
      if (texts[i] === 'Lead Status') {
        // Next few items: "Status", then the actual value
        for (let j = i + 1; j < i + 6 && j < texts.length; j++) {
          if (texts[j] === 'Status') {
            // The next text is the status value
            if (texts[j+1] && texts[j+1] !== 'Notes') {
              status = texts[j+1];
            }
            break;
          }
        }
        break;
      }
    }
    return { name: `${first} ${last}`.trim(), status };
  });
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();

  for (const refId of REF_IDS) {
    try {
      const url = `https://imcrm.alfred.ae/quotes/health/${refId}`;
      await page.goto(url);
      if (page.url().includes('/login')) {
        await login(page);
        await page.goto(url);
      }
      await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
      await page.waitForTimeout(1000);
      const { name, status } = await getNameAndStatus(page);
      console.log(`${refId}|${name}|${status}`);
    } catch(e) {
      console.log(`${refId}|ERROR|${e.message.substring(0,80)}`);
    }
  }

  await browser.close();
}
run().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
