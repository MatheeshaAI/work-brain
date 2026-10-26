/**
 * Extract lead status from Inertia.js page data
 * Usage: node get_status_inertia.js <REF_ID1> <REF_ID2> ...
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

async function getStatus(page, refId) {
  const url = `https://imcrm.alfred.ae/quotes/health/${refId}`;
  await page.goto(url);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(url);
  }
  await page.waitForSelector('[id="app"]', { timeout: 15000 });
  await page.waitForTimeout(1500);

  const result = await page.evaluate(() => {
    // Method 1: Inertia page data from #app div
    const appEl = document.getElementById('app');
    if (appEl) {
      const pageData = appEl.getAttribute('data-page');
      if (pageData) {
        try {
          const parsed = JSON.parse(pageData);
          const props = parsed.props || {};
          // Look for status/lead_status in props tree
          const findStatus = (obj, depth = 0) => {
            if (depth > 5 || !obj || typeof obj !== 'object') return null;
            for (const key of Object.keys(obj)) {
              if (/^(status|lead_status|quote_status|crm_status)$/i.test(key) && typeof obj[key] === 'string') return obj[key];
            }
            for (const key of Object.keys(obj)) {
              const r = findStatus(obj[key], depth + 1);
              if (r) return r;
            }
            return null;
          };
          const status = findStatus(props);
          if (status) return { method: 'inertia', status, keys: Object.keys(props) };
          return { method: 'inertia-no-status', props: JSON.stringify(props).substring(0, 500), keys: Object.keys(props) };
        } catch(e) {
          return { method: 'inertia-parse-error', error: e.message };
        }
      }
    }
    return { method: 'no-app-data' };
  });

  return { refId, ...result };
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();
  for (const refId of REF_IDS) {
    try {
      const r = await getStatus(page, refId);
      console.log(JSON.stringify(r));
    } catch(e) {
      console.log(JSON.stringify({ refId, error: e.message }));
    }
  }
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
