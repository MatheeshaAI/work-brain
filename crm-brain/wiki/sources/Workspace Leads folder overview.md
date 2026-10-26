---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads"]
updated: 2026-10-22
tags: [insurance, leads, aggregate, client-data]
summary: "Map of the Workspace/Leads tree: 227 client markdown files in six families, with counts, and pointers to the aggregate source pages for each family."
---
# Workspace Leads folder overview

`"raw/Health-Insurance/Workspace/Leads"` holds the advisor's per-client markdown records. These are client data, so the wiki holds only aggregates. Counts below come from a file listing and field scans.

| Family | Folder | Markdown files | Page |
|---|---|---|---|
| Individual health leads | Health Insurance/Individual-Health-Insurance | 169 | [[Individual health insurance leads folder]] |
| Group health | Health Insurance/Group-Health-Insurance | 2 | [[Group health insurance leads folder]] |
| Health renewals (12 month folders) | Renewals/Health Insurance | 44 | [[Health renewals leads folder]] |
| Motor | Motor Insurance | 6 | [[Motor insurance leads folder]] |
| Referral | Referral Leads | 2 | [[Referral leads folder]] |
| Lead-Context | Lead-Context | 2 | [[Lead-Context files]] |
| Root | Leads root | 2 (one index, one stray lead file) | [[Lead-Context files]] |
| Total | | 227 | |

A further `recovered files` folder holds code and scripts (about 16 non-markdown files); it is out of scope here.

## Cross-family findings
- **Same template, three eras.** Individual and motor files come from the IMCRM extractor with the same General Information / Customer Profile layout; renewals use a policy-centred layout; group uses a ledger. See [[Lead folder note template]].
- **Status is not one vocabulary.** Index tables, lead files, renewals and the Lead-Context legend use four different status sets ([[Lead pipeline stages]], [[WhatsApp lead follow-up statuses]]).
- **Volume is almost entirely April-May 2026.** 144 of the 169 individual files are dated April or May 2026, and renewals only exist for April to June.
- **Indexes drift.** The individual index counted 166 against 169 files ([[Lead folder index files]]).
- **Privacy.** Every family contains phone numbers, emails, ID document lists, and in some health declarations. Do not copy.

See [[Insurance CRM pipeline]], [[IMCRM]] and [[Lead data quality issues]].
