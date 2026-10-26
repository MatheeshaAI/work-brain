# Entry Level Plans Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an "Extract Entry Level Plans" button to the IMCRM extension popup that pulls customer profile, member details, and 4 specific plans (Takaful APN/Silver/Essential + Dubai Insurance Remento N4) as a markdown table ready to copy to clipboard.

**Architecture:** All changes are in 2 files only — `popup.html` (new button) and `popup.js` (extraction function, formatter, event listener, copy handler case). The extraction function is injected into the active tab via `chrome.scripting.executeScript` and reuses the same dl/dt/dd and table-walking patterns already used by `runExtraction()`. Plans are filtered by plan name matching rather than network, and the known `priceIdx` strict-equality bug is fixed.

**Tech Stack:** Vanilla JS, Chrome Extension Manifest V3, `chrome.scripting.executeScript`, `navigator.clipboard.writeText`

---

## File Map

| File | Change |
|---|---|
| `IMCRM Data Extracting Extention/popup.html` | Add `button.entry-plans-btn` CSS class + `#entryPlansBtn` button element |
| `IMCRM Data Extracting Extention/popup.js` | Add `extractEntryLevelPlans()`, `formatEntryPlansMarkdown()`, `#entryPlansBtn` event listener, `'entryPlans'` copy handler case |

---

## Task 1: Add Button to popup.html

**Files:**
- Modify: `IMCRM Data Extracting Extention/popup.html`

- [ ] **Step 1: Add CSS class for the entry plans button**

In `popup.html`, add after the `.save-number-btn:hover` rule (around line 63), before the `.create-lead-btn` rule:

```css
    button.entry-plans-btn {
      background: #2e7d32;
    }
    button.entry-plans-btn:hover {
      background: #1b5e20;
    }
```

- [ ] **Step 2: Add the button element**

In `popup.html`, add after line 127 (`<button class="basic-btn" id="basicPlansBtn">Extract Basic Plans</button>`):

```html
  <button class="entry-plans-btn" id="entryPlansBtn">Extract Entry Level Plans</button>
```

- [ ] **Step 3: Reload extension and verify button appears**

1. Go to `chrome://extensions`
2. Find "IMCRM Data Extractor" → click the refresh icon
3. Navigate to any IMCRM health lead page
4. Open the popup — confirm a dark green "Extract Entry Level Plans" button appears below "Extract Basic Plans"

---

## Task 2: Add the Extraction Function (injected into tab)

**Files:**
- Modify: `IMCRM Data Extracting Extention/popup.js` (add after `extractBasicPlans()` function, around line 371)

This function is self-contained — it cannot reference any popup-scope variables. It reuses the same DOM patterns as `runExtraction()` but adds plan-name filtering for the 4 target plans and separates co-pay from co-insurance into distinct columns.

- [ ] **Step 1: Add `extractEntryLevelPlans()` after line 371 in popup.js**

