---
type: source
sources: ["raw/10_Work-Insurance/Untitled.md", "raw/work_os system designing documents/00_ORIGINALS/Untitled.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/CRM_Plan_Pricing_Data.md"]
updated: 2026-10-22
tags: [insurance, imcrm, plans, pricing, scrape]
summary: "A raw paste of eight 'Health Detail - IMCRM' blocks: about 98 plan rows with visibility flag, type, network, co-pay and two price figures, cheapest first."
---
# IMCRM health detail plan price dump

An untitled note that is a copy-paste of the plan table from the [[IMCRM]] Health Detail page, in eight blocks each headed `Title: Health Detail - IMCRM`. The text is unformatted: cells run together, for example the plan type "Entry Level" is glued to the network name. About 98 rows carry a `Hidden` or `Currently Online` marker.

## Columns (reading across a row)
Insurer, visibility flag, plan name, plan type, network, co-pay text, then two numbers: a premium and a second figure about 6% higher. The second figure is probably the price with fees or VAT, but the paste labels neither. Treat the basis as unconfirmed.

## What it shows
- **Visibility is a live flag.** 70 rows are `Hidden`, 28 are `Currently Online`. A plan can exist in the catalogue and not be offered, which matters when a quote is built from the list (see [[Plan price tiers]]).
- **Insurer concentration.** Takaful Emarat (33 rows), Dubai Insurance (31) and HAYAH (26) dominate. Fidelity United, Orient, Orient Takaful and Abu Dhabi National Takaful have a handful. Compare [[Insurance Plans pages 76-90 of 443]].
- **Type mix.** 44 rows are `Entry Level` and 32 are `Good` where the type is legible.
- **Cheapest first.** Each block ascends by price. Ecare Blue and Nextcare plans start around 4,100-5,000. Dubai Insurance Mednet Pearl and Emerald plans sit near 9,000-12,000. Dubai Care Next N3/N2 plans reach about 14,000.
- **Co-pay pattern.** Most rows read "20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines". Variants: Ecare Blue caps consultation at AED 25; Blue 03 and Takaful Emarat Blue 2/3 drop to 10% on diagnostics and medicines; Blue 4 to 0%; some Nextcare "Plan E/F" rows use 30% on medicines. See [[Co-pay and co-insurance]] and [[Explaining co-pay and plan terms]].
- **Pharmacy vs medicines.** Some Dubai Care rows say "pharmacy" where others say "medicines" for the same 20%. That reads as an export wording difference, not a benefit difference (unverified).

## Caveats
- No client data: these are catalogue prices.
- Snapshot of unknown date; hidden/online flags change. The tidy catalogue is [[Insurance Plans — Sorted by Category]].
- Extraction method: [[IMCRM health detail page extraction]] and [[Extract IMCRM Health Leads Workflow]].

## Also stored in work_os
The same dump is in `00_ORIGINALS/Untitled.md` and, renamed, `03_INSURANCE_KNOWLEDGE/CRM_Plan_Pricing_Data.md` (identical, about 20 KB). The renamed copy is linked from the Master Index as "Real IMCRM plan pricing data" ([[Work OS Master Index]]). The dump mixes plan-table fragments with two repeated health-detail pages for one lead; the lead data in them is not recorded in the wiki (contains personal data). Priced plan tables derived from the same catalogue are in [[UAE Health Insurance Plan Structure and Pricing]].
