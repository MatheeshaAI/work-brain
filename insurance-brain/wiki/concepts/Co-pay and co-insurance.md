---
type: concept
sources: ["raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [insurance, extraction, data, imcrm]
summary: "Why the extractor must separate co-pay from co-insurance, and how the price column was mis-selected."
---
# Co-pay and co-insurance

Two different money lines on a UAE health plan sheet, and one technical detail that separates them on the page. The extraction plan of 2026-05-22 treats them as a single solved problem; the desk treats them as a conversation. Both views are worth keeping.

## The customer-facing meaning
- **Co-pay** is a fixed or capped amount the customer pays at the clinic. The standard line on quoted plans is **20% capped at AED 50 on consultation**, with 20% on diagnostics and medicines. See [[Explaining co-pay and plan terms]].
- **Co-insurance** is the customer's percentage share of a larger, usually inpatient, claim. The same desk language distinguishes the two: the customer pays the co-pay at the clinic, and a co-insurance share applies to the hospital bill.

## The technical distinction (why they get merged)
The plans table on an IMCRM quote page has one column whose header contains the word "co-pay". The original extraction code matched the **first header containing "co-pay"**, which also matches **"co-insurance"** - so the two landed in the same output column, or the wrong one was picked up.

The fix in the plan:
- the co-pay header must match "co-pay" **and exclude** "insurance";
- co-insurance is matched separately;
- the two land in **different output columns**.

## The price column, and the bug behind it
- The old code selected the price column by **strict equality** on the header text, so a column headed differently ("Total Premium", "Annual Cost") was never found.
- The fix matches headers that **include** "price" while **excluding** "total" and "indicative", and adds a second index for the total/indicative price.
- The output therefore has **two price columns**: price and total indicative price.
- The plan names this a known `priceIdx` strict-equality bug in the existing basic-plans code - a mis-selected price column is exactly the kind of defect that makes a "cheapest plans" filter pick the wrong two.

Source: [[Entry level plans extraction plan]].

## Why it matters
- The co-pay line is the single number that appears in every intro, every chat quote and on the CRM policy record, so a wrong co-pay column corrupts the message, not just the table. See [[Standard intro message]].
- Co-pay choice is a **separate axis from the tier**: the tier says what is covered, the co-pay option says what the customer pays per visit. See [[Plan price tiers]].

Related: [[Explaining co-pay and plan terms]], [[Plan price tiers]], [[Entry level plans]], [[IMCRM Data Extractor]].
