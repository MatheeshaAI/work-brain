---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/10_Work-Insurance/Call transcriptions.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/Health-Insurance/Context/HEA-XXXXXXXX.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [insurance, pricing]
summary: "The Basic / Basic Enhanced / Enhanced plan tiers, their starting prices, the co-pay axis, and the conflicting price figures across sources."
---
# Plan price tiers

The three tiers of health plan offered to leads, with a starting price including VAT. From [[WhatsApp analysis May-June 2026]] (June 2026).

| Tier | Example plan | Starting price (AED, incl. VAT) |
|---|---|---|
| Basic | [[Takaful Emarat Insurance]] E Care Blue 1 | 1,128.75 |
| Basic Enhanced | HAYAH Care Protect RN3 B | 1,461.60 |
| Enhanced | [[Takaful Emarat Insurance]] Essential | 2,417.10 |

## Notes
- "RN3" in the Basic Enhanced plan name matches one of the [[Nextcare]] networks listed in [[YOUR MULTI-AGENT TEAM STRUCTURE]]. That link is an inference from the name; the source does not state the TPA.
- One customer objection quoted a competing offer at AED 2,600 ([[Customer objections]]), and another customer recalled paying AED 1,208 the year before.
- Quotes are valid for 30 days according to a conversation in the report ([[Sales operations issues]]).
- These tiers are separate from the TPA [[Network tiers]]; they describe packaged plans, not networks.

## Flag: the audit-era tier names do not match (unresolved)
The [[Daily sales audit]] window of 26-29 May 2026 uses a **different tier vocabulary**: entry-level, mid-range and top-tier plans, and the CRM's own plan-preference field shows a three-step ladder that the audit describes as entry / mid-range / top. The drafts also talk about "comprehensive-tier" and "premium-heavy" plans, and reference specific insurers' tiered plan families.

Mapping that to Basic / Basic Enhanced / Enhanced is plausible but **no source states the mapping**, so this page is left as it is. Two open questions for the owner:
1. Are the CRM's plan-preference tiers the same thing as the three tiers above, or a separate axis (as [[Network tiers]] is separate)?
2. Which insurer plan families correspond to the entry / mid-range / top ladder the sales desk actually quotes from?

Related: [[IMCRM]], [[Daily sales audit]], [[Customer objections]].

## The tiers are confirmed by the raw chat exports
The scripted intro in [[Batch intro messaging]] names the same three tiers in the same order, in plain customer language:
- **Basic Plan** - clinic coverage only (outpatient)
- **Basic Enhance Plan** - clinic coverage + direct access to specialists (outpatient)
- **Enhance Plan** - complete coverage: clinics + hospitals (outpatient) + international plans

So the vocabulary is confirmed; only the prices are contested (below).

## Flag: two sources give different starting prices for the same plan names
The raw chat export of early June 2026 quotes these starting prices, and they **do not match** the table above.

| Tier | Plan | Chat export (AED) | This page (AED, incl. VAT) |
|---|---|---|---|
| Basic | Takaful Emarat APN (Aafiya) | 998 excl. / 1,086.75 incl. | - |
| Basic | Takaful Emarat E Care Blue 1 | 930 (catalogue) / - | 1,128.75 |
| Basic Enhanced | HAYAH Care Protect RN3 B | 1,193 excl. / 1,291.50 incl. | 1,461.60 |
| Enhanced | Takaful Emarat Essential | 1,800 excl. / 1,928.85 incl. | 2,417.10 |
| Enhanced | Dubai Insurance Remnto N4 Value (Dubai Care) | 1,757 excl. / 1,883.70 incl. | - |

Family-plan starting prices in the same message: Basic 6,677, Basic Enhanced 8,342, Enhanced 11,190 (Takaful Emarat Essential) or 12,300 (Dubai Insurance Dubai Care N4); VAT-inclusive 7,166.25 / 8,914.50 / 11,904.90 / 13,070.40.

**Not resolved.** Both sets are June 2026 and both say "starting from", so the difference is either a price revision between captures, a different plan version under the same name, or a different basis (individual vs entry-level catalogue price). The CRM platform catalogue lists Takaful Emarat Essential at **AED 1,099** - a third figure - which suggests the catalogue price and the "starting from" quoted price are different numbers for the same plan. See [[Steps to get client data from IMCRM]], [[Insurance plan catalogue]].

**A naming artefact to watch:** one intro names "Dubai Insurance - Remnto N4 Value (Dubai Care Remnto)" and uses the word **Remnto** twice in the same line, where the older vault vocabulary uses **Dubai Care N4**. The CRM catalogue lists the plan as **Dubai Care N4**. This looks like a template substitution, not a new plan family.

## The platform catalogue, by price
The 376-plan catalogue on the CRM platform starts with 15 **entry-level** plans, AED 930 to AED 1,183, across 8 networks. Full list on [[Insurance plan catalogue]]; network mapping on [[Network tiers]].

