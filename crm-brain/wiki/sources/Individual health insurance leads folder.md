---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Health Insurance/Individual-Health-Insurance"]
updated: 2026-10-22
tags: [insurance, leads, crm, aggregate, client-data]
summary: "Aggregate profile of the 169-file individual health lead folder: note template, status mix, insurer mix, follow-up patterns and data quality. Counts only, no client detail."
---
# Individual health insurance leads folder

Aggregate summary of the folder `"raw/Health-Insurance/Workspace/Leads/Health Insurance/Individual-Health-Insurance"`. It holds client records, so this page gives **counts and patterns only**. Per-lead detail (names, phones, emails, ref IDs, premiums, medical declarations) stays in the folder. The folder's own index is described in [[Individual Health Insurance leads index]] and [[Lead folder index files]].

## Shape of the folder
- 169 markdown files: 1 index file, 168 lead files. 166 lead files follow the `HEA-<8 chars>-First-Last.md` name ([[Lead file naming]], [[Lead reference IDs]]); 2 are named by person only; 3 files in all lack the HEA prefix.
- Two reference IDs appear in more than one filename (duplicate lead files).
- Average file is small (about 1.2 thousand characters); most are a bare CRM extract plus a few dated lines.
- Created-date spread (from the `Created Date` field, where present): Mar 2026 = 10, Apr 2026 = 92, May 2026 = 52, older (2025 or Jan/Feb 2026) = 4, no date = 11. So the folder is mostly the April-May 2026 intake.

## Note template (fields)
The files were produced by the IMCRM extractor ([[IMCRM health detail page extraction]], [[Extract IMCRM Health Leads Workflow]]) and then hand-annotated. Section headings and how many files carry them:

| Section | Files |
|---|---|
| Customer Profile | 163 |
| General Information (Ref-ID, Customer Type, Created Date, Advisor, Status) | 161 |
| Payment Details (Total Amount, Status, Method) | 138 |
| Member Details / Member Information / Members | about 138 combined |
| Documents (list or checklist) | 109 (+16 "Documents Received", 10 "Documents Location") |
| Status Updates (dated lines) | 82 (+13 "Notes / Status Updates", 22 "Status History") |
| Lead Status | 27 |
| Quote Details | 26 |
| Available Plans Extracted (comparison table) | 13 |
| Last Year's Policy Details (renewal imports) | 9 |

Most frequent fields: Status (308 occurrences), Member Category (270), Nationality (250), Gender (248), Date of Birth (207), Email (164), Customer Type (162), Emirate of Visa (162, plus 106 spelled "Emirates of Visa"), Advisor (161), Created Date (159), Total Amount (133), Mobile (130). Rarely present: Source (20), Enquiry Count (19), IM AML Status (13), Salary Band (11), Renewal Batch (9).

## Status distribution (the `Status` field in General Information)
| Status | Files |
|---|---|
| New Lead | 81 |
| New | 27 |
| Quoted | 18 |
| Followed Up | 13 |
| Allocated | 8 |
| Policy Booked | 4 |
| No status value (incl. the index) | 5 |
| Application Submitted / Pending (3 spellings) | 3 |
| Payment Pending | 1 |
| Enrolled | 1 |
| Policy Cancelled | 1 |
| Quote Sent / Quote Shared / Quote Requested / Inquiry / Await WhatsApp Response (free text) | 6 |

About 64 percent of files still say New or New Lead, even though 134 files hold dated progress lines, so the status field lags the note text (see data quality). Compare the stage vocabularies in [[Lead pipeline stages]] and [[WhatsApp lead follow-up statuses]].

