/**
 * IMCRM Price Range Plan Scraper
 * Extracts plans within a specific price range across pages.
 */

async function getPlansInRange(minPrice, maxPrice) {
  console.log(`🔍 Searching for plans between ${minPrice} and ${maxPrice} AED...`);
  
  let matchingPlans = [];
  let hasMore = true;

  while (hasMore) {
    const pagePlans = await page.evaluate((min, max) => {
      // Find rows that contain plan data
      const rows = Array.from(document.querySelectorAll('tr'))
        .filter(r => r.innerText.includes('Level') || r.innerText.includes('Good') || r.innerText.includes('Best'));
      
      let results = [];
      let foundHigher = false;

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 7) return;

        const price = parseFloat(cells[6].innerText.replace(/,/g, '').trim());
        if (!isNaN(price)) {
          if (price >= min && price <= max) {
            results.push({
              provider: cells[0].innerText.split('\n')[0].trim(),
              planName: cells[2].innerText.trim(),
              planType: cells[3].innerText.trim(),
              network: cells[4].innerText.trim(),
              copay: cells[5].innerText.trim(),
              price: cells[6].innerText.trim(),
              totalPrice: cells[7]?.innerText.trim() || 'N/A'
            });
          }
          if (price > max) foundHigher = true;
        }
      });

      return { results, foundHigher };
    }, minPrice, maxPrice);

    matchingPlans = matchingPlans.concat(pagePlans.results);

    if (pagePlans.foundHigher) {
      hasMore = false;
    } else {
      // Try to click Next page
      const nextBtn = document.querySelector('button[aria-label="Go to next page"]');
      if (nextBtn && !nextBtn.disabled && !nextBtn.classList.contains('Mui-disabled')) {
        await nextBtn.click();
        await new Promise(r => setTimeout(r, 2000));
      } else {
        hasMore = false;
      }
    }
  }

  console.log(`✅ Found ${matchingPlans.length} plans in range.`);
  return matchingPlans;
}

// Example usage:
// getPlansInRange(4000, 6000);