## Other price points observed in the calls
| Item | Amount (AED) | Context |
|---|---|---|
| Upgrade from 20% to 0% co-pay | 700 extra | Break-even at about 3 visits of 270-300 each |
| Typical 20%-co-pay visit | 270-300 | Consultation + 2 tests + medicine |
| Consultation co-pay cap | 50 | On a 350 consultation |
| Per-head group cover | 600 / 672 / 740 / 940 | By salary band and network |
| Annual dental limit | 3,500 | Major dental sits outside the dental line |
| Two-person quote, 0% co-pay | 7,666 | - |
| Family of three, group plan | 8,223 | Direct hospital access |
| Renewal premium, one case | 1,245 to 2,290.29 | Age brackets after a second, younger member was added |
| Group-claim example | ~2,000 | The gap the customer would not pay for 10 minutes of approval speed |

Source: [[Call transcriptions]], [[Explaining co-pay and plan terms]], [[Handling the price objection]].

## The co-pay choice is a third axis, not a fourth tier
The tier says *what is covered*; the co-pay option says *what the customer pays per visit*, and the plan sheet offers 0% / 10% / 20% "as per chosen outpatient co-pay". A tier can be quoted at several co-pay levels - the quote URL carries a separate `selectedCopayId` for exactly this. See [[Explaining co-pay and plan terms]], [[Quote request handling]].

## The three tiers appear in a third channel too (2026-10-22 ingest)
A captured batch of **12 lead intro emails** in the workspace uses the same ladder in the same order with the same one-line descriptions as the WhatsApp intro - Basic (clinic coverage only, outpatient), Basic Enhanced (clinic coverage + direct access to specialists, outpatient), Enhanced (complete coverage: clinics + hospitals outpatient, plus international plans). Source: [[Lead intro email batch]].

That is worth recording because it removes the "the tiers are only a WhatsApp script" doubt: the same three tiers travel in **email and WhatsApp**, which makes the ladder a house vocabulary rather than one channel's wording. It also confirms that the email tier copy **contains no prices** - the tiers are named and described, and the quote comes after the two qualifying questions.

## Which plans count as entry level is a separate decision (2026-10-22 ingest)
The extraction plan of 2026-05-22 defines an **entry-level set of four plans by name** - Takaful Emarat APN, Silver and Essential, plus [[Dubai Insurance]]'s Remento N4. Those names do not map one-to-one onto the Basic / Basic Enhanced / Enhanced ladder: APN, Silver and Essential are three *plans* from one insurer, and the tier they belong to is not stated. See [[Entry level plans]], [[Basic plan filter]].

So the vault now holds **three different "entry level" selectors**: the three-tier customer ladder, the CRM catalogue's entry-level flag (15 plans, AED 930-1,183), and the four named plans in the extraction plan. None of the ingested sources states how they relate.

## Cross-source note: lead and renewal files (2026-10-22)
Only 5 of 169 individual lead files carry a numeric total (1 in the AED 1-3k band, 2 in 3-6k, 1 in 6-12k, 1 above 12k); the 20 renewal records skew lower, with last-year premiums under AED 2k for 8, 2-4k for 4, 4-8k for 5 and over 15k for 2. A few files record clients choosing a basic plan without declaring a condition. No file labels a plan "Basic Enhanced"/"Enhanced", so the tier names here are not confirmed by the lead files. See [[Individual health insurance leads folder]], [[Health renewals leads folder]].

## A second, earlier price snapshot (work_os, 2026-10-22 ingest)
The work_os design set carries its own **priced catalogue tables**, copied from the CRM in early 2026 - 32 Basic plans, 27 Basic Enhanced and 19 Enhanced, each with network, co-pay and VAT:

| Tier | Count | From (AED) | To (AED) |
|---|---|---|---|
| Basic, clinic only | 32 | ~1,163 | ~2,314 |
| Basic Enhanced | 27 | ~1,635 | ~3,302 |
| Enhanced | 19 | ~1,499 | ~4,164 |

Two things this adds to the page above:
- **A third ladder.** The work_os structure is four tiers - Basic, Basic Enhanced, **Enhanced Levels 1-6**, **International** - where the level number counts hospitals (1 entry, 2 more, 3 premium, 4 top-tier, 5-6 maximum). See [[Plan tiers and variables]]. The design's own code names only three tiers, and the expert prompt uses a fourth set (Basic, Silver, Gold, Platinum). See [[Health Insurance Expert System Prompt]].
- **Tier labels are not stable between snapshots.** Takaful Emarat Essential appears in *both* the Basic and the Enhanced table of that same catalogue, at different prices, and the Enhanced starting point there (1,499) is well below the June 2026 figure of 2,417.10 on this page. Compare [[Insurance plan catalogue]] and [[UAE Health Insurance Plan Structure and Pricing]].

The work_os tables are catalogue data, not client data. The design set that carries them never got past stubs, so treat them as a **snapshot from early 2026**, not a live price list. See Planning document.
