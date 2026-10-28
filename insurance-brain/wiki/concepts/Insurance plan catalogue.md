---
type: concept
sources: ["raw/10_Work-Insurance/Insurance Plans - By Category.md", "raw/10_Work-Insurance/Health Insurance plan categoris.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md"]
updated: 2026-10-22
tags: [insurance, plans, catalogue, categories, pricing]
summary: "Insurance plan catalogue structure: categories, networks, pricing patterns"
---
# Insurance plan catalogue

Structure of health insurance plan catalogue from [[Insurance Plans — Sorted by Category]] and [[Health Insurance plan categoris]].

## Categories (as tracked)
- **Basic Plans** - Entry level, various networks (DUBAI CARE N5 variants, ECARE Blue/Classic, NEXTCARE, NAS, AAFIYA). Lower premiums, more restricted networks.
- **Basic Enhance Plans** - Entry level/good, often NEXTCARE RN3, MEDNET Silk Road, NAS workers plans. Mid-tier between basic and enhance.
- **Enhance Plans** - Good/entry level, MEDNET Pearl/Emerald, DUBAI CARE N4 variants, AAFIYA APN+, NAS Opal. Higher premiums, broader networks.

## Networks represented
DUBAI CARE, ECARE, NEXTCARE, NAS, MEDNET, AAFIYA, orient takaful, RAK NAS, Hayah Mednet etc. Maps to [[Network tiers]].

## Pricing patterns (from plan categoris)
Basic plans range roughly 1,163-2,468 AED (varies by network/tier). Basic Enhance 1,634-3,302 AED. Enhance plans 1,499-4,164+ AED. Copays typically 20% (often max AED 25-50 per consultation), diagnostics/medicines 10-30% depending on plan.

## How plans are stored
Tracked in spreadsheets/lists with: Provider, Plan Name, Plan Type/Level, Network Provider/Network, copay structure, pricing. Connected to [[Plan price tiers]] concept and [[Customer categories]].

## Related

- [[Plan price tiers]]
- [[Customer categories]]
- [[Network tiers]]
- Insurance Sales Platform
- [[TPA's and Their Networks with Structure]]
- [[Mednet]], [[Dubai Care]], [[NAS]], [[Nextcare]]

## A second catalogue is being built in the workspace (2026-10-22 ingest)
The in-place workspace carries its own plan library under `Workspace/Plans/`: one markdown file per insurer (Takaful Emarat, Dubai Insurance, HAYAH, BUPA, Cigna, Adamjee, Orient, QIC, Max Health, Daman, NLGIC Liva, Abu Dhabi National, Watania and others) plus `All-Plans-List.md`, `Plans.md`, `Entry Level Plan.md` and `April-Hayah.md`. A separate `Workspace/Knowledge Base/` holds underwriting notes (`General-Underwriting.md`, `Dubai-Insurance.md`, `Takaful-Emarat.md`) and an `INDEX.md`.

**That library has since been ingested** - see [[Insurance plan sheets]] for the per-insurer sheets, [[Plan sheet format]] for the eight-column layout, [[Plan catalogue raw exports]] for the two raw dumps, and [[Entry Level Plan guide]] for the entry-level guide.

The other new element is the **extension's own plan extraction**, which reads the catalogue live off the CRM quote page rather than reading a file: it walks the plans table for provider, plan name, plan type, network, co-pay and price, and applies the basic filter to get a shortlist. See [[Basic plan filter]], [[IMCRM Data Extractor]].

## More extracts (added)
Partial extracts and price listings: [[Insurance Plans pages 76-90 of 443]] (plan type, network, category per plan) and [[IMCRM health detail plan price dump]] (visibility flag, co-pay and price figures). Network and plan code names: [[Network plan code list (NAS_CN)]].

## The library, measured (2026-10-22 ingest)
The workspace plan library has **25 files** and **418 data rows** across **22 insurers**, and it is the biggest catalogue in the vault by a wide margin:

| Measure | Value |
|---|---|
| Rows in `Plans.md` | **418** |
| Insurers | **22** |
| Networks named | **21 distinct labels** for 12 actual networks |
| Tier mix | Best 216, Good 125, Entry Level 77 |
| Price range | AED **1,114 - 102,498** before VAT |
| Biggest insurer | [[Dubai Insurance]] 64 plans |
| Smallest | [[Max Health Insurance]] 3 plans |

`Plans.md` is the master table itself - see [[Plans Master List]] for the fixed-width Markdown copy and [[Plans Table 418 Plans]] for the sales-report export of the same 418 rows.

Three things follow, and they are the reason the library needs an owner:

- **The networks are over-counted.** `DUBAI CARE` and `DUBAI CARE (Remnto)`, `E CARE BLUE` and `ECARE`, `NAS` and `RAK NAS`, `Qatar Insurance Company` and `QIC MEDNET` are **six pairs of the same network written two ways**. Counting distinct labels gives 21 networks where there are 12.
- **The catalogue's own summary file disagrees with it.** `All-Plans-List.md` reports **91 plans across 7 networks** and describes the library as "100+ plans, 8 networks" - against 418 rows, 22 insurers and 12 networks. See [[Insurance plan sheets]].
- **Tier labels are the CRM's, not the desk's.** Best / Good / Entry Level are the three values in the catalogue's Plan Type column and they come straight from the CRM's plan-type field - see [[Plan sheet format]] and [[Plan sheet format]].

**Where the catalogue ends and the CRM begins.** The library is the broker's own copy of what the CRM can quote; the CRM is where a price for a *specific member* is computed. The bridge between them is a dump of 197 plan records with one member's premium breakdown attached - see [[Recovered WhatsApp scripts]] and [[IMCRM health detail plan price dump]].
