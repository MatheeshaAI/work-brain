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

  // Get data-page attribute from #app
  const dataPage = await page.evaluate(() => {
    const el = document.querySelector('[data-page]');
    return el ? el.getAttribute('data-page') : 'NO data-page FOUND';
  });

  if (dataPage && dataPage !== 'NO data-page FOUND') {
    try {
      const parsed = JSON.parse(dataPage);
      // Extract just props keys and the quote object
      const props = parsed.props || {};
      console.log('Top-level prop keys:', Object.keys(props));
      if (props.quote) {
        console.log('Quote object keys:', Object.keys(props.quote));
        console.log('Status fields:', JSON.stringify({
          status: props.quote.status,
          lead_status: props.quote.lead_status,
          quote_status: props.quote.quote_status,
        }));
        // Print full quote snippet
        const quoteStr = JSON.stringify(props.quote);
        console.log('Quote snippet (2000 chars):', quoteStr.substring(0, 2000));
      }
    } catch(e) {
      console.log('Parse error:', e.message);
      console.log('Raw (first 1000):', dataPage.substring(0, 1000));
    }
  } else {
    console.log(dataPage);
    // Try getting full content
    const content = await page.content();
    const match = content.match(/data-page="([^"]+)"/);
    if (match) {
      console.log('Found data-page in raw HTML:', match[1].substring(0, 500));
    } else {
      console.log('No data-page in raw HTML either');
      // Check for __Inertia__ or similar
      const innerContent = content.substring(0, 5000);
      console.log('First 2000 of body:', innerContent.substring(0, 2000));
    }
  }

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
