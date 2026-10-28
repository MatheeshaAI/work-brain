---
type: source
sources: ["raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md", "raw/work_os system designing documents/00_ORIGINALS/TPA's & Networks.md", "raw/work_os system designing documents/00_ORIGINALS/Network Database Design.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/TPA Multi-Agent Insurance Network System.md"]
updated: 2026-10-22
tags: [tpa, networks, database-design, multi-agent, json-schema]
summary: "Eight TPAs and their network names, the empty TPA-network-emirate JSON template for hospital lookup, and the router-plus-four-specialists design with four query types."
---
# Source: TPAs and Networks Reference (Work OS)

Four related documents that together define the **reference data and agent design for network lookups**. The work_os copies overlap with raw notes already summarised ([[TPA's and Their Networks with Structure]], [[Network database design]], [[YOUR MULTI-AGENT TEAM STRUCTURE]], [[TPA Network Lookup Agents]]); this page records what differs.

## 1. TPA and network list (TPA's & Networks, TPAs_and_Networks)
Eight TPAs with their networks:
| TPA | Networks | Strength per the overview table |
|---|---|---|
| [[NAS]] | CN, GN, RN, SRN, WN (5) | strong, Abu Dhabi |
| [[Mednet]] | Gold, Silver Premium, Silver Classic, Emerald, Pearl, Silk Road IP, Silk Road OP (7) | wide, UAE-wide |
| [[Nextcare]] | GN+, GN, GN Limited, RN, RN2, RN3 (6) | wide, Dubai |
| [[Dubai Care]] | N1, Exclusive N2, N2, N3, N4, N5 (6) | Dubai-focused |
| [[Abu Dhabi National Insurance Company]] (stub) | Platinum, Gold, Silver, Bronze (4) | Abu Dhabi focus |
| [[Sukoon Insurance]] (stub) | Premium, Edge, Signature + Medcare, Signature, Advance, Vital (6) | regional |
| [[Ecare]] | Classic, Green, Blue (3) | budget, Northern Emirates |
| [[Aafiya]] | APN Plus, APN, Essential (3) | various |

## 2. Network Database Design (JSON template)
A "ready-to-use" nested JSON: `TPAs[] -> networks[] -> emirates{7} -> {hospitals[], clinics[]}`. The seven emirates are Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain. Only NAS and MEDNET are expanded (names like `NAS_CN`, `MEDNET_SILVER PREMIUM`, `MEDNET_SILK ROAD_IP`); the other six TPAs "follow the same pattern". All arrays are **empty**: facility names are still to be added (the source file also ends mid-sentence, truncated). `TPAs_and_Networks.md` carries the same template with underscores normalised and points to the field-level MEDNET provider schema ([[MEDNET provider list schema]]).

## 3. TPA Multi-Agent Insurance Network System
Architecture: user question, a TPA orchestrator, a router agent that decides which TPA agent(s) to activate, four specialists ([[Mednet]], [[Dubai Care]], [[NAS]], [[Nextcare]]), consolidated answer. Query types: hospital-to-network, network-to-hospitals, multi-hospital matching ("which plan covers these three hospitals"), reverse lookup ("which plans cover this hospital"), and complex multi-criteria ("family of 4, AED 10,000 budget, needs two named hospitals").

## Contradictions and gaps (flag)
- **Network counts disagree.** The multi-agent doc says MEDNET has **8** networks (Gold, Silver Premium, Silver Classic, Green, Emerald, Pearl, Silk Road OP, Silk Road IP) while the TPA list says **7** (no Green); MEDNET's own schema has a Green column, so the 7-list is missing Green. Dubai Care is 7 in the agent doc (N5 split into OP and IP) versus 6 in the list (single N5). NAS is 6 in the agent doc (Comprehensive, General, Restricted, Super-Restricted, Workers, Value) versus 5 acronym networks in the list (CN, GN, RN, SRN, WN); the acronyms probably map to the first five names, and "Value" has no counterpart. See [[Network tiers]] for the reconciled table used elsewhere.
- Strength labels ("Dubai", "Abu Dhabi", "Northern Emirates") are generalisations, not verified coverage.
- Nothing in these four notes actually lists hospitals; the data lives in the network lists (for example [[Dubaicare-Hospitals-Dubai]] and the NAS network files in raw) and facility-search tools.
- Status: design and an empty template; no implementation.

Related: [[Finding a hospital in a network]], Router agent, Specialist agents, [[Work OS Master Index]].
