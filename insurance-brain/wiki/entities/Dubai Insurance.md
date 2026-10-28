---
type: entity
sources: ["raw/Health-Insurance/Individual-Health-Insurance.md", "raw/Health-Insurance/Motor-Insurance.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md"]
updated: 2026-10-22
tags: [insurer, insurance, uae]
summary: "The insurer that writes Dubai Care and Ecare plans, including the Remento N4 entry-level plan - not to be confused with the Dubai Care TPA."
---
# Dubai Insurance

An insurer in the UAE market. In this workspace it appears in two roles: as an **insurer writing on the [[Dubai Care]] and [[Ecare]] networks**, and as the source of the **Remento N4** entry-level plan.

**This is not the Dubai Care TPA.** "Dubai Insurance" is the insurer; "Dubai Care" is the network operator. The CRM plan catalogue names both on one line - "Dubai Insurance - Remnto N4 Value (Dubai Care)" - and the desk explains that difference to customers by saying the *network operator*, not the benefits, is what separates two identical-looking quotes. See [[Network tiers]], [[Explaining co-pay and plan terms]].

## The Remento N4 plan
| Attribute | Value |
|---|---|
| Plan name | Remento N4 - also written **Remnto N4**, **RN4** |
| Network | Dubai Care N4 (the economy tier) |
| Provider | Dubai Insurance |
| Position | one of four entry-level plans in the 2026-05-22 extraction set |
| Quoted starting price | AED 1,757 excl. / 1,883.70 incl. VAT, in one June 2026 intro |

Sources: [[Entry level plans extraction plan]], [[Plan price tiers]].

**The name is unstable.** Three spellings appear across the vault and the CRM catalogue, and the older vault vocabulary says "Dubai Care N4". This is a template artefact, not a plan family - flagged in [[Plan price tiers]].

## Its place in the business
- **5 of the 32 policies** in the 09-Mar-2026 commission export are with Dubai Insurance - second only to [[Takaful Emarat Insurance]] (22). See [[Sales commission export]], [[Commission and premium reporting]].
- It is one of the insurers writing on the **Ecare** network, alongside [[Takaful Emarat Insurance]]'s E Care Blue writing. See [[Network tiers]].
- Its N4 plan appears in the family-plan comparison alongside a Takaful Emarat plan and a HAYAH plan - see [[Quote request handling]].

## Caveats
- The workspace holds two dedicated files for this insurer (`Workspace/Knowledge Base/Dubai-Insurance.md` and `Workspace/Plans/Dubai-Insurance.md`) which are **not in this ingest scope**; they are the place to look for the canonical plan list and underwriting notes.
- Nothing ingested here measures its approval speed or service level. The "10-20 minutes faster approval" argument in the calls is a sales claim about the operator, not about this insurer - see [[Takaful Emarat Insurance]] and [[Customer objections]].

Related: [[Dubai Care]], [[Ecare]], [[Takaful Emarat Insurance]], [[Entry level plans]], [[Network tiers]], [[Plan price tiers]].

## Cross-source note: leads and renewals (2026-10-22)
Dubai Insurance (code DIC) is the incumbent on 7 of 20 renewals and is mentioned in 15 individual lead files ([[Health renewals leads folder]], [[Individual health insurance leads folder]]).

Plans on Dubai Care, Ecare and Mednet networks appear in [[Insurance Plans pages 76-90 of 443]] and [[IMCRM health detail plan price dump]]; also listed in [[Copilot chat 2026-02-24 insurance notes]].

## The plan library (2026-10-22 ingest)
**64 plans - the largest catalogue in the library**, priced **AED 1,450.00 to 8,191.00** before VAT across **four** network labels: `DUBAI CARE`, `DUBAI CARE (Remnto)`, `ECARE`, and `MEDNET`. Tier distribution: 16 Entry Level, 24 Good, 24 Best. Detail: [[Plans - Dubai Insurance]], [[Insurance plan sheets]].

### Entry Level Plans (16 plans: AED 1,450.00 to AED 2,689.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Dubai Care Next N5B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1450 | 1,561.35 |
| **Dubai Care Next N5A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1557 | 1,673.70 |
| **Dubai Care Next N5** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1565 | 1,682.10 |
| **N5A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2193 | 2,341.50 |
| **Dubai Care N5** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 2215 | 2,364.60 |
| **Dubai Care N5B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 2261 | 2,412.90 |
| **Dubai Care N4** | DUBAI CARE (Remnto) | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2408 | 2,567.25 |
| **Blue 01** | ECARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1492 | 1,605.45 |
| **Blue 02** | ECARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1492 | 1,605.45 |
| **Blue 03** | ECARE | 20% max AED 50 on consultation, 10% on diagnostics, 10% on medicines | 1641 | 1,761.90 |
| **Classic Care 01** | ECARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2314 | 2,468.55 |
| **Classic Care 02** | ECARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2314 | 2,468.55 |
| **Classic Care 03** | ECARE | 20% max AED 50 on consultation, 10% on diagnostics, 10% on medicines | 2545 | 2,711.10 |
| **Silk Road A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2608 | 2,777.25 |
| **Silk Road** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2634 | 2,804.55 |
| **Silk Road B** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2689 | 2,862.30 |

