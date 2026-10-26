---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance"]
updated: 2026-10-22
tags: [insurance, renewals, leads, aggregate, client-data]
summary: "Aggregate profile of the 44-file health renewals folder (one subfolder per month): per-month counts, status flow, insurer mix, premium bands and gaps. Counts only."
---
# Health renewals leads folder

Aggregate summary of `"raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance"`: twelve month subfolders, January to December. Client names, policy numbers and individual premiums stay in the folder and are not reproduced here.

## Layout
Each month folder holds two files with fixed names: `<Month>-Health-Insurance.md` (an index in the `## Leads (n)` wikilink format, see [[Lead folder index files]]) and `<Month>-Renewal.md` (a one-table overview of renewals due that month). Months with live renewals also hold one file per renewal, named `<insurer code>-<policy number>-First-Last.md`.

| Month | Files | Renewal rows in the table | Per-renewal files |
|---|---|---|---|
| January | 2 | 0 | 0 |
| February | 2 | 0 | 0 |
| March | 2 | 0 | 0 |
| April | 10 | 8 | 8 |
| May | 12 | 10 | 10 |
| June | 4 | 2 | 2 |
| July to December | 2 each (12) | 0 | 0 |
| Total | 44 | 20 | 20 |

So only April, May and June are populated (20 renewals); the other nine months are empty scaffolding created ahead of time. The scaffold is built for the whole year, but the data starts with policies expiring in late April 2026.

## Overview table fields
Client Name, Policy Number, Provider (a short code), Expiry Date, Status (emoji plus word), Gross Premium, Notes. Each monthly note defines the status flow: Due, Contacted, Quote Sent, Payment Pending, Renewed, Lapsed (six steps, colour-coded). See [[Renewal tracking status flow]].

## Status distribution (20 renewals)
| Status in the table | Count |
|---|---|
| Due | 15 (April 4, May 9, June 2) |
| Quote Sent | 4 (April 3, May 1) |
| Renewed | 1 (April) |
| Contacted, Payment Pending, Lapsed | 0 |

Some April "Due" rows carry notes marking them expired or high priority (including the single largest renewal). The per-renewal files carry the same status in a `Renewal Status` field: Due 13, Quote Sent 4, Renewed 1, blank 2.

## Insurer mix
By the provider code on the incumbent policy: TE 11 (read as [[Takaful Emarat]], the per-renewal files say "Takaful Emarat (TE)"), DIC 7 ([[Dubai Insurance]] Company), one Oman Insurance policy, one HAYAH Insurance policy. Replacement providers named so far: Policy Bazaar 3 (one family group quote), Live Insurance 1, Dubai Insurance 1; 13 renewals still say "TBD". See [[Policy Bazaar]] and [[Health Insurance Companies]].

## Premium bands (last year's gross premium, AED)
Under 2,000: 8. 2,000 to 4,000: 4. 4,000 to 8,000: 5. Above 15,000: 2 (one far larger than the rest, flagged "highest value renewal"). One row has no figure. Compare the new-business bands in [[Plan price tiers]]: renewals skew cheaper than the international-plan quotes seen in new leads.

## Per-renewal file template
Sections in every file: Policy Details (lead type, policy number, provider, start, expiry, last-year gross premium, renewal status), Customer Profile, Status Updates (19 of 20), Renewal Quote (19), Documents checklist (18), Payment (18). Three files link to each other as one family or company group of three policies. Document checklists are unticked in practice: 51 unchecked boxes counted, and a quote was ticked in only a few. Payment is "Pending" with no method in all 18 files that have the section; only one shows an amount.

## Follow-up patterns
- Alerts are date-driven: lines such as "expires <date>, <name> contacted" appear in 8 files, and comparison links from [[Insurancemarket.ae]] were shared in 3 family-group files.
- Customers are first matched against InsuranceMarket.ae comparison, then a Policy Bazaar or incumbent quote is requested.
- Expired or high-value policies are flagged in the notes column as priority; see [[Lead prioritization]].

## Common objections
One file records an incumbent's renewal discount being declined and a wait for a revised offer; price comparison with a cheaper outside quote is the only recorded objection pattern. See [[Customer objections]].

## Data quality
- The monthly index counts differ from the file counts in April (index lists 8 leads, folder holds 10 files) because index and overview files are included in the folder total.
- Provider uses short codes (TE, DIC, OI2). **Updated 2026-10-22:** `OI2` is now resolved - it is [[Oman Insurance]], read from the May renewal file's own "Provider: Oman Insurance (OI2)" line, not [[Orient Insurance]]. The other two remain inferred from the per-renewal files.
- Policy numbers have two formats (long for TE, short for DIC), which breaks naive matching.
- Nine individual-lead files in [[Individual health insurance leads folder]] carry `Renewal_upload` and a renewal batch field, so the same customer can appear both as a lead file and as a renewal file. Cross-folder duplication is not reconciled.
- Only 20 renewals appear for a book where the lead files imply many more renewals due in March and May; the earlier renewal months are not backfilled.

Related: [[Workspace Leads folder overview]], [[Insurance CRM pipeline]].
