let extractedData = null;
let lastExtractionType = null; // 'lead', 'motor', 'saveNumber'

console.log("[Popup] popup.js loaded - checking for button elements...");
console.log("[Popup] motorExtractBtn found?", !!document.getElementById("motorExtractBtn"));

// Check all critical buttons
window.addEventListener('DOMContentLoaded', () => {
  const buttons = ['extractBtn', 'motorExtractBtn', 'saveNumberBtn', 'copyBtn'];
  console.log("[Popup] DOMContentLoaded fired. Checking buttons:");
  buttons.forEach(btnId => {
    const btn = document.getElementById(btnId);
    console.log(`  ${btnId}: ${btn ? '✅ FOUND' : '❌ MISSING'}`);
  });
});



document.getElementById("extractBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const outputSection = document.getElementById("outputSection");
  const output = document.getElementById("output");

  status.textContent = "Extracting...";
  outputSection.style.display = "none";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runExtraction
    });

    if (!results || !results[0]) {
      output.innerHTML = "Error: No result from page";
      outputSection.style.display = "block";
      return;
    }

    extractedData = results[0].result;
    lastExtractionType = 'lead';
    output.innerHTML = formatAsBulletList(extractedData);
    outputSection.style.display = "block";
    status.textContent = "Data extracted successfully!";

  } catch (error) {
    status.textContent = "Error: " + error.message;
  }
});

console.log("[Motor Button] Attaching event listener...");
document.getElementById("motorExtractBtn").addEventListener("click", async () => {
  console.log("[Motor Button] CLICKED!");
  const status = document.getElementById("status");
  const outputSection = document.getElementById("outputSection");
  const output = document.getElementById("output");

  status.textContent = "Extracting motor lead...";
  outputSection.style.display = "none";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runMotorExtraction
    });

    const result = results[0]?.result;
    if (!result || !result['Lead Details']?.['Ref-ID']) {
      status.textContent = "❌ No motor lead found. Make sure you are on a CAR- lead page.";
      return;
    }

    extractedData = result;
    lastExtractionType = 'motor';

    output.textContent = formatMotorAsBulletList(result);
    outputSection.style.display = "block";
    status.textContent = `✅ Motor lead extracted: ${result['Lead Details']['Ref-ID']}`;
  } catch (err) {
    status.textContent = `❌ Error: ${err.message}`;
  }
});



document.getElementById("copyBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  
  try {
    if (!extractedData) {
      status.textContent = "No data to copy - extract first";
      return;
    }
    
    let text;
    if (lastExtractionType === 'saveNumber') {
      text = formatSaveNumber(extractedData);
    } else if (lastExtractionType === 'motor') {
      text = formatMotorAsBulletList(extractedData);
    } else {
      text = formatAsBulletList(extractedData);
    }
    
    await navigator.clipboard.writeText(text);
    status.textContent = "Copied to clipboard!";
    setTimeout(() => status.textContent = "", 2000);
  } catch (error) {
    status.textContent = "Copy failed: " + error.message;
  }
});















