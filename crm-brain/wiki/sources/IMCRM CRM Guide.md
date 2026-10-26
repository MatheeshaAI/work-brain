---
type: source
sources: ["raw/work_os system designing documents/01_DAILY_COMMANDS/CRM_Guide.md"]
updated: 2026-10-22
tags: [imcrm, crm, extraction, health-lead, daily-commands]
privacy: contains two worked client examples with identifiers; only structure and aggregates recorded here
summary: "The daily-use guide to an IMCRM health lead page: URL pattern, the twelve sections, how to extract everything with Claude and quick tips for stages, documents, payments and commission."
---
# Source: IMCRM CRM Guide

Short daily-commands note (the "start here" file for CRM work in the [[Work OS Master Index]]). It is the guide to the CRM ([[IMCRM]]) behind the extraction work in [[IMCRM health detail page extraction]] and [[Steps to get client data from IMCRM]]. **The file contains two real client examples** (names, mobile numbers, emails, dates of birth, Emirates ID, policy and invoice details) so it must not be quoted; only structure and aggregates are kept here.

## Access
- Base: the broker's IMCRM site; a health lead page follows `/quotes/health/{REF-ID}`; the lead list is at `/quotes/health`, filterable by advisor and status.
- Reference ids use the `HEA-` prefix with eight characters ([[Lead reference IDs]]).

## Sections on a health lead page (all expandable)
| Section | Content |
|---|---|
| Customer Profile | name, contact, nationality, DOB, ID, visa emirate, salary band, risk category, KYC status |
| Member Details | all insured members, relation, nationality |
| Lead Status | pipeline stage and transaction type |
| E-COM Details | selected plan, provider, payment status, network, co-pay, total price |
| Available Plans | the full quote catalogue sorted by price (example: 376 plans), filter by Entry / Good / Best |
| Manage Payments | payment ref, collection date, method, VAT, total, allocation |
| Policy Details | policy number, issuance, start and expiry, insurer quote number |
| Documents | passport, ID, visa, MAF, policy schedule, e-card, invoices |
| Booking Details | invoice description, commission %, VAT on commission |
| Lead Activities | follow-up tasks |
| Lead History | each status change with timestamp and who changed it |
| KYC Audit Logs | verification trail |

## How to extract everything (with Claude)
1. Open the lead. 2. Expand every accordion. 3. Use Claude Code with the browser extension so it reads the fully expanded page. 4. Ask "Extract all data from this IMCRM health lead page and organize it by section." See [[Getting client data from the CRM]].

## What the two examples show (aggregates)
- Example 1 is an issued individual policy on a mid-tier Dubai-Care entry plan: 15 documents, a commission of roughly 14% of premium, premium in the low thousands of AED.
- Example 2 is a dependent child booked on the same plan family, paid, with 376 available plans where the cheapest started at about AED 930.
- This corroborates the commission-rate range in [[Commission structure]] only loosely: one data point, not a schedule.

## Quick tips in the guide
Stage 5 (In Negotiation) leads need a next follow-up date in Lead Activities; check Documents for items missing from the required list ([[Policy submission documents]]); in Manage Payments check the payment is fully allocated; read commission (VAT applicable) in Booking Details; Lead History explains the whole journey.

## Flags
- Counts differ from other notes (document count 15 versus 16 in the original extraction; plan count 376 here and in the steps note, 419 and 443 elsewhere): the lists are per-lead catalogues.
- Contradiction with privacy rules: the guide is stored unredacted in the vault (and the work_os folder is flagged as in-place, read-only). Do not copy from it.

Related: [[Extracting leads from the CRM]], [[Insurance CRM pipeline]].
