---
type: source
sources: ["raw/Health-Insurance/Workspace/Plans/April-Hayah.md"]
updated: 2026-10-22
tags: [plans, insurer, hayah, mednet, international]
summary: "28 Hayah plans on Mednet, all classed Best, built from Essential / Extensive / Elite inpatient, outpatient and dental blocks, AED 9,425 to 42,487."
---
# Plans - April Hayah

Per-insurer file in the plan library ([[Plan library]]); entity page [[HAYAH Insurance]]. Separate from the Nextcare range in [[Plans - HAYAH Insurance]].

## Structure
- One network: [[Mednet]]. Type: all 28 are Best.
- Price AED excl. VAT: from "Core" at 9,425.09 up to 42,487.15 (VAT-inclusive 9,935.19 to 44,650.36).
- Naming is a **building-block formula**: inpatient level (Essential, Extensive, Elite) + outpatient level (Essential, Extensive, Elite) + dental level, each with a regional reach (WW, WWEx) and a Mednet sub-network (Green, Classic, Premium). Example shape: "Essential (IP) + Extensive (OP) + Essential Dental WWEx (Green)".
- Co-pay is the same for nearly every row: 20 percent max AED 51 on consultation, 20 percent diagnostics and medicines; one row has 0 percent on diagnostics and medicines.

## Reading it
Price rises with the Mednet sub-network (Green cheapest, Classic then Premium) and with the outpatient level; dental level moves it less. This is the only file where a plan is assembled from separate IP, OP and dental choices.

## Flags
- "AED 51" looks like a typo for AED 50 but appears on every row, so it is how the CRM stores it.
- The file title implies an April edition; the date inside is 2026-05-01. Why two Hayah files exist (April Hayah versus HAYAH Insurance) is not explained.