function formatAsBulletList(data) {
  if (!data) return "No data extracted";
  
  let output = "";
  
  output += "Lead Details\n";
  const lead = data["Lead Details"] || {};
  output += `Ref-ID: ${lead["Ref-ID"] || ""}\n`;
  output += `Created Date: ${lead["Created Date"] || ""}\n`;
  output += `Name: ${lead["Name"] || ""}\n`;
  output += `Mobile: ${lead["Mobile"] || ""}\n`;
  output += `Email: ${lead["Email"] || ""}\n`;
  output += `Nationality: ${lead["Nationality"] || ""}\n`;
  output += `Date of Birth: ${lead["Date of Birth"] || ""}\n`;
  output += `Emirate of Visa: ${lead["Emirate of Visa"] || ""}\n`;
  output += `Gender: ${lead["Gender"] || ""}\n`;
  output += `Member Category: ${lead["Member Category"] || ""}\n`;
  
  output += "\nMember Details\n";
  const members = data["Member Details"]?.Members || [];
  output += `Number of Members: ${members.length}\n`;
  
  members.forEach((member, index) => {
    output += `\nMember ${index + 1}:\n`;
    output += `  Member Name: ${member["Member Name"] || ""}\n`;
    output += `  Relationship: ${member["Relationship"] || ""}\n`;
    output += `  Gender: ${member["Gender"] || ""}\n`;
    output += `  Date of Birth: ${member["Date of Birth"] || ""}\n`;
    output += `  Nationality: ${member["Nationality"] || ""}\n`;
    output += `  Emirates of Visa: ${member["Emirates of Visa"] || ""}\n`;
    output += `  Member Category: ${member["Member Category"] || ""}\n`;
  });
  
  const plans = data["Available Plans"] || [];
  if (plans.length > 0) {
    output += "\nAvailable Plans\n";
    output += `Number of Plans: ${plans.length}\n`;
    plans.forEach((plan, index) => {
      output += `\nPlan ${index + 1}:\n`;
      output += `  Provider: ${plan["Provider"] || ""}\n`;
      output += `  Plan Name: ${plan["Plan Name"] || ""}\n`;
      output += `  Plan Type: ${plan["Plan Type"] || ""}\n`;
      output += `  Network: ${plan["Network"] || ""}\n`;
      output += `  Co-pay: ${plan["Copay"] || ""}\n`;
      output += `  Price: ${plan["Price"] || ""}\n`;
      output += `  Total Price (VAT): ${plan["Total Price"] || ""}\n`;
    });
  }
  
  return output;
}

