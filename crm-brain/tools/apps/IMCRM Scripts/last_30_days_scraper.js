/**
 * IMCRM Last 30 Days Leads Scraper
 * This script automates the process of filtering leads by the last 30 days
 * and extracting data across all paginated pages.
 */

async function scrapeLeads() {
  console.log("🔍 Starting Scraper...");

  // 1. Click Filters and select Last 30 Days
  await page.click('button:has-text("Filters")');
  await page.waitForTimeout(1000);
  await page.click('text="Last 30 Days"');
  await page.waitForNavigation();
  console.log("✅ Filter applied: Last 30 Days");

  let allLeads = [];
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`📄 Scraping page...`);
    
    const pageLeads = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 25) return null;
        
        const refLink = cells[0].querySelector('a');
        return {
          refId: refLink ? refLink.innerText.trim() : '',
          link: refLink ? refLink.href : '',
          firstName: cells[1].innerText.trim(),
          lastName: cells[2].innerText.trim(),
          visaEmirate: cells[3].innerText.trim(),
          leadStatus: cells[7].innerText.trim(),
          assignmentType: cells[12].innerText.trim(),
          createdDate: cells[14].innerText.trim(),
          healthTeamType: cells[17].innerText.trim(),
          startingFrom: cells[20].innerText.trim(),
          leadType: cells[23].innerText.trim(),
          memberCategory: cells[25].innerText.trim()
        };
      }).filter(l => l !== null);
    });

    allLeads = allLeads.concat(pageLeads);

    // Check for Next button
    const nextButton = await page.$('a:has-text("Next")');
    if (nextButton) {
      await nextButton.click();
      await page.waitForNavigation();
      await page.waitForTimeout(2000); // Wait for table to refresh
    } else {
      hasNextPage = false;
    }
  }

  console.log(`🎉 Total leads extracted: ${allLeads.length}`);
  return allLeads;
}

scrapeLeads();
