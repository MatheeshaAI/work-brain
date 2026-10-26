---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_Filter_Plans_By_Price.md"]
updated: 2026-10-22
tags: [imcrm, workflow, plans, price-filter]
summary: "Four-phase workflow for finding plans inside a price band on an IMCRM lead page."
---
# Workflow Filter Plans By Price

A short procedure for turning the CRM's available-plans list into a budget shortlist. Worked example: [[Filtered Plans 4000-6000 AED]]. Concept page: [[Price range plan filtering]].

## Phases
1. **Navigation:** open the lead page on the CRM (`/quotes/health/<ref>`) and scroll to "Available Plans".
2. **Filtering:** either the built-in Filters button (insurer, network, plan type Entry Level / Good / Best, then Apply), or a manual price search. Plans are usually sorted ascending by price, so page with Next until the minimum is reached and read on to the maximum.
3. **Extraction:** record provider, plan name, plan type, network, co-pay, base price, total price including VAT.
4. **Consolidation:** merge matches into one Markdown table.

A scripted version exists as `price_range_plan_scraper.js` ([[Health Insurance CRM system overview]]).

Related: [[IMCRM]], [[Plan library]], [[CRM plan type labels]].