function runExtraction() {
  try {
    const leadDetails = {
      "Ref-ID": "",
      "Created Date": "",
      "Name": "",
      "Mobile": "",
      "Email": "",
      "Nationality": "",
      "Date of Birth": "",
      "Emirate of Visa": "",
      "Gender": "",
      "Member Category": ""
    };
    
    // Extract Ref-ID from text (shown as "Ref-ID HEA-XXXX")
    const textContent = document.body.innerText;
    const refIdMatch = textContent.match(/Ref-ID\s+(HEA-[A-Z0-9]+)/i);
    if (refIdMatch) {
      leadDetails["Ref-ID"] = refIdMatch[1];
    }
    
    // Find all term/definition pairs by looking at dl, dt, dd or custom elements
    // The CRM uses <dt> and <dd> or custom elements
    const dts = document.querySelectorAll("dt, term, [class*='term'], [data-label]");
    const dds = document.querySelectorAll("dd, definition, [class*='definition'], [data-value]");
    
    const termMap = {};
    
    // Try dl/dt/dd structure first
    const dlLists = document.querySelectorAll("dl");
    dlLists.forEach(dl => {
      const dtElements = dl.querySelectorAll("dt");
      const ddElements = dl.querySelectorAll("dd");
      dtElements.forEach((dt, index) => {
        const label = dt.innerText?.trim()?.toUpperCase() || "";
        const dd = ddElements[index];
        if (dd && label) {
          termMap[label] = dd.innerText?.trim() || "";
        }
      });
    });
    
    // Also try direct term/definition elements
    const terms = document.querySelectorAll("term");
    const definitions = document.querySelectorAll("definition");
    terms.forEach((term, index) => {
      const label = term.innerText?.trim()?.toUpperCase() || "";
      const def = definitions[index];
      if (def && label) {
        termMap[label] = def.innerText?.trim() || "";
      }
    });
    
    // Also check for group > term > definition structure
    const groups = document.querySelectorAll("group");
    groups.forEach(group => {
      const groupTerms = group.querySelectorAll("term");
      const groupDefs = group.querySelectorAll("definition");
      groupTerms.forEach((term, index) => {
        const label = term.innerText?.trim()?.toUpperCase() || "";
        const def = groupDefs[index];
        if (def && label) {
          termMap[label] = def.innerText?.trim() || "";
        }
      });
    });
    
    // Map the values - using the termMap we built from dl elements
    const keyMappings = {
      "Created Date": ["CREATED DATE"],
      "First Name": ["FIRST NAME"],
      "Last Name": ["LAST NAME"],
      "Mobile": ["MOBILE NUMBER"],
      "Email": ["EMAIL"],
      "Nationality": ["NATIONALITY"],
      "Date of Birth": ["DATE OF BIRTH"],
      "Emirate of Visa": ["EMIRATE OF VISA"],
      "Gender": ["GENDER"],
      "Member Category": ["MEMBER CATEGORY"]
    };
    
    for (let [key, possibleLabels] of Object.entries(keyMappings)) {
      for (let label of possibleLabels) {
        if (termMap[label]) {
          leadDetails[key] = termMap[label];
          break;
        }
      }
    }
    
    const firstName = leadDetails["First Name"] || "";
    const lastName = leadDetails["Last Name"] || "";
    if (firstName || lastName) {
      leadDetails["Name"] = `${firstName} ${lastName}`.trim();
    }

    // Try to find member details table
    const memberTables = document.querySelectorAll("table");
    const members = [];
    const MAX_MEMBERS = 5;

    // Helper: check if a name looks like a valid member name
    function isValidMemberName(name) {
      if (!name || name.length < 2 || name.length > 60) return false;
      const upperName = name.toUpperCase();
      // Only exclude clear non-member patterns
      if (upperName.includes("NO AVAILABLE DATA")) return false;
      if (upperName.includes("NO DATA AVAILABLE")) return false;
      if (upperName.includes("CLICK TO")) return false;
      if (upperName.includes("EDIT")) return false;
      if (upperName.includes("DELETE")) return false;
      if (upperName.includes("ACTION")) return false;
      return true;
    }

    // Get member count from button (e.g., "Member Details 2")
    let memberCount = 0;
    const memberButton = [...document.querySelectorAll("button")].find(b => 
      b.innerText?.match(/member\s*details/i)
    );
    if (memberButton) {
      const match = memberButton.innerText.match(/member\s*details\s*(\d+)/i);
      if (match) {
        memberCount = parseInt(match[1]) || 0;
      }
    }

    // Find the member table by looking for the section containing "Member Details"
    let memberTableFound = null;
    const allElements = document.querySelectorAll("*");
    for (const el of allElements) {
      const text = el.innerText || "";
      if (text.match(/member\s*details\s*\d+/i)) {
        // Check if this element or its parent contains a table
        const table = el.querySelector("table") || el.parentElement?.querySelector("table");
        if (table) {
          memberTableFound = table;
          break;
        }
      }
    }

    // If we found a specific member table, use it
    if (memberTableFound) {
      const headers = memberTableFound.querySelectorAll("th");
      const headerText = Array.from(headers).map(h => h.innerText?.trim().toLowerCase() || "");
      
      const nameIdx = headerText.findIndex(h => h.includes("name"));
      const genderIdx = headerText.findIndex(h => h.includes("gender"));
      const dobIdx = headerText.findIndex(h => h.includes("dob") || h.includes("birth") || h.includes("date of birth"));
      const relationIdx = headerText.findIndex(h => h.includes("relation") || h.includes("type"));
      const nationalityIdx = headerText.findIndex(h => h.includes("national"));
      const visaIdx = headerText.findIndex(h => h.includes("visa") || h.includes("emirate"));
      const categoryIdx = headerText.findIndex(h => h.includes("category") || h.includes("class"));
      
      if (nameIdx !== -1) {
        const rows = memberTableFound.querySelectorAll("tbody tr, tr");
        rows.forEach(row => {
          if (members.length >= MAX_MEMBERS) return;
          
          const cells = row.querySelectorAll("td");
          if (cells.length < 2) return;
          
          const name = cells[nameIdx]?.innerText?.trim() || "";
          
          if (!isValidMemberName(name)) return;
          
          members.push({
            "Member Name": name,
            "Gender": genderIdx !== -1 ? cells[genderIdx]?.innerText?.trim() : "",
            "Date of Birth": dobIdx !== -1 ? cells[dobIdx]?.innerText?.trim() : "",
            "Relationship": relationIdx !== -1 ? cells[relationIdx]?.innerText?.trim() : "",
            "Nationality": nationalityIdx !== -1 ? cells[nationalityIdx]?.innerText?.trim() : "",
            "Emirates of Visa": visaIdx !== -1 ? cells[visaIdx]?.innerText?.trim() : "",
            "Member Category": categoryIdx !== -1 ? cells[categoryIdx]?.innerText?.trim() : ""
          });
        });
      }
    }

    // If no members found in table but memberCount is 1 (individual policy), add lead as member
    if (members.length === 0 && memberCount === 1 && leadDetails["Name"]) {
      members.push({
        "Member Name": leadDetails["Name"],
        "Gender": leadDetails["Gender"],
        "Date of Birth": leadDetails["Date of Birth"],
        "Nationality": leadDetails["Nationality"],
        "Emirates of Visa": leadDetails["Emirate of Visa"],
        "Member Category": leadDetails["Member Category"]
      });
    }

    // Remove duplicates based on member name
    const uniqueMembers = [];
    const seenNames = new Set();
    members.forEach(m => {
      const nameKey = m["Member Name"]?.toLowerCase().trim() || "";
      if (!nameKey || seenNames.has(nameKey)) return;
      seenNames.add(nameKey);
      uniqueMembers.push(m);
    });

    // Extract Available Plans
    const plans = [];
    const allTables = document.querySelectorAll("table");
    
    allTables.forEach(table => {
      const tableText = table.innerText || "";
      if (!tableText.includes("Available Plans") && !tableText.includes("Provider Name")) return;
      
      const headers = table.querySelectorAll("th");
      const headerText = Array.from(headers).map(h => h.innerText?.trim().toLowerCase() || "");
      
      const providerIdx = headerText.findIndex(h => h.includes("provider"));
      const planNameIdx = headerText.findIndex(h => h.includes("plan name"));
      const planTypeIdx = headerText.findIndex(h => h.includes("plan type"));
      const networkIdx = headerText.findIndex(h => h.includes("network"));
      const copayIdx = headerText.findIndex(h => h.includes("co-pay") || h.includes("copay") || h.includes("co-insurance"));
      const priceIdx = headerText.findIndex(h => h === "price");
      const totalIdx = headerText.findIndex(h => h.includes("total") && h.includes("price"));
      
      if (providerIdx !== -1 && planNameIdx !== -1) {
        const rows = table.querySelectorAll("tbody tr, tr");
        rows.forEach(row => {
          const cells = row.querySelectorAll("td");
          if (cells.length < 6) return;
          
          const provider = cells[providerIdx]?.innerText?.trim().split("\n")[0] || "";
          const planName = cells[planNameIdx]?.innerText?.trim() || "";
          
          // Skip excluded plans
          const skipProviders = ["Fidelity United"];
          const skipPlans = ["Silver", "RN3 B", "CARE PROTECT RN3 B", "Plan G", "Plan F", "Plan E"];
          
          let shouldSkip = false;
          if (skipProviders.some(p => provider.toLowerCase().includes(p.toLowerCase()))) {
            shouldSkip = true;
          }
          if (skipPlans.some(p => planName.toLowerCase().includes(p.toLowerCase()))) {
            shouldSkip = true;
          }
          
          if (!shouldSkip && provider && planName) {
            plans.push({
              "Provider": provider,
              "Plan Name": planName,
              "Plan Type": planTypeIdx !== -1 ? cells[planTypeIdx]?.innerText?.trim() : "",
              "Network": networkIdx !== -1 ? cells[networkIdx]?.innerText?.trim() : "",
              "Copay": copayIdx !== -1 ? cells[copayIdx]?.innerText?.trim() : "",
              "Price": priceIdx !== -1 ? cells[priceIdx]?.innerText?.trim() : "",
              "Total Price": totalIdx !== -1 ? cells[totalIdx]?.innerText?.trim() : ""
            });
          }
        });
      }
    });

    return {
      "Lead Details": leadDetails,
      "Member Details": {
        "Number of Members": uniqueMembers.length || memberCount || 0,
        "Members": uniqueMembers
      },
      "Available Plans": plans
    };
  } catch (e) {
    return { error: e.message };
  }
}