```js
function extractEntryLevelPlans() {
  try {
    // ── 1. Customer Profile (same dl/dt/dd pattern as runExtraction) ──────────
    const textContent = document.body.innerText;
    const refIdMatch = textContent.match(/Ref-ID\s+(HEA-[A-Z0-9]+)/i);

    const termMap = {};
    document.querySelectorAll("dl").forEach(dl => {
      const dts = dl.querySelectorAll("dt");
      const dds = dl.querySelectorAll("dd");
      dts.forEach((dt, i) => {
        const key = dt.innerText?.trim()?.toUpperCase() || "";
        const val = dds[i] ? dds[i].innerText?.trim() : "";
        if (key) termMap[key] = val;
      });
    });
    ["term", "definition"].forEach(() => {}); // term/group fallback omitted — dl covers IMCRM

    const firstName = termMap["FIRST NAME"] || "";
    const lastName  = termMap["LAST NAME"]  || "";
    const leadDetails = {
      "Ref-ID":          refIdMatch ? refIdMatch[1] : "",
      "Name":            `${firstName} ${lastName}`.trim(),
      "Mobile":          termMap["MOBILE NUMBER"] || "",
      "Email":           termMap["EMAIL"] || "",
      "Emirate of Visa": termMap["EMIRATE OF VISA"] || "",
      "Member Category": termMap["MEMBER CATEGORY"] || "",
      "Gender":          termMap["GENDER"] || "",
      "Date of Birth":   termMap["DATE OF BIRTH"] || "",
      "Nationality":     termMap["NATIONALITY"] || ""
    };

    // ── 2. Member Details (same table-walker as runExtraction) ────────────────
    function isValidMemberName(name) {
      if (!name || name.length < 2 || name.length > 60) return false;
      const u = name.toUpperCase();
      return !u.includes("NO AVAILABLE DATA") && !u.includes("NO DATA AVAILABLE") &&
             !u.includes("CLICK TO") && !u.includes("EDIT") &&
             !u.includes("DELETE") && !u.includes("ACTION");
    }

    let memberCount = 0;
    const memberButton = [...document.querySelectorAll("button")].find(b =>
      b.innerText?.match(/member\s*details/i)
    );
    if (memberButton) {
      const m = memberButton.innerText.match(/member\s*details\s*(\d+)/i);
      if (m) memberCount = parseInt(m[1]) || 0;
    }

    let memberTableFound = null;
    for (const el of document.querySelectorAll("*")) {
      if ((el.innerText || "").match(/member\s*details\s*\d+/i)) {
        const table = el.querySelector("table") || el.parentElement?.querySelector("table");
        if (table) { memberTableFound = table; break; }
      }
    }

    const members = [];
    if (memberTableFound) {
      const hdr = Array.from(memberTableFound.querySelectorAll("th")).map(h =>
        h.innerText?.trim().toLowerCase() || ""
      );
      const nameIdx     = hdr.findIndex(h => h.includes("name"));
      const genderIdx   = hdr.findIndex(h => h.includes("gender"));
      const dobIdx      = hdr.findIndex(h => h.includes("dob") || h.includes("birth"));
      const relationIdx = hdr.findIndex(h => h.includes("relation") || h.includes("type"));
      const natIdx      = hdr.findIndex(h => h.includes("national"));
      const visaIdx     = hdr.findIndex(h => h.includes("visa") || h.includes("emirate"));
      const catIdx      = hdr.findIndex(h => h.includes("category") || h.includes("class"));

      if (nameIdx !== -1) {
        memberTableFound.querySelectorAll("tbody tr, tr").forEach(row => {
          if (members.length >= 5) return;
          const cells = row.querySelectorAll("td");
          if (cells.length < 2) return;
          const name = cells[nameIdx]?.innerText?.trim() || "";
          if (!isValidMemberName(name)) return;
          members.push({
            "Member Name":     name,
            "Relationship":    relationIdx !== -1 ? cells[relationIdx]?.innerText?.trim() : "",
            "Gender":          genderIdx   !== -1 ? cells[genderIdx]?.innerText?.trim()   : "",
            "Date of Birth":   dobIdx      !== -1 ? cells[dobIdx]?.innerText?.trim()      : "",
            "Nationality":     natIdx      !== -1 ? cells[natIdx]?.innerText?.trim()      : "",
            "Emirates of Visa":visaIdx     !== -1 ? cells[visaIdx]?.innerText?.trim()     : "",
            "Member Category": catIdx      !== -1 ? cells[catIdx]?.innerText?.trim()      : ""
          });
        });
      }
    }

    // Deduplicate members
    const seenNames = new Set();
    const uniqueMembers = members.filter(m => {
      const key = m["Member Name"]?.toLowerCase().trim() || "";
      if (!key || seenNames.has(key)) return false;
      seenNames.add(key); return true;
    });

    // Single-member fallback: add lead as the only member
    if (uniqueMembers.length === 0 && memberCount <= 1 && leadDetails["Name"]) {
      uniqueMembers.push({
        "Member Name":     leadDetails["Name"],
        "Relationship":    "Self",
        "Gender":          leadDetails["Gender"],
        "Date of Birth":   leadDetails["Date of Birth"],
        "Nationality":     leadDetails["Nationality"],
        "Emirates of Visa":leadDetails["Emirate of Visa"],
        "Member Category": leadDetails["Member Category"]
      });
    }

    // ── 3. Plans — filter to 4 specific entry-level plans ────────────────────
    // Target plans (matched case-insensitively by provider + plan name):
    //   • Takaful Emarat — APN Plan
    //   • Takaful Emarat — Silver Plan
    //   • Takaful Emarat — Essential Plan
    //   • Dubai Insurance — Remento N4 Base Plan (also appears as RN4)
    function isTargetPlan(provider, planName) {
      const p = provider.toLowerCase();
      const n = planName.toLowerCase();
      if (p.includes("takaful") && n.includes("apn"))      return true;
      if (p.includes("takaful") && n.includes("silver"))   return true;
      if (p.includes("takaful") && n.includes("essential")) return true;
      if (p.includes("dubai") && (n.includes("remento") || n.includes("rn4")) && n.includes("n4")) return true;
      return false;
    }

    const TARGET_PLAN_KEYS = [
      "Takaful Emarat — APN Plan",
      "Takaful Emarat — Silver Plan",
      "Takaful Emarat — Essential Plan",
      "Dubai Insurance — Remento N4 Base"
    ];

    // Initialise result slots so missing plans show as "—"
    const planSlots = {
      "Takaful Emarat — APN Plan":       null,
      "Takaful Emarat — Silver Plan":    null,
      "Takaful Emarat — Essential Plan": null,
      "Dubai Insurance — Remento N4 Base": null
    };

    function slotKey(provider, planName) {
      const p = provider.toLowerCase();
      const n = planName.toLowerCase();
      if (p.includes("takaful") && n.includes("apn"))       return "Takaful Emarat — APN Plan";
      if (p.includes("takaful") && n.includes("silver"))    return "Takaful Emarat — Silver Plan";
      if (p.includes("takaful") && n.includes("essential")) return "Takaful Emarat — Essential Plan";
      if (p.includes("dubai")   && n.includes("n4"))        return "Dubai Insurance — Remento N4 Base";
      return null;
    }

    document.querySelectorAll("table").forEach(table => {
      const tText = table.innerText || "";
      if (!tText.includes("Provider Name") && !tText.includes("Available Plans")) return;

      const hdr = Array.from(table.querySelectorAll("th")).map(h =>
        h.innerText?.trim().toLowerCase() || ""
      );

      const providerIdx     = hdr.findIndex(h => h.includes("provider"));
      const planNameIdx     = hdr.findIndex(h => h.includes("plan") && h.includes("name"));
      const planTypeIdx     = hdr.findIndex(h => h.includes("plan") && h.includes("type"));
      const networkIdx      = hdr.findIndex(h => h.includes("network"));
      // Fix: use includes() not strict equality; exclude "total" and "indicative"
      const copayIdx        = hdr.findIndex(h =>
        (h.includes("co-pay") || h.includes("copay")) && !h.includes("insurance")
      );
      const coinsuranceIdx  = hdr.findIndex(h =>
        h.includes("co-insurance") || h.includes("coinsurance")
      );
      const priceIdx        = hdr.findIndex(h =>
        h.includes("price") && !h.includes("total") && !h.includes("indicative")
      );
      const totalIdx        = hdr.findIndex(h =>
        h.includes("total") || h.includes("indicative")
      );

      if (providerIdx === -1 || planNameIdx === -1) return;

      table.querySelectorAll("tbody tr, tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length < 4) return;

        const provider = cells[providerIdx]?.innerText?.trim().split("\n")[0] || "";
        const planName = cells[planNameIdx]?.innerText?.trim() || "";

        if (!isTargetPlan(provider, planName)) return;

        const key = slotKey(provider, planName);
        if (!key || planSlots[key]) return; // already filled

        planSlots[key] = {
          "Provider":     provider,
          "Plan Name":    planName,
          "Plan Type":    planTypeIdx    !== -1 ? cells[planTypeIdx]?.innerText?.trim()    : "",
          "Network":      networkIdx     !== -1 ? cells[networkIdx]?.innerText?.trim()     : "",
          "Co-pay":       copayIdx       !== -1 ? cells[copayIdx]?.innerText?.trim()       : "",
          "Co-insurance": coinsuranceIdx !== -1 ? cells[coinsuranceIdx]?.innerText?.trim() : "",
          "Price":        priceIdx       !== -1 ? cells[priceIdx]?.innerText?.trim()       : "",
          "Total Indicative Price": totalIdx !== -1 ? cells[totalIdx]?.innerText?.trim()   : ""
        };
      });
    });

    return {
      "Lead Details":  leadDetails,
      "Member Details":{ "Members": uniqueMembers },
      "Entry Plans":   planSlots
    };
  } catch (e) {
    return { error: e.message };
  }
}
```

