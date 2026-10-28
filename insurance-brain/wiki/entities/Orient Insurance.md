---
type: entity
sources: ["raw/Health-Insurance/Workspace/Plans/Orient-Insurance.md", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_23-Apr-2026 14_26_31.csv"]
updated: 2026-10-22
tags: [insurer, mednet, nextcare]
summary: "Orient Insurance: 13 plans, 7 on Mednet and 6 on Nextcare, AED 1,559 to 8,199; 6 rows in the April commission exports - but it is NOT the OI2 in the renewal files."
---
# Orient Insurance

Insurer with 13 plans, 7 on [[Mednet]] and 6 on [[Nextcare]]. Detail: [[Plans - Orient Insurance]], [[Insurance plan catalogue]]. Related group entities: [[Orient Takaful Insurance]], [[Orient-Allianz Insurance]].

## Plan Catalogue & Networks (2026-05-01)
Orient Insurance lists **13 plans** across two major TPAs: **[[Mednet]]** (7 plans) and **[[Nextcare]]** (6 plans), spanning AED 1,558.57 to AED 8,199.13 before VAT.

### Entry Level Plans (2 plans: AED 1,558.57 to AED 2,823.73)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Silk Road** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2823.73 | 3,003.77 |
| **RN3 Plan** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1558.57 | 1,675.35 |

### Good Tier Plans (7 plans: AED 3,017.64 to AED 6,105.71)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **PEARL** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3017.64 | 3,207.37 |
| **Emerald** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3556.1 | 3,772.76 |
| **Green** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4409.8 | 4,669.14 |
| **Silver Classic** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5299.98 | 5,603.83 |
| **RN2 Plan** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3997.14 | 4,235.85 |
| **RN Plan** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 4384.29 | 4,642.35 |
| **GN Limited Plan** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 6105.71 | 6,449.85 |

### Best Tier Plans (4 plans: AED 7,257.14 to AED 8,199.13)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Silver Premium** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7360.16 | 7,767.02 |
| **Gold** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 8199.13 | 8,647.94 |
| **GN Plan** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 7257.14 | 7,658.85 |
| **GN Plus Plan** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 8062.86 | 8,504.85 |

### Co-Pay Structure
- Outpatient Consultation: 20% co-insurance capped at **AED 50.00** per visit.
- Diagnostics & Pharmacy: 20% co-insurance on laboratory/imaging and prescription medicines.

## Correction: `OI2` is Oman Insurance, not Orient (2026-10-22)
An earlier version of this page read the renewal code **`OI2`** as Orient. The renewal file says otherwise: *"Provider: **Oman Insurance** (OI2)"*, with an Oman policy number of the form `P/01/<year>/<serial>`. `OI2` is a renewal-file prefix for **Oman Insurance**, an unrelated insurer with no plan file in the library. See [[Oman Insurance]].

**Orient Insurance has no renewals in the workspace.** It appears instead in the commission exports: **6 of the 84 rows** across the ten dated exports - the third largest book after [[Takaful Emarat Insurance]] and [[Abu Dhabi National Takaful Insurance]]. Source: [[Sales commission export]].

## A name collision worth watching
Orient's Mednet range includes **Silk Road** - and so does [[NLGIC Liva Insurance]]'s. Two insurers, two networks' products with the same plan-family name, and different prices: a quote comparison that lists "Silk Road" without the insurer will be ambiguous. See [[Plan sheet format]] and [[Insurance plan catalogue]].
