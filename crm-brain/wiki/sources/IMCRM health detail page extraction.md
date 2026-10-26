---
type: source
sources: ["raw/10_Work-Insurance/Crm_data_extraction.md", "raw/work_os system designing documents/00_ORIGINALS/Crm_data_extraction.md"]
updated: 2026-10-22
tags: [imcrm, extraction, crm, privacy, health-insurance]
privacy: field structure and aggregates only - no names, mobiles, emails, dates of birth or Emirates IDs
summary: "One worked extraction of an IMCRM health-detail page: the ten sections, 16 documents, commission fields and lead history."
---
# Source: IMCRM health detail page extraction

A single worked example of pulling everything off one IMCRM health-lead detail page. **Structure, section names, counts and the commercial fields are recorded; all personal identifiers are omitted** - the raw file contains the client's name, mobile, email, date of birth, Emirates ID number and expiry, and a full document list with file names.

## What was extracted

The note opens with a claim that "all the data from the IMCRM Health Detail page" was collected, then organises it into **ten sections**:

| # | Section | Fields captured |
|---|---|---|
| 1 | **CUSTOMER PROFILE** | Name, Mobile, Email, Nationality, Date of Birth, Emirates ID, Emirates ID Expiry, Emirate of Visa, Gender, Marital Status, Salary Band, Member Category, Risk Category, KYC Status |
| 2 | **MEMBER DETAILS** | Member count, then a block per member |
| 3 | **LEAD STATUS** | Status, Transaction Type |
| 4 | **E-COM DETAILS** | Plan Name, Provider, Payment Status, Paid At, Total Price (with VAT), Co-pay/Co-insurance, Plan Type |
| 5 | **AVAILABLE PLANS** | Total plan count and the first page of plans |
| 6 | **MANAGE PAYMENTS** | Payment reference, collection date, payment rows |
| 7 | **POLICY DETAILS** | Policy period, sum insured, premium |
| 8 | **DOCUMENTS** | The uploaded document list |
| 9 | **BOOKING DETAILS** | Booking date, invoice description, line of business, transaction payment status, insurer invoice number, commission fields, branch |
| 10 | **LEAD HISTORY** | Timestamped status-change records with the acting user |

**Sections that were still collapsed or empty** are listed at the end: Embedded Products, Email Status, Digital Consent, Send Update, Lead Activities, FTC Tracking, Audit Logs, KYC Audit Logs.

## The commercial fields worth keeping
- **Co-pay line:** `20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines` - the identical string that appears in the WhatsApp intros, the chat quotes and the [[Standard intro message]]. It is a system default, not a negotiated term.
- **Plan type:** Entry level, with a plan of **Dubai Care N4** from Dubai Insurance, priced at **AED 4,036.52 with VAT** for a family-sized policy.
- **Catalogue size:** **376 plans available** (showing the first 15).
- **Commission:** **13.91%**, with VAT applied on commission (25.59 on that policy), commission 511.74 and **total commission 537.33**. Branch: Dubai & Northern Emirates.
- **Booking chain:** booking date, insurer invoice date, invoice description, line of business Health, transaction payment status Fully Paid.

## The document list
The section header says **16 documents uploaded** but only **15 are enumerated** - a one-item mismatch between the counter and the list, worth knowing before anyone relies on the count. The list covers five groups:

| Group | Items |
|---|---|
| Underwriting | Risk score document, signed medical application form, medical application form (unsigned) |
| Identity | KYC document, passport copy, Emirates ID (front & back), visa page |
| Payment | Receipt PDF, receipt screenshot, tax invoice raised by buyer, tax invoice (policy holder) |
| Policy | E-card (health), policy schedule, policy wordings / bond, policy certificate |

See [[Document request handling]] for the same five-group structure and the accounts pack.

## Lead history
**Six history records**, all within a single day of activity, in reverse chronological order:
1. Policy Booking Queued
2. Policy Issued
3. Transaction Approved
4. Payment Pending
5. one record with no detail
6. one record with no detail

Two of the records are attributed to one internal user and two to another, with the earliest records unattributed. The timestamps span roughly six hours, so **a single policy goes from pending payment to issued inside one working day** - which is the fast path the pipeline is designed around.

## What this example proves and does not
- **Proves:** the detail page is fully readable by an extractor, and every commercially meaningful field sits in one of the ten sections.
- **Does not prove:** that this is an automated route. The file is written as a hand-collected summary, and the [[IMCRM Data Extractor]] project is what turns the same page into a button.
- **The privacy cost is real.** Ten of the ten sections are PII or PII-adjacent. This is the concrete version of the risk flagged in [[Using ICM for a CRM-driven insurance sales agent]] and [[Getting client data from the CRM]].

Related: [[IMCRM]], [[IMCRM Data Extractor]], [[Steps to get client data from IMCRM]], [[Getting client data from the CRM]], [[Extracting leads from the CRM]], [[Document request handling]], [[Insurance plan catalogue]], [[Plan price tiers]], [[Network tiers]], [[Dubai Care]].

## Also stored in work_os
A copy is in `00_ORIGINALS/Crm_data_extraction.md` (the raw extraction contains personal identifiers; not reproduced). A related guide with two further worked examples is `01_DAILY_COMMANDS/CRM_Guide.md`, see [[IMCRM CRM Guide]].