---

## Task 3: Add the Markdown Formatter

**Files:**
- Modify: `IMCRM Data Extracting Extention/popup.js` (add after `extractEntryLevelPlans()`, still before `runDebug`)

- [ ] **Step 1: Add `formatEntryPlansMarkdown(data)` after `extractEntryLevelPlans()`**

```js
function formatEntryPlansMarkdown(data) {
  if (!data) return "No data extracted";
  if (data.error) return `Error: ${data.error}`;

  const lead    = data["Lead Details"] || {};
  const members = data["Member Details"]?.Members || [];
  const slots   = data["Entry Plans"] || {};

  const lines = [];

  // Header
  lines.push(`## Lead: ${lead["Ref-ID"] || "—"} — ${lead["Name"] || "—"}`);
  lines.push("");
  lines.push(`| Field | Value |`);
  lines.push(`|---|---|`);
  if (lead["Email"])          lines.push(`| Email | ${lead["Email"]} |`);
  if (lead["Mobile"])         lines.push(`| Mobile | ${lead["Mobile"]} |`);
  if (lead["Emirate of Visa"])lines.push(`| Emirate | ${lead["Emirate of Visa"]} |`);
  if (lead["Member Category"])lines.push(`| Category | ${lead["Member Category"]} |`);
  lines.push("");

  // Members table (skip if single self-member with no extra info)
  const showMembers = members.length > 1 ||
    (members.length === 1 && members[0]["Relationship"] && members[0]["Relationship"].toLowerCase() !== "self");
  if (members.length > 0) {
    lines.push(`### Members (${members.length})`);
    lines.push(`| Name | Relation | DOB | Nationality | Category |`);
    lines.push(`|---|---|---|---|---|`);
    members.forEach(m => {
      lines.push(
        `| ${m["Member Name"] || "—"} | ${m["Relationship"] || "—"} | ` +
        `${m["Date of Birth"] || "—"} | ${m["Nationality"] || "—"} | ${m["Member Category"] || "—"} |`
      );
    });
    lines.push("");
  }

  // Plans table
  lines.push(`### Entry Level Plans`);
  lines.push(`| Provider | Plan Name | Type | Network | Co-pay | Co-insurance | Price | Total Indicative |`);
  lines.push(`|---|---|---|---|---|---|---|---|`);

  const planOrder = [
    "Takaful Emarat — APN Plan",
    "Takaful Emarat — Silver Plan",
    "Takaful Emarat — Essential Plan",
    "Dubai Insurance — Remento N4 Base"
  ];

  planOrder.forEach(key => {
    const plan = slots[key];
    if (!plan) {
      // Show the slot label split into provider/plan for missing plans
      const [prov, pln] = key.split(" — ");
      lines.push(`| ${prov} | ${pln} | — | — | — | — | *(not found)* | — |`);
    } else {
      lines.push(
        `| ${plan["Provider"]} | ${plan["Plan Name"]} | ${plan["Plan Type"] || "—"} | ` +
        `${plan["Network"] || "—"} | ${plan["Co-pay"] || "—"} | ${plan["Co-insurance"] || "—"} | ` +
        `${plan["Price"] || "—"} | ${plan["Total Indicative Price"] || "—"} |`
      );
    }
  });

  return lines.join("\n");
}
```

---

## Task 4: Wire Up Event Listener and Copy Handler

**Files:**
- Modify: `IMCRM Data Extracting Extention/popup.js`

- [ ] **Step 1: Add event listener for `#entryPlansBtn`**

