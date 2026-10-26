/**
 * Extract lead status by intercepting network responses (Inertia XHR)
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
  
  let capturedData = null;
  
  // Intercept responses from the health quote URL
  const handler = async (response) => {
    const respUrl = response.url();
    if (respUrl.includes(`/health/${refId}`) && response.headers()['content-type']?.includes('json')) {
      try {
        const body = await response.json();
        capturedData = body;
      } catch(e) {}
    }
  };
  page.on('response', handler);

  await page.goto(url);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(url);
  }
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(2000);
  
  page.off('response', handler);

  if (capturedData) {
    return { refId, method: 'network', data: JSON.stringify(capturedData).substring(0, 1000) };
  }

  // Fallback: check __INERTIA__ global or window state
  const windowData = await page.evaluate(() => {
    // Check window.__page__ or Inertia state
    const keys = Object.keys(window).filter(k => k.includes('nertia') || k.includes('page') || k.includes('route'));
    const result = {};
    for (const k of keys.slice(0, 20)) {
      try { result[k] = JSON.stringify(window[k]).substring(0, 200); } catch(e) {}
    }
    return result;
  });
  
  return { refId, method: 'window', windowKeys: windowData };
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();
  const r = await getStatus(page, REF_IDS[0]);
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
