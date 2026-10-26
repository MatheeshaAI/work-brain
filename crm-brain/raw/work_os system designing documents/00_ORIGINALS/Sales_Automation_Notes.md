# Sales Automation Notes

This note contains two sections:
1. Original generic instructions (for FTC email template use)
2. A tailored version focused on your role as a UAE health insurance sales advisor automating work via WhatsApp, email, and CRM/browser tools.

---

## 1. Original Instructions (Generic FTC Email Process)

### Initiate the Email Process

Begin by indicating you want to generate an FTC email (for example by using an internal command or template header such as `/ftc`).

If the email should be associated with a particular lead or client, make a note of that at the start so the greeting and context can be personalised (e.g. include the client name or reference).

### Paste the Key Policy Details (Minimum Required)

Copy and fill in the following fields before running the template:

- **Insurance Company:** [...]
- **Chosen Plan:** [...]
- **Network Provider / Tier:** [...]
- **Co-Insurance / Deductibles:** [...]
- **Preferred Facility:** [No preference / ...]
- **Invoice To Be Raised To:** [Individual / Company – Billing Name]
- **Plan type:** [Basic / Basic Enhanced / Enhanced]
- **Policy issuance turnaround time:** [...] working days
- **“Click here” link:** [paste the URL]

If a detail is unknown (e.g. preferred facility), enter `No preference`.

### Confirm the Recipient Details

Include these to ensure the greeting is correct. If omitted, the bot will prompt you later.

- **Sponsor / contact person name:** [...]
- **Client email:** [...]

### Choose the Correct Outpatient Access Wording

Specify the plan type and the system will insert the appropriate clause automatically:

- **Basic plan** – clinic-only access; specialists via GP referral; hospital limited to emergencies and approved inpatient.
- **Basic Enhanced plan** – designated clinics with direct specialist access; hospitals for emergencies and approved inpatient only.
- **Enhanced plan** – direct access to hospitals and clinics within the network, subject to approvals and policy terms.

In your prompt include a line such as:
```
Plan type: Basic Enhanced
```

### Review and Send

After the email is generated:

- Replace **PASTE_LINK_HERE** with the actual URL if not already provided.
- Verify the Policy Summary matches the quotation.
- Send the email to the sponsor/contact email.
- Await confirmation reply with wording like “Confirmed”, “Proceed”, or “Go Ahead”.

### After Confirmation, Move to Payment Link

Only when the client confirms:

- Send the payment link.
- Update the lead stage (usually **Payment Link Sent To Customer**).
- Set the next follow-up date if payment isn’t immediate.

---

## 2. Tailored Version for UAE Health Insurance Sales Advisor

You are a UAE-based health insurance sales advisor looking to automate your workflow. Your main communication channels include WhatsApp (without the official API), email, phone calls, and a CRM/browser interface. The goal is to reduce manual entry and speed up response times.

### Automation Concepts

- **WhatsApp messaging & analysis**: use browser automation (e.g. Selenium/Playwright) or third-party tools to send templated messages, scrape conversation content, and extract client details. For non-API use, a headless browser script or Zapier-like service can emulate clicks.

- **Email automation**: build on the FTC email template by storing policy fields in a form or spreadsheet; generate draft emails automatically and push them into your mail client.

- **CRM/browser automation**: automate data entry (leads, follow-ups, policy details) by scripting interactions with the CRM site. Use browser macros or RPA tools to attach documents, update stages, and set reminders.

### Adapted Prompt Template

Whenever you need to generate communication or perform a task, start with a prompt containing both the policy information and context about the channel. For example:

```
Generate FTC email and WhatsApp message for lead "ABC Ltd".

- Sponsor/contact: John Doe
- Client email: john@example.ae
- WhatsApp: +971501234567

Policy details:
- Insurance Company: ADNIC
- Chosen Plan: Platinum Network
- Network Provider: ADNIC Platinum Network
- Co-Insurance / Deductibles: 20% / AED 5,000
- Preferred Facility: No preference
- Invoice to be raised to: Company – ABC Ltd
- Plan type: Enhanced
- Turnaround: 7 working days
- Docs link: https://example.com/docs/quote123

Outputs:
1. FTC email draft.
2. WhatsApp message template.
3. CRM entry summary.
```

The automation script would parse this prompt and:

1. Fill an email template and save a draft.
2. Format a WhatsApp text and send (or queue) using browser automation.
3. Create/update the CRM record with all fields and set the pipeline stage.