## Customer type and member mix
- Customer Type: Individual 113 plus 24 variants such as "Individual (1 member)"; Family (2 to 5 members) about 24; blank 7. The member count is encoded in the free-text label, not a separate field.
- Member blocks: 81 files have one member block, 68 none, 12 two, 6 three, 2 four.
- Member Category (all member rows): dependent child 64, employee above AED 4,000 salary 60, dependent spouse 53, investor or partner 25, golden visa 24, employee at or below AED 4,000 15, domestic worker 9, self-employed or freelancer 8, dependent parent 7, other relatives 2. Salary text appears in 58 files; where a band is stated 81 mentions are above and 19 at or below the AED 4,000 line. See [[Customer categories]].
- Emirate of visa: Dubai 107, Sharjah 17, Ajman 9, Ras Al Khaimah 7, Abu Dhabi 2, Umm Al Quwain 1, Fujairah 1, missing about 25.
- Nationality (top, rows): Indian 59, Pakistani 11, Filipino 11, UK 7, Sri Lankan 6, Egyptian 5, Afghan 4.
- Source field present in 20 files: 9 `Renewal_upload`, 4 `IMCRM`, 6 insurancemarket.ae landing pages, 1 referral. Everything else has no recorded source, which hurts [[Referral sources]] analysis ([[Lead capture gaps]]).

## Insurer mix (files that mention the insurer)
Mentions come from "Currently insured with", quote tables and status lines, so they are mixed incumbent and quoted insurers: Dubai Insurance 15, [[Takaful Emarat]] 14, Orient/Allianz 3, [[Mednet]] 2, and one-off mentions of Live Insurance, Oman Insurance, RSA, Cigna and Sukoon. InsuranceMarket.ae comparison documents or quote links appear in 24 files ([[Insurancemarket.ae]]). Network names such as NAS appear in a handful of quote tables. Entities: [[Dubai Insurance]], [[Takaful Emarat]], [[Health Insurance Companies]].

## Plan price tier mix
Only 5 of 169 files carry a numeric Total Amount: 1 in the AED 1-3k band, 2 in 3-6k, 1 in 6-12k, 1 above 12k (164 show a dash or "awaiting quote"). Quote-comparison tables in 13 files list five-plan comparisons, mostly international or mid/upper plans. Basic or "entry level" plans are named in 4 files, and 4 more state that the client chose a basic plan and did not declare a condition. Too thin to confirm [[Plan price tiers]]; see the flag on that page.

## Follow-up patterns (files containing the pattern in their notes)
| Pattern | Files |
|---|---|
| WhatsApp welcome message sent | 63 |
| Welcome message pending or sent manually | 10 |
| Quotation or comparison sent | 17 |
| Follow-up mentioned | 17 |
| Awaiting documents or client | 11 |
| Medical underwriting, BMI loading or pre-existing declaration discussed | 11 |
| Payment link mentioned | 6 |
| Golden-visa mentioned | 15 |

The recurring flow is: lead created -> WhatsApp welcome ([[Standard intro message]]) -> requirements -> comparison from insurancemarket.ae -> quote sent -> wait for documents (Emirates ID, passport, visa). Document checklists exist in 78 files but only 6 have any item ticked, 72 are fully unchecked.

## Common objections and concerns
Price or budget wording appears in 12 files; pre-existing condition, BMI loading and non-declaration choices in 11. No file records an outright decline except one policy cancellation. No "no answer" or "not interested" wording is used at all, so lost leads are not recorded as such. See [[Customer objections]] and [[Handling the price objection]].

## Data quality issues
- Status lags the notes: many "New Lead" files already contain quotation or document lines.
- Status vocabulary is not controlled (about 20 distinct values, several free-text).
- Customer Type carries member count as text; the field label "Emirate of Visa" has two spellings; some blank values and member rows where gender or category do not match the person (not itemised here).
- Duplicate ref IDs across files; two files lack the HEA prefix; one index file counted among leads.
- Payment Method is a dash in most files, so payment tracking is not usable here.
- Contains client contact details, ID-document lists and health declarations. It must not be copied into the wiki or shared.

Related: [[Insurance CRM pipeline]], [[Lead tracking in the CRM]], [[Markdown-backed lead store]], [[Lead folder note template]], [[Health renewals leads folder]], [[Workspace Leads folder overview]].
