---
type: entity
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/10_Work-Insurance/Call transcriptions.md", "raw/10_Work-Insurance/Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv", "raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/Companies.md"]
updated: 2026-10-28
tags: [insurer, insurance]
summary: "The largest insurer in the book of business - 22 of 32 policies - and the plans it writes on the Aafiya, E Care Blue and Nextcare networks."
aliases: ["Live Insurance", "Takaful Emarat"]
---
# Takaful Emarat Insurance

An insurer whose plans appear in [[WhatsApp analysis May-June 2026]].

- Plans named: E Care Blue 1 (Basic tier, from AED 1,128.75) and Essential (Enhanced tier, from AED 2,417.10). See [[Plan price tiers]].
- Described as **the only company offering installment plans**; customers can pay through Tabby or Thara but there is no direct integration.
- Its staff appear in the internal contacts (a policy holder name issue, and a thank-you message).

Related insurers mentioned only as internal contacts: Adamjee and Careglobal. Not enough detail to create their own pages yet.

## The renewal engine behind the sales desk (from the daily audits)
In the [[Daily sales audit]] window of 26-29 May 2026, Takaful Emarat was **the main source of inbound work**: its automated renewal notifications - sent from a no-reply address - were what filled the renewal pipeline every run. It is also the incumbent insurer in the one escalated pricing case, where the quoted premium was judged too high and a competing insurer's quote was chased instead.

Observed renewal-notice behaviour:
- Notices arrive with a policy number, a quotation reference and a **days-to-expiry** value, which the audit uses to bucket the pipeline into 1 / 7 / 15 / 30 / 45 days.
- The pipeline was **7 policies deep on 26 and 27 May, 10 on 28 May**, and 4 critical on 29 May - roughly 10 live policies needing renewal at any time.
- Two policies had **already passed their expiry** by the end of the window, having been flagged days earlier. Renewal notices do not stop; a lapsed policy has to be chased by hand.

The exact terms of the renewal notice are not in the vault beyond what the audits quote. See [[Daily sales audit]], [[Sales operations issues]], [[Qatar Insurance Company]].

## The biggest insurer in the book of business
The commission export of 09-Mar-2026 holds **32 policies**, of which **22 are with Takaful Emarat** - 69% of the book, and 94% once [[Dubai Care]] (5) and HAYAH (3) are added. Source: [[Sales commission export]], [[Commission and premium reporting]].

Its plans also dominate the platform catalogue's entry level: of the first 15 entry plans, **four are Takaful Emarat** (E Care Blue 1/2/3/4, APN on Aafiya, Essential on Aafiya, Silver on Nextcare). See [[Insurance plan catalogue]].

## Sales claim on approval speed - a claim, not a verified fact
In [[Call transcriptions]], the advisor argues that one operator's plans are approved faster than another's, putting the gap at **10-20 minutes** on a diagnostic approval and later softening it to 5-10 minutes, and uses that to justify a recommendation. The argument is made against [[Dubai Care]] N4.

**This is a sales claim made on a call, not a measured service level.** No source in the vault measures approval time for either insurer, and the transcript itself hedges the figure twice. Treat it as positioning language until an insurer SLA or a timing study exists. See [[Handling the price objection]], [[Customer objections]].

## Where it appears in the sales flow
- Its **APN (Aafiya)** and **Essential (Aafiya)** plans are the ones quoted in the scripted intro's starting-price table - see [[Batch intro messaging]].
- A Takaful Emarat plan (Silver) appears in the family-plan comparison message alongside a Dubai Care plan and a HAYAH plan - see [[Quote request handling]].
- It is **the only company offering installment plans**, per [[WhatsApp analysis May-June 2026]]; the [[Sales operations issues]] list records an unsent draft about exactly that.
- One renewal call is tied to a **golden visa** requirement - the renewal has to work with that visa type, which constrains which of its plans can be offered. See [[Call handling routine]].

## The entry-level set is mostly this insurer's (2026-10-22 ingest)
The 2026-05-22 extraction plan picks four plans "by name" as the entry-level set, and **three of them are Takaful Emarat**: the **APN Plan** (Aafiya network), the **Silver Plan** (Nextcare network) and the **Essential Plan** (Aafiya network). The fourth is [[Dubai Insurance]]'s Remento N4. Source: [[Entry level plans extraction plan]], [[Entry level plans]].