function runMotorExtraction() {
  // Targets: imcrm.alfred.ae/quotes/car/...
  const textContent = document.body.innerText || '';

  // Extract Ref-ID
  const refIdMatch = textContent.match(/Ref-ID\s+(CAR-[A-Z0-9]+)/i);
  const refId = refIdMatch ? refIdMatch[1].toUpperCase() : '';

  // Build termMap from dl/dt/dd pairs (same pattern as health extraction)
  const termMap = {};
  document.querySelectorAll('dl').forEach(dl => {
    const dts = dl.querySelectorAll('dt');
    const dds = dl.querySelectorAll('dd');
    dts.forEach((dt, i) => {
      const key = dt.innerText.trim().toUpperCase();
      const val = dds[i] ? dds[i].innerText.trim() : '';
      if (key) termMap[key] = val;
    });
  });

  function get(mappings) {
    const result = {};
    for (const [outKey, labels] of Object.entries(mappings)) {
      for (const label of labels) {
        if (termMap[label] !== undefined) {
          result[outKey] = termMap[label];
          break;
        }
      }
    }
    return result;
  }

  const customerMappings = {
    'Created Date':         ['CREATED DATE'],
    'First Name':           ['FIRST NAME'],
    'Last Name':            ['LAST NAME'],
    'Mobile':               ['MOBILE NUMBER'],
    'Email':                ['EMAIL'],
    'Date of Birth':        ['DATE OF BIRTH'],
    'Gender':               ['GENDER'],
    'Nationality':          ['NATIONALITY'],
    'UAE Licence Held For': ['UAE LICENCE HELD FOR'],
    'Registration Type':    ['REGISTRATION TYPE']
  };

  const vehicleMappings = {
    'Car Make':               ['CAR MAKE'],
    'Car Model':              ['CAR MODEL'],
    'Car Model Year':         ['CAR MODEL YEAR'],
    'Chassis Number':         ['CHASSIS NUMBER'],
    'Trim':                   ['TRIM'],
    'Vehicle Type':           ['VEHICLE TYPE'],
    'Car Value':              ['CAR VALUE'],
    'Emirate of Registration':['EMIRATE OF REGISTRATION'],
    'Type of Insurance':      ['TYPE OF CAR INSURANCE']
  };

  const insuranceMappings = {
    'Currently Insured With': ['CURRENTLY INSURED WITH'],
    'Claim History':          ['CLAIM HISTORY'],
    'No-Claims Letter':       ['CAN YOU PROVIDE NO-CLAIMS LETTER FROM YOUR PREVIOUS INSURERS?']
  };

  const quoteMappings = {
    'Quote Link':      ['QUOTE LINK'],
    'Payment Status':  ['PAYMENT STATUS']
  };

  const leadDetails = get(customerMappings);
  const vehicleDetails = get(vehicleMappings);
  const historyDetails = get(insuranceMappings);
  const quoteDetails = get(quoteMappings);

  // Compose full name
  const firstName = leadDetails['First Name'] || '';
  const lastName  = leadDetails['Last Name'] || '';
  leadDetails['Name'] = `${firstName} ${lastName}`.trim();
  leadDetails['Ref-ID'] = refId;

  // KYC status — scan visible text
  const kycMatch = textContent.match(/KYC\s*[-–]\s*([\w ]+)/i);
  leadDetails['KYC Status'] = kycMatch ? kycMatch[1].trim() : (termMap['KYC STATUS'] || '');

  // AML status
  leadDetails['AML Status'] = termMap['IM AML STATUS'] || termMap['AML STATUS'] || '';

  return {
    insuranceType: 'motor',
    'Lead Details':       leadDetails,
    'Vehicle Details':    vehicleDetails,
    'Insurance History':  historyDetails,
    'Quote Details':      quoteDetails
  };
}

