/**
 * IMCRM Plan Range Extractor
 * Usage: node get_plans_by_price.js <REF_ID> <MIN_PRICE> <MAX_PRICE>
 * Example: node get_plans_by_price.js VWWVEZB2 5500 7000
 *
 * Reuses persistent Google session at Scripts/crm-session/.
 * Falls back to Google login if session is missing or expired.
 */

const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const REF_ID = process.argv[2];
const MIN = parseFloat(process.argv[3]);
const MAX = parseFloat(process.argv[4]);

if (!REF_ID || isNaN(MIN) || isNaN(MAX)) {
  console.error('Usage: node get_plans_by_price.js <REF_ID> <MIN_PRICE> <MAX_PRICE>');
  process.exit(1);
}

const LEAD_URL = `https://imcrm.alfred.ae/quotes/health/${REF_ID}`;
const SESSION_DIR = path.join(__dirname, 'crm-session');

async function login(page) {
  await page.click('text="Google Login"');
  // After clicking, two paths are possible:
  //  (a) Browser redirects to accounts.google.com (need email + password)
  //  (b) Google auto-completes silently and we land back on imcrm.alfred.ae
  // Wait for whichever happens first.
  await Promise.race([
    page.waitForURL('**/accounts.google.com/**', { timeout: 30000 }).catch(() => null),
    page.waitForURL('**/imcrm.alfred.ae/**', { timeout: 30000 }).catch(() => null),
  ]);

  if (page.url().includes('accounts.google.com')) {
    await page.fill('input[type="email"]', process.env.EMAIL);
    await page.click('#identifierNext, button:has-text("Next")');
    await page.waitForTimeout(1500);
    await page.fill('input[type="password"]', process.env.PASSWORD);
    await page.click('#passwordNext, button:has-text("Next")');
    await page.waitForURL('**/imcrm.alfred.ae/**', { timeout: 60000 });
  }
}

async function extractCurrentPagePlans(page, min, max) {
  return await page.evaluate(({ min, max }) => {
    const plansTable = Array.from(document.querySelectorAll('table'))
      .find(t => t.innerText.includes('PLAN NAME'));
    if (!plansTable) return { plans: [], foundHigher: false, totalRows: 0 };

    const rows = Array.from(plansTable.querySelectorAll('tbody tr'));
    const plans = [];
    let foundHigher = false;

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length < 7) return;

      // cells[0] is the row checkbox in MUI DataGrid; data starts at [1]
      // Actual columns: [1]=Provider, [2]=PlanName?, [3]=PlanType, ...
      // Use the original mapping from price_range_plan_scraper.js which works:
      const priceText = cells[6]?.innerText.replace(/,/g, '').trim();
      const price = parseFloat(priceText);

      if (!isNaN(price)) {
        if (price >= min && price <= max) {
          plans.push({
            provider:  cells[0]?.innerText.split('\n')[0].trim() || '',
            planName:  cells[2]?.innerText.trim() || '',
            planType:  cells[3]?.innerText.trim() || '',
            network:   cells[4]?.innerText.trim() || '',
            copay:     cells[5]?.innerText.trim() || '',
            price:     cells[6]?.innerText.trim() || '',
            totalPrice: cells[7]?.innerText.trim() || ''
          });
        }
        if (price > max) foundHigher = true;
      }
    });

    return { plans, foundHigher, totalRows: rows.length };
  }, { min, max });
}