**Flag - the two plan filters disagree about this insurer.** The extension's older basic-plans filter lists **Takaful Emarat** and **Essential** in its *exclusion* list while including the `AAFIYA (APN)` network label. Since "APN" is both a network fragment and one of this insurer's plan names, the two rules cannot both be applied literally: one filter ends up selecting three Takaful Emarat plans, the other excludes Takaful Emarat. Nothing in the ingested sources resolves which rule the desk actually applies. See [[Basic plan filter]].

The APN label is itself ambiguous in this vault: `AAFIYA (APN)` reads as a network name, while the catalogue line "Takaful Emarat - Essential (Entry Level, AAFIYA)" shows the same pattern - insurer, plan, tier and network compressed into one string. See [[Aafiya]], [[Network tiers]].

## Cross-source note: leads and renewals (2026-10-22)
Takaful Emarat (code TE, inferred from "Takaful Emarat (TE)") is the incumbent on 11 of 20 renewals and is mentioned in 14 individual lead files ([[Health renewals leads folder]], [[Individual health insurance leads folder]]).

Largest insurer in the plan price listing (33 rows): [[IMCRM health detail plan price dump]]; also [[Insurance Plans pages 76-90 of 443]].

## The plan library (2026-10-22 ingest)
**33 plans** - Entry Level 12, Good 13, Best 8 - priced **AED 1,114.00 to 10,261.00** before VAT across **five** network labels: `AAFIYA`, `E CARE BLUE`, `MEDNET`, `NAS`, and `NEXTCARE`. No other insurer in the vault writes across five networks. Detail: [[Plans - Takaful Emarat Insurance]], [[Insurance plan sheets]].

### Entry Level Plans (12 plans: AED 1,114.00 to AED 3,519.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **APN** | AAFIYA | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1114 | 1,208.55 |
| **Essential** | AAFIYA | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2137 | 2,282.70 |
| **APN+** | AAFIYA | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3519 | 3,733.80 |
| **E Care Blue 1** | E CARE BLUE | 20% max AED 25 on consultation, 20% on diagnostics, 20% on medicines | 1209 | 1,308.30 |
| **E Care Blue 2** | E CARE BLUE | 20% max AED 25 on consultation, 10% on diagnostics, 10% on medicines | 1300 | 1,403.85 |
| **E Care Blue 3** | E CARE BLUE | 20% max AED 25 on consultation, 10% on diagnostics, 10% on medicines | 1353 | 1,459.50 |
| **E Care Blue 4** | E CARE BLUE | 20% max AED 25 on consultation, 0% on diagnostics, 0% on medicines | 1512 | 1,626.45 |
| **Silver - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2431 | 2,591.40 |
| **Silver** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2480 | 2,642.85 |
| **Silver** | NAS | 20% up to AED 15/- for GP, 20% up to AED 25/- for Specialists, 20% on diagnostics, 20% on medicines | 2229 | 2,379.30 |
| **Marjan** | NAS | 20% up to AED 15/- for GP, 20% up to AED 25/- for Specialists, 20% on diagnostics, 20% on medicines | 2452 | 2,613.45 |
| **Silver** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 1531 | 1,646.40 |

### Good Tier Plans (13 plans: AED 2,798.00 to AED 5,995.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Silver Pearl - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2798 | 2,976.75 |
| **Pearl** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 2855 | 3,036.60 |
| **Silver Plus - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3301 | 3,504.90 |
| **Silver Plus** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3368 | 3,575.25 |
| **Iridium - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3785 | 4,013.10 |
| **Iridium** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3862 | 4,093.95 |
| **Gold - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4937 | 5,222.70 |
| **Gold** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5037 | 5,327.70 |
| **Opal** | NAS | 20% up to AED 25/- for GP, 20% up to AED 60/- for Specialists, 20% on diagnostics, 20% on medicines | 3929 | 4,164.30 |
| **Yaqoot** | NAS | 20% up to AED 25/- for GP, 20% up to AED 60/- for Specialists, 20% on diagnostics, 20% on medicines | 4856 | 5,137.65 |
| **Iridium** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 3925 | 4,160.10 |
| **Gold** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 4305 | 4,559.10 |
| **Gold Plus** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 5995 | 6,333.60 |