Add this block after the `basicPlansBtn` event listener (after line 215):

```js
document.getElementById("entryPlansBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const outputSection = document.getElementById("outputSection");
  const output = document.getElementById("output");

  status.textContent = "Extracting entry level plans...";
  outputSection.style.display = "none";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractEntryLevelPlans
    });

    if (!results || !results[0]) {
      output.innerHTML = "Error: No result from page";
      outputSection.style.display = "block";
      return;
    }

    extractedData = results[0].result;
    lastExtractionType = "entryPlans";
    output.innerText = formatEntryPlansMarkdown(extractedData);
    outputSection.style.display = "block";
    status.textContent = "Entry level plans extracted!";

  } catch (error) {
    status.textContent = "Error: " + error.message;
  }
});
```

- [ ] **Step 2: Add `'entryPlans'` case to the copy handler**

In `popup.js`, find the `#copyBtn` click handler (around line 154). Add a new `else if` before the final `else`:

```js
    } else if (lastExtractionType === 'entryPlans') {
      text = formatEntryPlansMarkdown(extractedData);
    } else {
```

The full updated block (lines 163–175) becomes:

```js
    let text;
    if (lastExtractionType === 'whatsapp') {
      text = formatWhatsAppChat(extractedData);
    } else if (lastExtractionType === 'basicPlans') {
      text = formatBasicPlansList(extractedData);
    } else if (lastExtractionType === 'saveNumber') {
      text = formatSaveNumber(extractedData);
    } else if (lastExtractionType === 'motor') {
      text = formatMotorAsBulletList(extractedData);
    } else if (lastExtractionType === 'entryPlans') {
      text = formatEntryPlansMarkdown(extractedData);
    } else {
      text = formatAsBulletList(extractedData);
    }
```

