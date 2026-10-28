---
type: concept
sources: ["wiki/sources/Plans Master List.md", "wiki/sources/Plans Table 418 Plans.md", "wiki/sources/All Plans List by Network.md", "wiki/sources/Filtered Plans 4000-6000 AED.md", "wiki/concepts/Plan price tiers.md", "wiki/concepts/Network tiers.md", "wiki/entities/BUPA.md", "wiki/entities/National General Insurance.md", "wiki/entities/Sukoon.md", "wiki/entities/HealthNet.md"]
updated: 2026-10-22
tags: [plans, catalogue, library]
summary: "Master catalogue of insurer plans: structure, counts, naming, and how to find plans across networks."
---
# Plan library

The master catalogue of insurer plans in the workspace. It is the union of per-insurer plan sheets and aggregated exports, used to quote and filter plans by tier and network.

## Where it lives
- [[Plans Table 418 Plans]] - 418-row export (22 insurers, 20 network labels), price AED 1,114 to 102,498; sorted as in CRM, not by price. Plan types: Best 216, Good 125, Entry Level 77.
- [[Plans Master List]] - padded Markdown copy of the same 418 rows ([[Plans.md]] in workspace), 424 lines; two copies exist (no stated canonical).
- Per-insurer files under Health-Insurance/Workspace/Plans/ (e.g. [[Plans - BUPA]], [[Plans - National General Insurance]]), summarized by entities like [[BUPA Insurance]], [[National General Insurance]].
- [[All Plans List by Network]] - hand-curated grouping by network (entry-focused, ~100 plans).
- [[Filtered Plans 4000-6000 AED]] - example price-band output from [[Workflow Filter Plans By Price]] (12 plans, AED 4k-6k).

## Structure
Each plan row typically includes: provider/insurer, plan name, plan type (Entry Level / Good / Best) as assigned per insurer ([[CRM plan type labels]]), network label, co-pay/co-insurance, price (AED ex VAT / with VAT). Plan types are not globally consistent (same name can be labeled differently across insurers).

## Naming
- Network labels appear in plan names/columns (e.g. [[Sukoon]] Signature + Medcare / Premium for [[BUPA Insurance]]; [[HealthNet]] for [[National General Insurance]]).
- Some network labels are also plan names (e.g. Aafiya/E Care Blue) causing filtering confusion ([[Network tiers]]).
- Tier labels in quotes use customer vocabulary ([[Plan price tiers]]): Basic / Basic Enhanced / Enhanced; CRM/catalogue may use different axes.

## Counts
418 plans total (as captured). Networks present include Mednet, NAS, Nextcare, Dubai Care, Neuron, Abu Dhabi National's own, Daman, HealthNet, ECARE/E Care Blue, Aafiya, Sukoon, RAK NAS, QIC own/Mednet, ISONSECURE, Maxwell, Orient Takaful, etc. See [[Plan library by network]].

## Notes
- Prices are quote-specific (depend on members/ages); same plan name can differ across quotes ([[Filtered Plans 4000-6000 AED]]).
- Ultimate ([[BUPA Insurance]]) is the most expensive in the 418-plan set (AED 102,498 ex VAT).
- Entry prices vary widely; some "entry" plans start above others. See [[Plan price tiers]].

Cited: [[Plans Master List]], [[Plans Table 418 Plans]], [[All Plans List by Network]], [[Filtered Plans 4000-6000 AED]], [[Plan price tiers]], [[Network tiers]].
