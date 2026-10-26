/**
 * Updates lead status from "Quoted" to "Followed Up" in IMCRM
 * Usage: node Scripts/update_quoted_to_followed_up.js <REF_ID1> <REF_ID2> ...
 * Only updates leads that are currently "Quoted". Skips others.
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

async function getCurrentStatus(page) {
  return await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent?.trim();
      if (t) texts.push(t);
    }
    for (let i = 0; i < texts.length; i++) {
      if (texts[i] === 'Lead Status') {
        for (let j = i + 1; j < i + 6 && j < texts.length; j++) {
          if (texts[j] === 'Status') {
            if (texts[j+1] && texts[j+1] !== 'Notes') return texts[j+1];
            break;
          }
        }
        break;
      }
    }
    return 'UNKNOWN';
  });
}

async function getName(page) {
  return await page.evaluate(() => {
    const dts = Array.from(document.querySelectorAll('dt'));
    let first = '', last = '';
    for (const dt of dts) {
      const key = dt.innerText?.trim().toUpperCase();
      if (key === 'FIRST NAME') first = dt.nextElementSibling?.innerText?.trim() || '';
      if (key === 'LAST NAME')  last  = dt.nextElementSibling?.innerText?.trim() || '';
    }
    return `${first} ${last}`.trim();
  });
}

async function updateToFollowedUp(page) {
  // Open the status dropdown
  const label = page.locator('label:has(p[title="Status"])');
  await label.locator('.v-popper--theme-dropdown > div').click();
  await page.waitForTimeout(600);

  // Click "Followed Up" in the dropdown
  await page.evaluate(() => {
    const inner = document.querySelector('.v-popper__inner');
    const items = Array.from(inner?.querySelectorAll('span') || []).filter(el => el.innerText?.trim() === 'Followed Up');
    if (items[0]) items[0].click();
    else throw new Error('Followed Up option not found in dropdown');
  });
  await page.waitForTimeout(400);

  // Click the "Change Status" save button
  await page.locator('button:has-text("Change Status")').first().click();
  await page.waitForTimeout(1200);
}

async function processLead(page, refId) {
  const url = `https://imcrm.alfred.ae/quotes/health/${refId}`;
  await page.goto(url);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(url);
  }
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(1200);

  const name = await getName(page);
  const statusBefore = await getCurrentStatus(page);

  if (statusBefore !== 'Quoted') {
    return { refId, name, statusBefore, action: 'Skipped — not Quoted' };
  }

  await updateToFollowedUp(page);
  
  // Verify by reading the status again
  const statusAfter = await getCurrentStatus(page);
  const success = statusAfter === 'Followed Up';
  return {
    refId,
    name,
    statusBefore,
    action: success ? 'Updated to Followed Up' : `Update uncertain — now shows: ${statusAfter}`
  };
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();

  const results = [];
  for (const refId of REF_IDS) {
    try {
      const r = await processLead(page, refId);
      results.push(r);
      process.stderr.write(`[${results.length}/${REF_IDS.length}] ${refId} | ${r.name} | ${r.statusBefore} → ${r.action}\n`);
    } catch(e) {
      const r = { refId, name: 'ERROR', statusBefore: 'ERROR', action: e.message.substring(0, 120) };
      results.push(r);
      process.stderr.write(`[${results.length}/${REF_IDS.length}] ERROR: ${refId} | ${e.message.substring(0, 80)}\n`);
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
