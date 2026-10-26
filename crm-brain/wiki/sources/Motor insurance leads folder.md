---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Motor Insurance"]
updated: 2026-10-22
tags: [insurance, motor, leads, aggregate, client-data]
summary: "Aggregate profile of the motor insurance lead folder: 6 files (5 leads plus an index), template fields, status mix and data gaps. Counts only."
---
# Motor insurance leads folder

Aggregate of `"raw/Health-Insurance/Workspace/Leads/Motor Insurance"`. Six markdown files: one index (`Motor-Insurance.md`, format in [[Lead folder index files]], earlier summarised in [[Motor Insurance leads index]]) and five lead files named `CAR-<8 chars>-First-Last.md`. Two of the five are for the same person under different ref IDs (duplicate lead). Personal detail is not reproduced.

## Template
Seven fixed sections in all five files: General Information (ref, insurance type, registration type, created date, advisor, status, KYC and AML status), Customer Profile, Vehicle Details (make, model, year, trim, vehicle type, value, chassis, registration emirate, type of insurance), Insurance & Claims History, Quote & Payment, Documents, Notes / Status Updates.

## Distributions (n = 5)
| Measure | Mix |
|---|---|
| Status | New Lead 5 |
| Registration type | Personal 4, Company 1 |
| Cover type | Comprehensive 5 |
| Vehicle type | SUV 4, Saloon 1 |
| Registration emirate | Dubai 3, Abu Dhabi 2 |
| Claim history | No claims in past year 5; no-claims letter mostly unavailable |
| Current insurer | RSA brand 2, Oman Insurance (Sukoon) 1, "Other" 2 |
| KYC | Complete 2, Pending 3 |
| Payment status | New 3, Pending 1, Paid 1 |
| Created | 2025: 2, May 2026: 3 |

## Follow-up pattern
The notes section of every file holds the single line that the record was created by the IMCRM Data Extractor extension ([[IMCRM Data Extractor handoff]]). There is no dated follow-up, quote, or objection in any motor file; motor is a stub pipeline compared to health.

## Insurer and price mix
Quote link is blank in all five. Car value and premiums are per-person and not summarised. No insurer quotes recorded.

## Data quality
- Status "New Lead" everywhere, even where payment is marked Paid and KYC complete: status and payment fields disagree.
- Car make and model fields blank in at least one file while trim is filled.
- Duplicate lead for one person; the phone/email on at least one record look like a company account rather than the person.
- Vehicle chassis and ID details sit in the folder and must stay out of the wiki.

Compare with the health workflow in [[Individual health insurance leads folder]] and the product overview in [[Insurance product lines]]. See also [[Workspace Leads folder overview]].
