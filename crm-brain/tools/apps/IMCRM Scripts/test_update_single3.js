const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const SESSION_DIR = path.join(__dirname, 'crm-session');

async function run() {
  const browser = await chromium.launchPersistentContext(SESSION_DIR, { headless: true });
  const page = await browser.newPage();
  await page.goto(`https://imcrm.alfred.ae/quotes/health/TPP3UT44`);
  await page.waitForSelector('text="Customer Profile"', { timeout: 15000 });
  await page.waitForTimeout(2000);

  // Step 1: Open the status dropdown
  const label = page.locator('label:has(p[title="Status"])');
  await label.locator('.v-popper--theme-dropdown > div').click();
  await page.waitForTimeout(800);

  // Step 2: Click "Followed Up" in the dropdown
  const followedUpOption = page.locator('.v-popper__inner li, .v-popper__inner span, .v-popper__inner div').filter({ hasText: /^Followed Up$/ }).first();
  const optCount = await followedUpOption.count();
  console.log('"Followed Up" option count:', optCount);

  // Try to find in the popper inner
  const popperContent = await page.evaluate(() => {
    const inner = document.querySelector('.v-popper__inner');
    if (!inner) return { error: 'no inner' };
    const items = Array.from(inner.querySelectorAll('li, span, div')).filter(el => el.children.length === 0 && el.innerText?.trim() === 'Followed Up');
    return { count: items.length, tagNames: items.map(el => ({ tag: el.tagName, class: el.className, text: el.innerText?.trim() })) };
  });
  console.log('Followed Up items in popper:', JSON.stringify(popperContent, null, 2));

  if (popperContent.count > 0) {
    // Click it via JS
    await page.evaluate(() => {
      const inner = document.querySelector('.v-popper__inner');
      const items = Array.from(inner.querySelectorAll('li, span, div')).filter(el => el.children.length === 0 && el.innerText?.trim() === 'Followed Up');
      if (items[0]) items[0].click();
    });
    await page.waitForTimeout(500);
    
    // Step 3: Verify status changed in the dropdown display
    const newStatus = await page.evaluate(() => {
      const inner = document.querySelector('.v-popper__inner');
      // After selecting, check the main status div
      const statusPoppers = Array.from(document.querySelectorAll('.v-popper.v-popper--theme-dropdown.x-popover'));
      const statusPopper = statusPoppers.find(p => p.className.trim().endsWith('relative'));
      return statusPopper?.querySelector('div')?.innerText?.trim();
    });
    console.log('Status after click:', newStatus);
    
    // Step 4: Find and click the "Change Status" button to save
    const changeStatusBtn = page.locator('button:has-text("Change Status")').first();
    const btnCount = await changeStatusBtn.count();
    console.log('"Change Status" button count:', btnCount);
    
    if (btnCount > 0) {
      await changeStatusBtn.click();
      await page.waitForTimeout(1500);
      console.log('Clicked Change Status button');
      
      // Verify final status
      const finalStatus = await page.evaluate(() => {
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
      console.log('Final status:', finalStatus);
    }
  }

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
