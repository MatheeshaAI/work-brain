/**
 * IMCRM Single Lead Detail Scraper
 * Extracts all sections (General, Quote, Profile, Members, Status) from a lead page.
 */

async function scrapeLeadDetail(refId) {
  console.log(`🔍 Extracting details for lead: ${refId}...`);

  const data = await page.evaluate(() => {
    const getText = (label) => {
      const el = Array.from(document.querySelectorAll('span, label, div'))
        .find(e => e.innerText.trim() === label);
      return el ? el.nextElementSibling?.innerText.trim() : 'N/A';
    };

    // 1. General Info
    const general = {
      refId: getText('Ref-ID'),
      customerType: getText('CUSTOMER TYPE'),
      imAml: getText('IM AML STATUS'),
      createdDate: getText('CREATED DATE'),
      advisor: getText('ADVISOR'),
      source: getText('SOURCE'),
      lastModified: getText('LAST MODIFIED DATE')
    };

    // 2. Quote Details
    const quote = {
      forWhom: getText('FOR WHOM DO YOU REQUIRE HEALTH INSURANCE?'),
      insuredWith: getText('CURRENTLY INSURED WITH'),
      planType: getText('TYPE OF PLAN'),
      enquiryCount: getText('ENQUIRY COUNT')
    };

    // 3. Customer Profile
    const profile = {
      firstName: getText('FIRST NAME'),
      lastName: getText('LAST NAME'),
      mobile: getText('MOBILE NUMBER'),
      email: getText('EMAIL'),
      nationality: getText('NATIONALITY'),
      dob: getText('DATE OF BIRTH'),
      gender: getText('GENDER'),
      memberCategory: getText('MEMBER CATEGORY')
    };

    // 4. Member Details
    const memberRows = Array.from(document.querySelectorAll('table')).find(t => t.innerText.includes('MEMBER NAME'))?.querySelectorAll('tbody tr') || [];
    const members = Array.from(memberRows).map(row => {
      const cells = row.querySelectorAll('td');
      return {
        name: cells[0]?.innerText.trim(),
        pec: cells[1]?.innerText.trim(),
        gender: cells[2]?.innerText.trim(),
        dob: cells[3]?.innerText.trim(),
        relation: cells[4]?.innerText.trim(),
        nationality: cells[5]?.innerText.trim()
      };
    });

    return { general, quote, profile, members };
  });

  console.log("✅ Data extracted successfully.");
  return data;
}

// Example usage:
// scrapeLeadDetail("NKWLJTSQ");