### Best Tier Plans (8 plans: AED 6,454.00 to AED 10,261.00)
| Plan Name | Network | Co-pay Structure | Base Price (AED) | Total w/ VAT (AED) |
|---|---|---|---|---|
| **Platinum - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6454 | 6,815.55 |
| **Platinum** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 6585 | 6,953.10 |
| **Rhodium - Lite** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7273 | 7,675.50 |
| **Rhodium** | MEDNET | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7421 | 7,830.90 |
| **Diamond** | NAS | 20% up to AED 35/- for GP, 20% up to AED 75/- for Specialists, 20% on diagnostics, 20% on medicines | 7749 | 8,175.30 |
| **Zumurrod** | NAS | 20% up to AED 35/- for GP, 20% up to AED 75/- for Specialists, 20% on diagnostics, 20% on medicines | 10261 | 10,812.90 |
| **Platinum** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7125 | 7,520.10 |
| **Rhodium** | NEXTCARE | 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines | 7916 | 8,350.65 |

### Co-pay & Underwriting
- **APN (Aafiya)**: Lowest priced plan in the entire 418-plan library at **AED 1,114.00** (AED 1,208.55 with VAT), 20% max AED 50 consult, 20% diag, 20% meds.
- **E Care Blue 1-4**: Workhorse entry plans starting at AED 1,209.00, highly popular for Dubai residency visa compliance.
- **Installment Financing**: Takaful Emarat is unique in supporting split installment plans (e.g. Tabby / debit schedules), driving high sales conversion.

## The book of business, measured twice (2026-10-22 ingest)
- **60 of the 84 rows** in the ten dated commission exports in `Sales Reports/` are Takaful Emarat (see [[Sales commission export]]). Add [[Dubai Insurance]] (4), [[Abu Dhabi National Takaful Insurance]] (8), [[Orient Insurance]] (6), [[Cigna Insurance]] (3) and [[Qatar Insurance Company]] (3) and the book is 94% concentrated in six insurers.
- [[Adamjee Insurance]] and [[Oman Insurance]] appear in **no** commission export at all.
- The renewal book matches: **6 of the 10 May 2026 renewal cases** and **4 of the 8 April board rows** are Takaful Emarat. Source: [[Renewals board]], [[Client dossiers]].

## Three names for one insurer
The workspace writes this insurer as **Takaful Emarat Insurance** (commission exports), **TE** (renewal filenames and board rows) and **Live Insurance** (one renewals-board row). Policy numbers are `01-115-01-25-XXXXXXXXXX`, and the renewal filename rule keeps only the **last ten digits** - `TE-XXXXXXXXXX`. See Takaful Emarat and [[Lead reference IDs]].

## What the workspace does not settle
- The **TE Gold / TE Yakut** tier names appear in a task note describing an upgrade - a plan upgrade handled as a renewal case, with the client circumstances recorded in the task rather than the dossier. See [[Task list]].
- The "10-20 minutes faster approval" claim about a rival operator remains a **sales claim**, not a measured service level. See the section above.

## In the work_os design set (2026-10-22 ingest)
This insurer appears in the work_os roster of **24 UAE insurers** that the design set claims to support, listed both in `03_INSURANCE_KNOWLEDGE/Companies.md` and in the "Insurance Companies Supported" section of the sales-agent plan. The roster also carries the renaming history - **GIG (previously AXA)**, **Sukoon (previously Oman Insurance)**, **Max Health (a product of Dubai Insurance)** - and it is the roster that names this insurer **Takaful Emarat Insurance**. Source: [[Health Insurance Companies]], [[Health Insurance Sales Agent Plan (Jan 2026)]].

The roster is a **design claim**: the same design set's own code never gets past stubs, so "supported" means "written down". See Planning document.

One network detail from that set is worth keeping here: the work_os network lists give **Ecare** three networks (Classic, Green, Blue), and it is this insurer's **E Care Blue** plans that carry that network label, while Dubai Insurance writes the plain "Ecare" label. So one TPA's three networks appear in the CRM under two different labels, one of which is also one of this insurer's plan names. See [[Ecare]], [[Network tiers]], [[TPA and network reference]].

## Names used on the desk
Takaful Emarat appears under three labels: the contract name, the short code `TE` on renewal filenames, and **Live Insurance** on the renewals board. The Live Insurance link is an inference from the policy-number format (`01-115-01-25-...`); no workspace source states it in words. One April 2026 renewal was completed under the Live Insurance label, consolidated into a combined family policy. Source: [[Renewals board]].