### Questions to Refine the Prompt

- Do you have a preferred method or tool for automating WhatsApp when the official API isn’t available? (e.g., use WhatsApp Web with a script?)
- Which CRM are you using, and does it support keyboard shortcuts or a REST API?
- Are there any additional custom fields you always need for your leads (e.g., referral source, employer)?

Answering these will let me refine the template further and suggest more specific automation steps.

---

## 3. CRM Quote Extraction Automation (IMCRM — Alfred.ae)

### What we built / what already works

Using Claude + the **Claude-in-Chrome browser extension**, you can ask:

> *"Go to https://imcrm.alfred.ae/quotes/health/7PNG7ZCH and get the lowest prices for the member"*

Claude will navigate to the page (using your existing logged-in Chrome session), extract all available plans, sort them by price, and return a formatted table — no copy-pasting, no manual scrolling through 400+ plans.

This already works today. No extra setup needed beyond having the Chrome extension connected.

---

### How it works technically

1. **Authentication**: The Chrome extension shares your real Chrome browser session (Profile 4), so IMCRM recognises you as already logged in. Playwright-based scripts (like Selenium) can't do this — they start a fresh browser with no session.

2. **Data extraction**: Claude runs JavaScript directly inside the IMCRM page to:
   - Find the "Available Plans" table
   - Extract all 15 visible rows (the table is paginated, 15/page)
   - Sort by price ascending
   - Return structured data

3. **The key JavaScript snippet** (works on any IMCRM health quote page):
```javascript
const table = document.querySelectorAll('table')[2];
const rows = table.querySelectorAll('tbody tr');
const plans = [];
rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length >= 8) {
    plans.push({
      provider: cells[1]?.innerText?.trim().split('\n')[0],
      plan:     cells[2]?.innerText?.trim(),
      network:  cells[4]?.innerText?.trim(),
      price:    cells[6]?.innerText?.trim(),
      withVAT:  cells[7]?.innerText?.trim()
    });
  }
});
// Sort cheapest first
plans.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
console.table(plans);
```
You can paste this in Chrome DevTools (F12 → Console) on any IMCRM health quote page and it prints the sorted plan table instantly.

---

### Bookmarklet (one-click version)

Save this as a browser bookmark. When you're on any IMCRM health quote page, click it and a popup shows the cheapest plans sorted by price:

```
javascript:(function(){const t=document.querySelectorAll('table')[2];const rows=t?t.querySelectorAll('tbody tr'):[];const p=[];rows.forEach(r=>{const c=r.querySelectorAll('td');if(c.length>=8)p.push({Provider:c[1].innerText.split('\n')[0].trim(),Plan:c[2].innerText.trim(),Network:c[4].innerText.trim(),Price:'AED '+c[6].innerText.trim(),WithVAT:'AED '+c[7].innerText.trim()})});p.sort((a,b)=>parseFloat(a.Price.replace('AED ',''))-parseFloat(b.Price.replace('AED ','')));alert('CHEAPEST PLANS:\n\n'+p.slice(0,10).map((x,i)=>`${i+1}. ${x.Provider} - ${x.Plan}\n   ${x.Network} | ${x.Price} (${x.WithVAT} w/VAT)`).join('\n\n'));})();
```

**How to save it**: Bookmark any page → edit the bookmark → replace the URL with the code above.

---

### Is it practical when the full system is connected?

**Yes — and it gets more powerful.** Here's the progression:

| Stage | What's possible |
|-------|----------------|
| **Now** (Chrome extension only) | Ask Claude any CRM question in plain English. It reads/clicks the page for you. |
| **With a Claude Skill** | Type `/crm-quotes 7PNG7ZCH` and it auto-navigates, extracts, and formats — one command instead of a full sentence. |
| **With full PKM system** | Trigger automatically: e.g. when a new lead is created, Claude fetches the cheapest 5 plans and attaches them to the lead note. |
| **With IMCRM API** (if it has one) | Skip the browser entirely — pull plan data directly into any tool or dashboard. |

### Limitations to know

- The browser must be open and the Chrome extension must be connected for any of this to work.
- The table is paginated (15 plans per page) — to see all 419 you'd need to either sort by price first (which we do) or loop through all pages.
- IMCRM may update its HTML structure, which could break the table selectors — fixable but needs maintenance.

---

Feel free to edit this note or request adjustments—happy to help tailor it more closely to your workflow!