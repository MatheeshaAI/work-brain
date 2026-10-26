---
type: entity
sources: ["raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Multi_Agent_Design.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/MEDNET_Provider_Schema.md"]
updated: 2026-10-22
tags: [tpa, insurance]
summary: "A TPA with a specialist agent in TPA Network Lookup Agents."
---
# Mednet

A TPA with a specialist agent in [[TPA Network Lookup Agents]]. Source: [[YOUR MULTI-AGENT TEAM STRUCTURE]].

**Specialty:** premium and expat clients, wide hospital coverage.

**8 networks** (see [[Network tiers]]):
- Gold: premium tier
- Silver Premium: mid-high tier
- Silver Classic: mid tier
- Green: economy tier
- Emerald: specialized tier
- Pearl: specialized tier
- Silk Road OP: outpatient only
- Silk Road IP: inpatient only

**In the examples:** American Hospital Dubai is in Gold, Silver Premium and Silver Classic; Burjeel Hospital Abu Dhabi is in Gold, Silver Premium and Silver Classic. Example prices (illustrative): Gold AED 3,500, Silver Premium AED 2,600, Silver Classic AED 2,200 a year.

Compare: [[Dubai Care]], [[NAS]], [[Nextcare]].

See also (added): [[Network plan code list (NAS_CN)]] for the plan codes of this network.

Provider-list data shape: [[MEDNET provider list schema]].

## Three different network counts (work_os, 2026-10-22 ingest)
Mednet is the network where the reference lists disagree most:
- **7** - the work_os TPA list (Gold, Silver Premium, Silver Classic, Emerald, Pearl, Silk Road IP, Silk Road OP). No Green. Source: [[TPAs and Networks Reference (Work OS)]].
- **8** - the multi-agent design, which adds **Green**. Source: [[YOUR MULTI-AGENT TEAM STRUCTURE]].
- **12** - the live provider panel `Mednet-Network-May.csv`, whose insurance columns are Gold, Silver Premium, Silver Classic, Green, Silk Road OP, Silk Road IP, Emerald, Pearl, **EBP OP, EBP IP, Basic OP, Basic IP** (plus Dental, Optical and Alternative, which the search tooling excludes from insurance answers).
- The JSON schema in the work_os set names only **seven** columns (Gold, Green, Pearl, Silver Classic, Silver Premium, Silk Road OP, Silk Road IP) - it omits Emerald as well as EBP and Basic. See [[MEDNET provider list schema]].

So EBP and Basic are missing from every design list but present in the data, and Green is missing from one. For "is this hospital covered", the provider panel is the only list to use. See [[TPA and network reference]].
