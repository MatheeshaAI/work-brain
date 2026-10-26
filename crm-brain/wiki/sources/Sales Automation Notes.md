---
type: source
sources: ["raw/work_os system designing documents/04_AUTOMATION/Sales_Automation_Notes.md", "raw/work_os system designing documents/00_ORIGINALS/Sales_Automation_Notes.md", "raw/work_os system designing documents/00_ORIGINALS/Request_Details.md"]
updated: 2026-10-22
tags: [ftc-email, sales-automation, imcrm, bookmarklet, claude-in-chrome]
summary: "Three parts: the generic FTC email confirmation process, its adaptation to a UAE health-insurance advisor, and a working method to pull the cheapest plans from an IMCRM quote page with Claude in Chrome, a console snippet or a bookmarklet."
---
# Source: Sales Automation Notes

Two copies of one note, plus `Request_Details.md`, the short origin note. The note has three sections; section 3 records something that **already worked**, sections 1 and 2 are templates and design.

## Request_Details (origin)
The owner asked to tailor a prompt and a new documentation file. Context: they are a non-technical builder working on GTM-engineering topics who wants Claude to explain everything simply and give shortcuts; in sales they use **WhatsApp, calls and email**, and want help automating WhatsApp messaging and analysis, email automation, CRM and browser automation, and sales knowledge work, connecting WhatsApp **without the official API**. The file just preserves that request and the original `claude.md` setup prompt.

## 1. The FTC email process (generic)
"FTC" is the Financial Terms and Conditions confirmation email (see [[SOP FTC Email Template]]; IMCRM also has an FTC tracking section, see [[IMCRM]]). Steps:
1. Trigger it (a `/ftc`-style command) and note the lead.
2. Paste minimum policy fields: insurer, plan, network provider or tier, co-insurance or deductible, preferred facility ("No preference" if unknown), who the invoice goes to (individual or company), plan type (Basic / Basic Enhanced / Enhanced), issuance turnaround in working days, and the "click here" link.
3. Confirm sponsor or contact name and email.
4. The plan type chooses the outpatient-access wording: **Basic** = clinic-only access, specialists via GP referral, hospital for emergencies and approved inpatient only; **Basic Enhanced** = designated clinics with direct specialist access, hospitals only for emergencies and approved inpatient; **Enhanced** = direct access to hospitals and clinics in the network subject to approvals.
5. Review: replace `PASTE_LINK_HERE`, check the summary against the quotation, send, wait for "Confirmed", "Proceed" or "Go Ahead".
6. **Only after confirmation** send the payment link, set the stage to Payment Link Sent To Customer and set a next follow-up date if payment is not immediate.

See [[FTC email confirmation flow]].

## 2. Tailored version
The advisor automates through WhatsApp (no official API), email, calls and a CRM web interface. A single structured prompt (lead, contact, email, WhatsApp, policy details) should produce three outputs: an FTC email draft, a WhatsApp template and a CRM entry summary. A script would fill the email template, format and queue the WhatsApp message by browser automation, and update the CRM stage. Open questions raised: preferred WhatsApp method without an API, which CRM and whether it has shortcuts or a REST API, extra custom lead fields (referral source, employer). The example uses placeholder client data.

## 3. CRM quote extraction (IMCRM), what already works
- With Claude and the **Claude-in-Chrome extension**, ask in English: "go to the health quote page for lead X and get the lowest prices for the member". It uses the owner's real logged-in Chrome profile, so no login, and returns a price-sorted table. The note says a Playwright script cannot do this because it starts a fresh browser without the session.
- **How:** JavaScript run in the page finds the "Available Plans" table (the third table), reads 15 visible rows (the table is paginated at 15), takes provider, plan, network, price and price with VAT, sorts ascending and prints a table.
- **Bookmarklet:** the same code as a one-click bookmark that pops up the cheapest 10 with network and price (with and without VAT).
- **Progression:** now: ask in plain English; with a Claude skill: one command per lead; with the full system: auto-fetch the cheapest five plans when a lead is created; with an IMCRM API (if any): no browser.
- **Limits:** needs the browser open and the extension connected; the table is paginated (the note quotes 419 plans for one lead, versus the 376 and 443 counts elsewhere, which vary per lead and date); HTML changes can break selectors.

A later, productised version of this is the [[IMCRM Data Extractor]]; field and plan-catalogue details are in [[IMCRM health detail plan price dump]] and [[Steps to get client data from IMCRM]].

## Flags
- Plan counts differ by lead (211, 376, 419, 443 across notes); they are per-lead catalogues, not a global total.
- The note names a profile ("Profile 4") of the owner's Chrome; not reproduced further.
- No credentials in the file.

Related: [[Browser Automation for CRM and Gmail]], [[Getting client data from the CRM]], [[Standard intro message]].