async function clickNextPage(page) {
  const nextBtn = await page.$('button[aria-label="Go to next page"]:not([disabled]):not(.Mui-disabled)');
  if (!nextBtn) return false;
  await nextBtn.click();
  await page.waitForTimeout(2500);
  return true;
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();

  await page.goto(LEAD_URL);
  if (page.url().includes('/login')) {
    console.error('Session expired — logging in via Google...');
    await login(page);
    await page.goto(LEAD_URL);
  }

  console.error('Landed at:', page.url());
  console.error('Page title:', await page.title());

  await page.waitForSelector('text="Customer Profile"', { timeout: 30000 });

  // Scroll to Available Plans to trigger lazy load
  await page.evaluate(() => {
    const ap = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span'))
      .find(e => e.innerText && e.innerText.trim() === 'Available Plans');
    if (ap) ap.scrollIntoView({ behavior: 'instant', block: 'start' });
  });

  // Wait for plans table HEADER, then for actual data rows
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('table'))
      .some(t => t.innerText.includes('PLAN NAME'));
  }, { timeout: 30000 });

  // Now wait for rows in that table — give it time to populate
  await page.waitForFunction(() => {
    const t = Array.from(document.querySelectorAll('table'))
      .find(t => t.innerText.includes('PLAN NAME'));
    if (!t) return false;
    return t.querySelectorAll('tbody tr').length > 0;
  }, { timeout: 30000 }).catch(() => null);

  await page.waitForTimeout(4000);

  // Diagnostics — always
  const tableInfo = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('table')).map((t, i) => {
      const head = Array.from(t.querySelectorAll('thead th, thead td')).map(c => c.innerText.trim());
      const firstBody = t.querySelector('tbody tr');
      return {
        idx: i,
        headers: head,
        bodyRows: t.querySelectorAll('tbody tr').length,
        firstBodyText: firstBody ? firstBody.innerText.substring(0, 300) : '(no body)',
        firstBodyCells: firstBody ? Array.from(firstBody.querySelectorAll('td')).map(c => c.innerText.trim()) : []
      };
    });
  });
  // Try the available-plans JSON endpoint directly using the authenticated session
  console.error('Hitting available-plans JSON endpoint...');
  const apiResult = await page.evaluate(async (refId) => {
    const res = await fetch(`/quotes/health/available-plans/${refId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': decodeURIComponent(
          (document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN=')) || '').split('=')[1] || ''
        )
      },
      credentials: 'include',
      body: JSON.stringify({ jsonData: true })
    });
    const ct = res.headers.get('content-type') || '';
    const txt = await res.text();
    return { status: res.status, contentType: ct, bodyLength: txt.length, bodyPreview: txt.substring(0, 800), body: txt };
  }, REF_ID);
  console.error('API status:', apiResult.status, 'CT:', apiResult.contentType, 'len:', apiResult.bodyLength);
  console.error('Body preview:', apiResult.bodyPreview);

  // Try to parse and filter plans
  if (apiResult.contentType.includes('json')) {
    try {
      const json = JSON.parse(apiResult.body);
      console.error('Top-level keys:', Object.keys(json));
      // Save full JSON for inspection
      const fs = require('fs');
      fs.writeFileSync(path.join(__dirname, '_debug_plans.json'), JSON.stringify(json, null, 2));
      console.error('Full JSON saved to Scripts/_debug_plans.json');
    } catch (e) {
      console.error('JSON parse failed:', e.message);
    }
  }

  console.error('Tables on page:');
  console.error(JSON.stringify(tableInfo, null, 2));

  // Deeper inspection of plans table
  const deep = await page.evaluate(() => {
    const t = Array.from(document.querySelectorAll('table'))
      .find(tbl => tbl.innerText.includes('PLAN NAME'));
    if (!t) return { found: false };
    return {
      found: true,
      allRows: t.querySelectorAll('tr').length,
      tbodyRows: t.querySelectorAll('tbody tr').length,
      tableHTML: t.outerHTML.substring(0, 2000),
      parentText: t.parentElement?.innerText?.substring(0, 400) || ''
    };
  });
  console.error('Plans table deep dive:');
  console.error(JSON.stringify(deep, null, 2));

  // Check iframes
  const frames = page.frames().map(f => f.url());
  console.error('Frames:', JSON.stringify(frames));

  const allPlans = [];
  let pageNum = 1;
  let safety = 30;

  while (safety-- > 0) {
    const { plans, foundHigher, totalRows } = await extractCurrentPagePlans(page, MIN, MAX);
    console.error(`Page ${pageNum}: ${totalRows} rows scanned, ${plans.length} matched`);
    allPlans.push(...plans);

    if (foundHigher) {
      console.error('Found prices above max — stopping.');
      break;
    }
    const advanced = await clickNextPage(page);
    if (!advanced) {
      console.error('No more pages.');
      break;
    }
    pageNum++;
  }

  await browser.close();

  // Output JSON to stdout
  console.log(JSON.stringify(allPlans, null, 2));
}

run().catch(e => { console.error('Error:', e.message); process.exit(1); });