---

## Verification

- [ ] **Step 1: Reload the extension**

  Go to `chrome://extensions` → find IMCRM Data Extractor → click the circular reload button.

- [ ] **Step 2: Navigate to a health lead page**

  Open `https://imcrm.alfred.ae/quotes/health/[any REF_ID]` — use a lead you know has at least some Takaful or Dubai Insurance plans.

- [ ] **Step 3: Click "Extract Entry Level Plans"**

  Open the popup → click the dark green button. Within 2–3 seconds the output area should show a markdown block with:
  - A lead header with Ref-ID and name
  - A profile table (email, mobile, emirate, category)
  - A Members table (if family lead) OR single member row
  - A 4-row plans table — plans that exist show real data; plans not available show `*(not found)*`

- [ ] **Step 4: Click "Copy to Clipboard" and paste**

  Paste into Obsidian or any markdown editor. The table should render correctly with proper column alignment.

- [ ] **Step 5: Test edge case — lead with no Takaful plans**

  Navigate to a lead that has no Takaful Emarat or Dubai Insurance quotes. Run extraction. All 4 plan rows should appear with `*(not found)*` in the price columns — no JavaScript errors in the popup console.

- [ ] **Step 6: Open popup DevTools to check for errors**

  Right-click the popup → Inspect → Console. Run the extraction again. No red errors should appear. The `console.log` from `extractBasicPlans` is still there for the old button — the new button has no extra logging but also no errors.
