---
type: source
sources: ["raw/Health-Insurance/Workspace/Sales Reports/plans_table.md"]
updated: 2026-10-22
tags: [insurance, plans, pricing, catalogue, scrape]
summary: "A 418-row export of every plan available on one CRM quote: 22 insurers, 20 network labels, price AED 1,114 to 102,498."
---
# Plans Table 418 Plans

The raw table behind the per-insurer plan files: columns row number, provider, plan name, plan type, network, co-pay / co-insurance, price (AED), total with VAT. The knowledge-base index says the 418 plans were scraped on 1 May 2026 for one specific lead's quote (lead name in the source). The per-insurer files and `Plans.md` are cuts of the same data ([[Plan library]]); the workspace copy of that master table is [[Plans Master List]].

## Counts
| By plan type | Rows |
|---|---|
| Best | 216 |
| Good | 125 |
| Entry Level | 77 |

| Insurer (rows) | |
|---|---|
| [[Dubai Insurance]] 64, [[Cigna Insurance]] 40, [[Abu Dhabi National Insurance Company]] 36, [[Takaful Emarat Insurance]] 33, [[Abu Dhabi National Takaful Insurance]] 30, [[HAYAH Insurance]] 21 + April Hayah 28 | |
| [[Qatar Insurance Company]] 19, [[Adamjee Insurance]] 19, [[RAK Insurance]] 18, [[Orient-Allianz Insurance]] 17, [[Orient Insurance]] 13, [[NLGIC Liva Insurance]] 12, [[Watania Takaful Insurance]] 12, [[National General Insurance]] 10 | |
| [[Daman Insurance]] 9, DIC-Viventa 9, [[Fidelity United Insurance]] 7, [[ISONSECURE Insurance]] 7, [[Orient Takaful Insurance]] 6, [[BUPA Insurance]] 5, [[Max Health Insurance]] 3 | |

Networks by row count: Mednet 115, NAS 52, Nextcare 46, Neuron 40, Abu Dhabi National's own 36, Dubai Care 34, Allianz 17, QIC own 12, HealthNet 10, Daman 9, ISONSECURE 7, QIC Mednet 7, ECARE 6, Orient Takaful 6, RAK NAS 5, E Care Blue 4, Maxwell 3, Sukoon Premium 3, Aafiya 3, Sukoon Signature plus Medcare 2, Dubai Care (Remnto) 1. See [[Plan library by network]].

Price range AED 1,114 (Takaful Emarat APN) to AED 102,498.01 (BUPA Ultimate), before VAT. Sorted by the Best-first order the CRM shows, not by price.

## Flags
- Counts differ from other plan catalogues in the vault: 418 here, 376 in the platform catalogue, 382 in the extension plan. Each is a different lead's quote, so the plan set and prices vary ([[Insurance plan catalogue]]).
- The row label shows the plan type as "Best" for Silver Premium on some insurers and "Good" for the same name on others, so type labels are assigned per insurer, not per tier name ([[CRM plan type labels]]).
- Several rows have an empty co-pay cell (Adamjee 750 variants, April Hayah Core, some DIC Silver Classic C).
