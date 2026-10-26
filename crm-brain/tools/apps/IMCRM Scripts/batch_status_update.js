/**
 * Batch Lead Status Checker + Updater
 * - Reads current status from each lead page
 * - If status is "Quoted", changes it to "Followed Up"
 * Usage: node Scripts/batch_status_update.js <REF_ID1> <REF_ID2> ...
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

async function getNameFromPage(page) {
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

async function getCurrentStatus(page) {
  return await page.evaluate(() => {
    // Walk text nodes to find the one after "Status" in the Lead Status section
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent?.trim();
      if (t) texts.push(t);
    }
    const idx = texts.lastIndexOf('Status');
    if (idx >= 0) {
      // The status value is the next non-empty text
      for (let i = idx + 1; i < idx + 5 && i < texts.length; i++) {
        const t = texts[i];
        if (t && t !== 'Status' && t.length < 50) return t;
      }
    }
    return 'UNKNOWN';
  });
}

async function changeStatusToFollowedUp(page) {
  // Click the custom dropdown to open it
  // The dropdown wrapper has class containing 'v-popper' and is within the Lead Status section
  await page.evaluate(() => {
    // Find the status dropdown div (contains current status text + arrow icon)
    const statusDivs = Array.from(document.querySelectorAll('.v-popper.v-popper--theme-dropdown'));
    // Find the one that's inside the Lead Status section
    for (const div of statusDivs) {
      const parent = div.closest('[data-v-c6893be1]');
      if (parent) {
        // Click the inner div to open
        const clickable = div.querySelector('div.truncate, div.w-full.border');
        if (clickable) clickable.click();
        return;
      }
    }
  });
  
  await page.waitForTimeout(500);
  
  // Now look for "Followed Up" option in the dropdown list
  const followedUpOption = page.locator('[role="option"]:has-text("Followed Up"), li:has-text("Followed Up"), .x-select-option:has-text("Followed Up")').first();
  
  // Check if dropdown opened
  const count = await page.locator('text="Followed Up"').count();
  if (count === 0) {
    // Try clicking the visible status text div directly
    await page.click('.v-popper--theme-dropdown div.truncate', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(500);
  }
  
  // Try to find and click "Followed Up" in dropdown
  await page.locator('text="Followed Up"').first().click({ timeout: 5000 });
  await page.waitForTimeout(500);

  // Find and click the Save/Update button
  const saveBtn = page.locator('button:has-text("Update Status"), button:has-text("Save"), button:has-text("Change Status")').first();
  if (await saveBtn.count() > 0) {
    await saveBtn.click();
    await page.waitForTimeout(1000);
  }
}

async function processLead(page, refId) {
  const url = `https://imcrm.alfred.ae/quotes/health/${refId}`;
  await page.goto(url);
  if (page.url().includes('/login')) {
    await login(page);
    await page.goto(url);
  }
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(1500);

  const name = await getNameFromPage(page);
  const statusBefore = await getCurrentStatus(page);
  let action = 'No change needed';

  if (statusBefore === 'Quoted') {
    try {
      await changeStatusToFollowedUp(page);
      const statusAfter = await getCurrentStatus(page);
      action = statusAfter === 'Followed Up' ? 'Updated to Followed Up' : `Update attempted — now: ${statusAfter}`;
    } catch(e) {
      action = `Update FAILED: ${e.message}`;
    }
  }

  return { refId, name, statusBefore, action };
}

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();

  const results = [];
  for (const refId of REF_IDS) {
    try {
      const r = await processLead(page, refId);
      results.push(r);
      console.error(`Done: ${refId} | ${r.name} | ${r.statusBefore} | ${r.action}`);
    } catch(e) {
      results.push({ refId, name: 'ERROR', statusBefore: 'ERROR', action: e.message });
      console.error(`Error: ${refId} | ${e.message}`);
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
