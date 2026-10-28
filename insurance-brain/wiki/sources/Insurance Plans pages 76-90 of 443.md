---
type: source
sources: ["raw/10_Work-Insurance/Insurance Plans (76-90 of 443).md"]
updated: 2026-10-22
tags: [insurance, plans, catalogue, networks]
summary: "A 90-row CRM plan extract (pages 76-90 of 443) sorted by insurer, with plan type, network and category per plan."
---
# Insurance Plans pages 76-90 of 443

A slice of the full plan list that the CRM shows for a health-insurance quote request. The file title says pages 76 to 90 of 443; the table inside numbers the plans 1 to 90, grouped under the insurer that sells them. It is a working extract, not a complete catalogue. Compare the whole-list version in [[Insurance Plans — Sorted by Category]] and the structure notes in [[Insurance plan catalogue]].

## Shape
Every row has six columns: row number, plan name, plan type (`Entry Level` or `Good`), network provider, network, and category (`Basic Plan`, `Basic Enhance Plan` or `Enhance Plan`). The category cell is blank for a few rows (for example the plan called "Core").

## Insurers covered (13 sections)
Abu Dhabi National Takaful, [[Adamjee Insurance]], DIC-Viventa, [[Dubai Insurance]], a separate "Dubai Insurance-Remnto" section, Fidelity United, HAYAH Insurance, NLGIC - Liva Insurance, Orient Insurance, Orient Takaful, RAK Insurance, [[Takaful Emarat Insurance]] and Watania Takaful.

## Patterns worth keeping
- **The insurer does not decide the network.** One insurer sells plans on several TPA networks. Dubai Insurance alone lists plans on [[Dubai Care]] (N5, N5A, N5B, Next N5 variants, N4), [[Ecare]] (Blue 01-03, Classic Care 01-03) and [[Mednet]] (Silk Road, Pearl, Emerald with A/B variants). See [[Network tiers]].
- **Plan type tracks the network tier.** Silk Road, N5, Blue and Classic Care sit at `Entry Level`; Pearl and Emerald sit at `Good`.
- **Category tracks type.** Entry-level Dubai Care and Ecare plans are `Basic Plan`; Silk Road and NAS "WN" plans are `Basic Enhance Plan`; Pearl, Emerald and Dubai Care N4 are `Enhance Plan`. This matches the three categories in [[Insurance plan catalogue]].
- **NAS "Care-WN" and "FCP WN" plans** are the entry-level NAS products (see [[NAS]]).
- **Remnto** appears as a bracketed network label, "DUBAI CARE (Remnto)", for N4 plans and in a Dubai Insurance-Remnto section (N4 Value, N4 Base). The note does not say what Remnto is. Treat it as an unexplained label and do not "fix" the spelling without checking the CRM.

## Caveats
- Prices, co-pay and benefits are not in this file; see [[IMCRM health detail plan price dump]].
- The extract is partial: 90 of 443 plan rows, so any count taken from it understates the market.
