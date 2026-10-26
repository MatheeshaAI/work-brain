---
type: concept
sources: ["raw/Health-Insurance/Workspace/Leads"]
updated: 2026-10-22
tags: [insurance, data-quality, leads]
summary: "Recurring data quality problems across the lead, renewal, motor, group and referral files, with counts."
---
# Lead data quality issues

Measured across `"raw/Health-Insurance/Workspace/Leads"` ([[Workspace Leads folder overview]]):

1. **Stale status.** In the individual folder 108 of 169 files say New or New Lead, while 134 hold dated progress lines. Motor files say New Lead even where payment is marked paid.
2. **Uncontrolled status text.** About 20 distinct status strings, several free text; four vocabularies across folders ([[Lead pipeline stages]]).
3. **Missing source.** Only 20 individual files record a source; referral origin is nearly never captured ([[Lead capture gaps]], [[Referral sources]]).
4. **Missing money fields.** Total Amount is a dash in 164 of 169 files; payment method rarely set.
5. **Duplicates.** Two repeated ref IDs in the individual folder, one duplicate in motor; renewal customers appear both as renewal files and as renewal-import leads.
6. **Index drift.** Index counts differ from file counts ([[Lead folder index files]]).
7. **Unchecked checklists.** 72 of 78 individual document checklists and about 51 renewal items are unticked even where notes say documents arrived.
8. **Inconsistent labels.** "Emirate of Visa" vs "Emirates of Visa", customer-type text embedding member counts, insurer short codes used without a key (TE, DIC, OI2 - `OI2` was resolved in 2026-10 as [[Oman Insurance]]; the others are still inferred).
9. **Empty scaffolding.** Nine of twelve renewal months contain only index files.

Detail pages: [[Individual health insurance leads folder]], [[Health renewals leads folder]], [[Motor insurance leads folder]]. Related: [[CRM hygiene]], [[WhatsApp follow-up gaps]].
