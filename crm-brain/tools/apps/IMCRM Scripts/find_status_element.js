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
  await page.waitForTimeout(3000); // Let JS fully render

  // Get a full text dump of the page visible text to find status
  const pageText = await page.evaluate(() => {
    // Get all visible text in order
    const walk = (node, texts = []) => {
      if (node.nodeType === 3) {
        const t = node.textContent?.trim();
        if (t) texts.push(t);
      } else if (node.nodeType === 1) {
        for (const child of node.childNodes) walk(child, texts);
      }
      return texts;
    };
    return walk(document.body).filter(t => t.length > 0 && t.length < 100).join('\n');
  });

  // Find status section - look for lines before/after "Status"
  const lines = pageText.split('\n');
  const statusIdx = lines.findIndex(l => l.toLowerCase() === 'status');
  if (statusIdx >= 0) {
    console.log('Found "Status" at line', statusIdx);
    console.log('Context (±5 lines):');
    console.log(lines.slice(Math.max(0, statusIdx-2), statusIdx+8).join('\n'));
  } else {
    console.log('No "Status" text node found.');
    // Look for lead status keywords
    const keywords = ['Quoted', 'Followed Up', 'Policy Booked', 'New', 'Won', 'Lost', 'Payment Pending', 'Payment Initiated', 'No Answer', 'Not Interested'];
    keywords.forEach(kw => {
      const idx = lines.findIndex(l => l === kw);
      if (idx >= 0) console.log(`Found "${kw}" at line ${idx}:`, lines.slice(Math.max(0,idx-2), idx+4).join(' | '));
    });
    // Print all unique 1-4 word lines that might be status values
    const shortLines = [...new Set(lines.filter(l => l.split(' ').length <= 5 && l.length < 30))];
    console.log('\nShort unique lines (potential status values):');
    console.log(shortLines.slice(0, 80).join('\n'));
  }

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
