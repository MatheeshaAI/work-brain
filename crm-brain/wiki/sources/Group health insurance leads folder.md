---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Health Insurance/Group-Health-Insurance"]
updated: 2026-10-22
tags: [insurance, group, leads, aggregate, client-data]
summary: "Aggregate of the group health lead folder: one index and one company record with a premium-transaction ledger, so it is a different template from individual leads."
---
# Group health insurance leads folder

Aggregate of `"raw/Health-Insurance/Workspace/Leads/Health Insurance/Group-Health-Insurance"`. Two files: the index (`Group-Health-Insurance.md`, `## Leads (1)`, see [[Group Health Insurance leads index]] and [[Lead folder index files]]) and one company record. Company and member names and amounts stay in the folder.

## Template (differs from individual leads)
The file is headed "Company Record", not "Lead Detail". Sections: Company Details (company name, policy type, advisor), Group Policy Transactions (table: date, member, transaction type, amount, notes), Transaction Summary (table: period, additions, deletions, net premium), Notes.

## Contents in numbers
- 1 company, 1 transaction row (an addition for May 2026, pro-rated), 0 deletions.
- Status distribution: not applicable, the record has no lead status field; it behaves as a booked-policy ledger, not a pipeline lead.
- Insurer, plan tier, objections, follow-up: none recorded. The note states only that mid-term additions are charged pro-rata.

## Data quality and gaps
- No ref ID, no status, no contact, no insurer or policy number: cannot be linked to [[IMCRM]].
- Group accounts appear elsewhere as renewal families: in [[Health renewals leads folder]] a corporate group has three member policies handled as separate renewal files, so group business is modelled two different ways.
- The ledger style (additions and deletions with net premium) is the only commission-relevant structure in the leads tree; see [[Commission and premium reporting]].

Related: [[Individual health insurance leads folder]], [[Workspace Leads folder overview]].