### Good Tier Plans (24 plans: AED 2,859.00 to AED 5,560.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Dubai Care Next N3A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3719 | 3,943.80 |
| **Dubai Care Next N3** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3816 | 4,045.65 |
| **Dubai Care N3** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 3846 | 4,077.15 |
| **Dubai Care N3A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 3945 | 4,181.10 |
| **Dubai Care Next N2C** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4079 | 4,321.80 |
| **Dubai Care Next N2** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4084 | 4,327.05 |
| **Dubai Care Next N2A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4150 | 4,396.35 |
| **Dubai Care Next N2B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4150 | 4,396.35 |
| **Dubai Care N2** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 4917 | 5,201.70 |
| **Dubai Care N2A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 5044 | 5,335.05 |
| **N2B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5044 | 5,335.05 |
| **N2C** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5365 | 5,672.10 |
| **Pearl** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2859 | 3,040.80 |
| **Pearl A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2903 | 3,087 |
| **Pearl B** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2932 | 3,117.45 |
| **Emerald** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3475 | 3,687.60 |
| **Emerald A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3528 | 3,743.25 |
| **Emerald B** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3563 | 3,780 |
| **Green** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3907 | 4,141.20 |
| **Green A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4008 | 4,247.25 |
| **Silver Classic** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5096 | 5,389.65 |
| **Silver Classic A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5226 | 5,526.15 |
| **Silver Classic B** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5226 | 5,526.15 |
| **Silver Classic C** | MEDNET |  | 5560 | 5,876.85 |

### Best Tier Plans (24 plans: AED 6,659.00 to AED 8,191.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Dubai Care Exclusive N2B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 6659 | 7,030.80 |
| **Exclusive N2A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6659 | 7,030.80 |
| **Dubai Care Next Exclusive N2** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6700 | 7,073.85 |
| **Dubai Care Next Exclusive N2C** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6750 | 7,126.35 |
| **Dubai Care Next Exclusive N2A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6759 | 7,135.80 |
| **Dubai Care Next Exclusive N2B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6759 | 7,135.80 |
| **Exclusive N2C** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7084 | 7,477.05 |
| **Dubai Care N1** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 7317 | 7,721.70 |
| **Dubai Care Exclusive N2** | DUBAI CARE | 20% max AED 50 on consultation, 0% on diagnostics, 0% on pharmacy | 7416 | 7,825.65 |
| **Dubai Care Next N1** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7425 | 7,835.10 |
| **Dubai Care Next N1A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7500 | 7,913.85 |
| **Dubai Care Next N1B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7500 | 7,913.85 |
| **Dubai Care Next N1C** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7500 | 7,913.85 |
| **Dubai Care N1B** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on pharmacy | 7504 | 7,918.05 |
| **N1A** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7504 | 7,918.05 |
| **N1C** | DUBAI CARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7983 | 8,421 |
| **Silver Premium** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6661 | 7,032.90 |
| **Silver Premium A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6832 | 7,212.45 |
| **Silver Premium B** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6832 | 7,212.45 |
| **Silver Premium C** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7268 | 7,670.25 |
| **Gold** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7507 | 7,921.20 |
| **Gold A** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7699 | 8,122.80 |
| **Gold B** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7699 | 8,122.80 |
| **Gold C** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 8191 | 8,639.40 |

### Co-pay Rules
- Standard consultations: 20% co-insurance capped at **AED 50.00** across Dubai Care, Mednet, and Ecare tiers.
- Diagnostics: 20% on laboratory and radiology.
- Medicines: 20% on prescription pharmacy.
- Suffixes A, B, C denote slight hospital/clinic network inclusions and deductible options.

## The renewal book (2026-10-22 ingest)
- **DIC is the incumbent on 4 of the 8 April renewals board rows and 3 of the 10 May 2026 renewal cases** - the largest share of any insurer. Source: [[Renewals board]], [[Client dossiers]].
- Renewal filenames use the **short** policy number: `DIC-<six digits>`. See [[Renewal pipeline]].
- **One renewal case is a refused discount**: the insurer declined a renewal discount, the client was told by WhatsApp, and the follow-up task is still open. That is the renewal-specific negotiation the renewal dossier exists to capture - see [[Renewals board]].

## In the commission book (2026-10-22 ingest)
**4 of the 84 rows** across the ten dated commission exports, on top of 5 of the 32 rows in the March export - consistently the second or third largest book after Takaful Emarat. See [[Sales commission export]].