function formatMotorAsBulletList(data) {
  const lead    = data['Lead Details']      || {};
  const vehicle = data['Vehicle Details']   || {};
  const history = data['Insurance History'] || {};
  const quote   = data['Quote Details']     || {};

  let lines = ['=== MOTOR LEAD ===', ''];

  lines.push('--- Lead Details ---');
  for (const [k, v] of Object.entries(lead)) {
    if (v) lines.push(`  ${k}: ${v}`);
  }

  lines.push('', '--- Vehicle Details ---');
  for (const [k, v] of Object.entries(vehicle)) {
    if (v) lines.push(`  ${k}: ${v}`);
  }

  lines.push('', '--- Insurance & Claims ---');
  for (const [k, v] of Object.entries(history)) {
    if (v) lines.push(`  ${k}: ${v}`);
  }

  lines.push('', '--- Quote & Payment ---');
  for (const [k, v] of Object.entries(quote)) {
    if (v) lines.push(`  ${k}: ${v}`);
  }

  return lines.join('\n');
}









document.getElementById("saveNumberBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const outputSection = document.getElementById("outputSection");
  const output = document.getElementById("output");
  
  status.textContent = "Extracting number...";
  outputSection.style.display = "none";
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractSaveNumber
    });
    
    if (!results || !results[0]) {
      output.innerHTML = "Error: No result from page";
      outputSection.style.display = "block";
      return;
    }
    
    extractedData = results[0].result;
    lastExtractionType = 'saveNumber';
    
    if (extractedData.error) {
      status.textContent = "Error: " + extractedData.error;
      outputSection.style.display = "block";
      output.innerHTML = extractedData.error;
      return;
    }
    
    const formatted = formatSaveNumber(extractedData);
    output.innerText = formatted;
    outputSection.style.display = "block";
    status.textContent = "Number extracted! Click Copy to save.";
    
  } catch (error) {
    status.textContent = "Error: " + error.message;
  }
});

