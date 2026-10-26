---
type: source
sources: ["raw/Health-Insurance/Workflows/Filtered_Plans_4000_6000.md"]
updated: 2026-10-22
tags: [insurance, plans, price-filter, quote]
summary: "A 12-row shortlist of entry-level and good plans priced AED 4,000-6,000 for one lead's quote, as produced by the price-range workflow."
---
# Filtered Plans 4000-6000 AED

The output of [[Workflow Filter Plans By Price]]: one lead's available-plans table cut to a price band of AED 4,000 to 6,000. The file names the lead (not repeated here; see the source).

## Shape of the result
- 12 plans from 7 insurers: [[QIC|Qatar Insurance Company]] (3: BLUE01-03), [[Takaful Emarat]] (4: E Care Blue 1-3 and Silver), [[Fidelity United]] (2: Plan E, Plan F), [[Dubai Insurance]] (Dubai Care Next N5B), [[HAYAH Insurance]] (Care Protect RN3 B), [[Orient Takaful]] (Plan 5).
- Plan type: 11 Entry Level, 1 Good (Orient Takaful Plan 5). See [[CRM plan type labels]].
- Networks: QIC's own network (3), E Care Blue (3), Nextcare (4: Fidelity x2, Takaful Emarat Silver, HAYAH), Dubai Care (1), Orient Takaful (1).
- Price range AED 4,204 to 5,223.45 before VAT; 4,491.90 to 5,562.32 with VAT (VAT is 5 percent).
- Co-pay is the standard line, 20 percent up to AED 25 or 50 on consultation and 10-20 percent on diagnostics and medicines; Fidelity United is 30 percent on medicines. See [[Co-pay and co-insurance]].

## Flag: price is quote-specific
The same plans carry very different prices in other files. QIC BLUE01 is AED 4,204 here but AED 1,186 in [[Plans - Qatar Insurance Company]]; E Care Blue 1 is 4,284 here and 1,209 in [[Plans - Takaful Emarat Insurance]]. The price depends on the members in the quote (family size, ages), so one plan name gives a different premium per lead. A plan library price is not a rate card. See [[Plan library]].

Related: [[Network tiers]], [[Plan price tiers]], [[Entry level plans]].
