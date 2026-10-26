---
type: concept
sources: ["raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/10_Work-Insurance/Call transcriptions.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/TPA Multi-Agent Insurance Network System.md", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [insurance, tpa]
summary: "How TPA hospital networks are ranked, which eight networks actually sell in 2026, and how a network appears to the customer on a quotation."
---
# Network tiers

How the TPA hospital networks are ranked in [[YOUR MULTI-AGENT TEAM STRUCTURE]]. Each TPA has several networks, from premium (widest hospital list, highest price) to budget. Some networks are split by type of care: **OP** is outpatient only and **IP** is inpatient only.

| Tier | [[Mednet]] | [[Dubai Care]] | [[NAS]] | [[Nextcare]] |
|---|---|---|---|---|
| Premium | Gold | N1 | Comprehensive | GN+ |
| High / mid-high | Silver Premium | Exclusive N2, N2 | | GN |
| Mid | Silver Classic | N3 | General | GN Limited |
| Economy | Green | N4 | Restricted | RN |
| Budget | | | Super-Restricted, Value | RN2, RN3 |
| Specialized | Emerald, Pearl | | | |
| Labor / basic | | | Workers | |
| Outpatient only | Silk Road OP | N5 OP | | |
| Inpatient only | Silk Road IP | N5 IP | | |

Tiers are the note's own labels, not official TPA definitions. Prices in the examples are illustrative.

## The networks that actually sell, in 2026
The CRM platform's own catalogue names the network on every plan line. From the first 60 entry-level plans captured on 07-Jun-2026, **eight networks** appear:

| Network | Insurers writing on it in the sample |
|---|---|
| **Dubai Care** | Dubai Insurance |
| **E Care Blue** | Takaful Emarat |
| **Aafiya** | Takaful Emarat |
| **Ecare** | Dubai Insurance |
| **Nextcare** | Fidelity United, HAYAH, Takaful Emarat |
| **NAS** | Abu Dhabi National Takaful |
| **Mednet** | Takaful Emarat, Adamjee, NLGIC, Abu Dhabi National Takaful |
| **Sukoon** | Oman Insurance |

Twelve insurers write on those eight networks. This is the same set the vault's provider-lookup skills cover - [[Mednet]], [[NAS]], [[Nextcare]], [[Dubai Care]], [[Takaful Emarat]], [[Adamjee]] - which confirms the network list and the plan catalogue are two views of one thing. See [[Insurance plan catalogue]], [[Network database design]].

## How the network appears to the customer
**A network is named on the quotation sheet, and the sheet can look identical between two insurers.** The customer sees "Dubai Care N4" or "Pearl" or "Next N5" on a line and cannot tell which company operates it. That is why the sales advice on the calls is to compare **operator and service**, not benefits - see [[Handling the price objection]].

Three customer-facing consequences:
1. **A named hospital can rule a plan out.** A chat shows a customer asking for a specific hospital and an alternative plan sent because the chosen one did not include that facility. Network fit is checked before price. See [[Quote request handling]].
2. **The co-pay is a network-plan attribute, not an insurer attribute** - 20% max AED 50 on consultation is the standard line on every quoted plan regardless of who wrote it. See [[Explaining co-pay and plan terms]].
3. **The plan name on the sheet is the network name**, which is exactly why the intro's Enhanced tier can quote "Takaful Emarat Essential" and the catalogue lists the same plan as "Takaful Emarat - Essential (Entry Level, AAFIYA)" - the Aafiya in brackets is the network, and Takaful Emarat is the insurer. The vault's [[Network tiers]] axis and the [[Plan price tiers]] axis are orthogonal: a tier is a package, a network is a hospital list, and an insurer writes both.

## The workspace's own filter confuses network with plan (2026-10-22 ingest)
The IMCRM extension's basic-plans filter keys on **network strings**: include `E CARE BLUE`, `E CARE`, `AAFIYA (APN)`; exclude Fidelity, Takaful Emarat, Essential, Dubai Care; then keep the **2 cheapest plans per provider**. Source: [[IMCRM extension memory note]], [[Basic plan filter]].

Three problems with reading that as a tier rule:
1. **Some of the include values are not network labels.** `E Care Blue` and `AAFIYA (APN)` are used in the CRM as *plan* names (Takaful Emarat's E Care Blue 1 and its APN plan). A string that is both a network label and a plan name cannot sort a table by tier.
2. **The exclusion list excludes insurers that appear in the include list.** "Takaful Emarat" and "Essential" are excluded by name, yet `AAFIYA (APN)` is exactly Takaful Emarat's APN plan. Both rules cannot be applied literally to the same table.
3. **"Cheapest per provider" is a price rule, not a tier rule** - and the network label does not determine the tier, only the hospital list.

The 2026-05-22 extraction plan changes the key from network to **plan name** precisely to avoid this, which is why the two rules appear in the vault together and disagree. See [[Entry level plans]], [[Aafiya]], [[Ecare]].

## Additional plan-code lists (added)
[[Network plan code list (NAS_CN)]] adds insurer ladders that are not TPA networks: [[ADNIC]] (Platinum, Gold, Silver, Bronze) and [[Sukoon Insurance]] (Premium, Edge, Signature, Advance, Vital). The Mednet provider columns are in [[MEDNET provider list schema]].

## Network count discrepancies (work_os)
The work_os design note for the TPA agents gives Mednet 8 networks, Dubai Care 7 (N5 split into OP and IP) and NAS 6, while the work_os TPA list gives Mednet 7, Dubai Care 6 and NAS 5 (CN, GN, RN, SRN, WN). This page's table uses the 8/7/6/6 split; see [[TPAs and Networks Reference (Work OS)]].

**And a third count, from the data.** The Mednet provider panel that the facility-search tooling actually reads carries **twelve** insurance network columns - Gold, Silver Premium, Silver Classic, Green, Silk Road OP/IP, Emerald, Pearl, **EBP OP, EBP IP, Basic OP, Basic IP** - so EBP and Basic are missing from every design list but present in the panel. The JSON schema in the same design set names only seven of the twelve (it omits Emerald too). The Nextcare lists are the one place the two design lists agree - six networks either way.

The decision rule and the full map of which list to trust are on [[TPA and network reference]]. See also [[Mednet]], [[NAS]], [[Dubai Care]], [[Nextcare]].

## A wrong network list in the saved code (2026-10-22 ingest)
The Python settings module in the work_os folder has a constant named `NETWORK_PROVIDERS` holding eight names: Nextcare, GIG, Oman Insurance, Daman, AXA, Cigna, MetLife, Allianz. **These are not the eight networks.** Only Nextcare is one. Oman Insurance is the old name for Sukoon and AXA the old name for GIG, so two are legacy insurer names; Daman, Cigna, MetLife and Allianz are insurers, not networks. The same file's `HOSPITAL_NETWORKS` constant holds hospital groups instead (HealthHub, Aster, Mediclinic, American Hospital Dubai, Medeor, NMC, Burjeel, Al Zahra, Saudi German Hospital) - the right kind of data in the wrong slot.

Practical consequence: any matcher built on that constant would plan-match against insurer names and miss most of the real networks listed in [[TPAs and Networks Reference (Work OS)]]. The eight TPAs in that work_os list are NAS, Mednet, Nextcare, Dubai Care, ADNIC, Sukoon, Ecare and Aafiya - a slightly different set from this page's CRM-captured eight above, which includes E Care Blue and no ADNIC. Two eight-network lists, same job, different vantage points.

Source: [[Health Insurance Sales Agent Python Code]].