function extractSaveNumber() {
  try {
    const result = {
      firstName: "",
      lastName: "",
      refId: "",
      memberCategory: "",
      error: ""
    };
    
    const textContent = document.body.innerText;
    
    const refIdMatch = textContent.match(/Ref-ID\s+(HEA-[A-Z0-9]+)/i);
    if (refIdMatch) {
      result.refId = refIdMatch[1].toUpperCase();
    }
    
    const termMap = {};
    const dlLists = document.querySelectorAll("dl");
    dlLists.forEach(dl => {
      const dtElements = dl.querySelectorAll("dt");
      const ddElements = dl.querySelectorAll("dd");
      dtElements.forEach((dt, index) => {
        const label = dt.innerText?.trim()?.toUpperCase() || "";
        const dd = ddElements[index];
        if (dd && label) {
          termMap[label] = dd.innerText?.trim() || "";
        }
      });
    });
    
    if (termMap["FIRST NAME"]) {
      result.firstName = termMap["FIRST NAME"];
    }
    if (termMap["LAST NAME"]) {
      result.lastName = termMap["LAST NAME"];
    }
    if (termMap["MEMBER CATEGORY"]) {
      result.memberCategory = termMap["MEMBER CATEGORY"];
    }
    
    if (!result.firstName && !result.lastName && !result.refId) {
      result.error = "Could not find lead details. Make sure you're on an IMCRM lead page.";
      return result;
    }
    
    return result;
  } catch (e) {
    return { error: "Extraction failed: " + e.message };
  }
}

function formatSaveNumber(data) {
  if (!data) return "No data extracted";
  if (data.error) return data.error;
  
  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  const output = `${fullName} - ${data.refId || "No Ref-ID"} - ${data.memberCategory || "No Category"}`;
  
  return output;
}
