---
type: entity
sources: ["raw/Health-Insurance/Workspace/Plans/HAYAH-Insurance.md", "raw/Health-Insurance/Workspace/Plans/April-Hayah.md", "raw/Health-Insurance/Workflows/Filtered_Plans_4000_6000.md"]
updated: 2026-10-22
tags: [insurer, insurance, uae, nextcare, mednet]
summary: "Insurer with two plan files: 21 Care Protect plans on Nextcare and 28 build-your-own Mednet plans; its RN3 B plan is the Basic Enhanced example."
---
# HAYAH Insurance

Insurer with 3 policies in the March 2026 commission export (see [[Sales commission export]]). The plan library holds two Hayah files:
- **Care Protect on Nextcare**, 21 plans: RN3 (Entry, AED 1,520-1,641), RN2/RN/GN Lite (Good), GN/GN Plus (Best, up to 7,878). See [[Plans - HAYAH Insurance]].
- **Mednet range ("April Hayah")**, 28 Best plans built from inpatient + outpatient + dental blocks, AED 9,425-42,487. See [[Plans - April Hayah]].

Care Protect RN3 B is the "Basic Enhanced" example in [[Plan price tiers]] and is one of the plans excluded by the extension's basic-plans filter ([[Basic plan filter]]).

Flag: why two separate Hayah files exist, and whether "April" refers to a product edition or a date, is not stated. Related: [[Nextcare]], [[Mednet]], [[Insurance plan catalogue]].

## Plan Catalogue: Care Protect Suite on Nextcare (2026-05-01)
The primary domestic portfolio in `Plans/HAYAH-Insurance.md` features **21 plans** on [[Nextcare]], priced from **AED 1,520.00 to AED 7,878.00** before VAT across Entry, Good, and Best tiers.

### Entry Level Plans (3 plans: AED 1,520.00 to AED 1,641.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **CARE PROTECT RN3 B** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1520 | 1,634.85 |
| **CARE PROTECT RN3 A** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1633 | 1,753.50 |
| **CARE PROTECT RN3** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1641 | 1,761.90 |

### Good Tier Plans (10 plans: AED 3,908.00 to AED 5,976.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **CARE PROTECT RN2 A** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3908 | 4,142.25 |
| **CARE PROTECT RN 2** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4011 | 4,250.40 |
| **CARE PROTECT RN** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4289 | 4,542.30 |
| **CARE PROTECT RN B** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4289 | 4,542.30 |
| **CARE PROTECT RN A** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4359 | 4,615.80 |
| **CARE PROTECT RN C** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4359 | 4,615.80 |
| **CARE PROTECT GN LITE** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5924 | 6,259.05 |
| **CARE PROTECT GN LITE C** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5969 | 6,306.30 |
| **CARE PROTECT GN LITE A** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5976 | 6,313.65 |
| **CARE PROTECT GN LITE B** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5976 | 6,313.65 |

### Best Tier Plans (8 plans: AED 7,039.00 to AED 7,878.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **CARE PROTECT GN** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7039 | 7,429.80 |
| **CARE PROTECT GN C** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7093 | 7,486.50 |
| **CARE PROTECT GN A** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7102 | 7,495.95 |
| **CARE PROTECT GN B** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7102 | 7,495.95 |
| **CARE PROTECT GN PLUS** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7799 | 8,227.80 |
| **CARE PROTECT GN PLUS A** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7878 | 8,310.75 |
| **CARE PROTECT GN PLUS B** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7878 | 8,310.75 |
| **CARE PROTECT GN PLUS C** | Nextcare | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7878 | 8,310.75 |

### Co-pay & Underwriting
- Standard 20% co-insurance capped at **AED 50.00** on consultation across all plans.
- Diagnostics: 20% co-insurance.
- Prescription Medicines: 20% co-insurance.
- Letter suffixes (`A`, `B`, `C`) denote specific network deductible options within Nextcare RN, RN2, RN3, GN Lite, GN, and GN Plus.

## Renewals and commissions (2026-10-22 ingest)
- **One June 2026 renewal case** is with HAYAH, policy expiry 24 June, premium **21,000+ AED** - by far the largest single premium in the renewal set, and the case the desk left open with the note that family grouping may make it an addition to an existing policy rather than a renewal. Source: [[Client dossiers]], [[Renewal pipeline]].
- HAYAH policy numbers use their own format (`B06958018E528F2B`), not the `01-115-...` shape Takaful Emarat uses.
- **3 policies** in the March commission export. Source: [[Sales commission export]].

**Two Hayah files, one insurer.** The plan library splits Hayah into a Nextcare "Care Protect" range and a Mednet range labelled "April Hayah"; the renewal case above is filed under the plain HAYAH code. Until the source of the split is known, treat *April Hayah* as a **plan-file label, not a second company** - the renewal evidence points to one insurer. See [[Insurance plan sheets]] and [[Plan sheet format]].
