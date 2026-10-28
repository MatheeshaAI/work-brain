---
type: concept
sources: ["raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md", "raw/work_os system designing documents/00_ORIGINALS/TPA's & Networks.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Multi_Agent_Design.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/TPA Multi-Agent Insurance Network System.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/MEDNET_Provider_Schema.md"]
updated: 2026-10-22
tags: [tpa, insurance, network, reference, method]
summary: "Which TPA and network list to trust when the sources disagree - 8 TPAs, 40 networks, and counts that differ between every list."
---
# TPA and network reference

The vault holds **five different TPA/network lists** and they do not agree on the counts. This page is the map of them and the rule for picking one. The tier ranking itself is on [[Network tiers]]; the provider-list data shapes are on [[MEDNET provider list schema]] and [[Network database design]].

## The five lists

| # | List | What it is | Where |
|---|---|---|---|
| 1 | **Work OS TPA list** | 8 TPAs, 40 networks, in a table with a "strength" and "best area" column per TPA | [[TPAs and Networks Reference (Work OS)]] |
| 2 | **Multi-agent design lists** | The same 8 TPAs with different counts and more granular tiers | [[YOUR MULTI-AGENT TEAM STRUCTURE]] |
| 3 | **Four specialist agents** | A design for a lookup agent per TPA, with the query types each must answer | [[TPA Network Lookup Agents]] |
| 4 | **CRM catalogue** | The 8 networks that actually appear on plans the desk sells | [[Insurance plan catalogue]], [[Network tiers]] |
| 5 | **Provider panels** | The real hospital lists, one file per network | the facility-search tooling; see below |

## List 1: the Work OS TPA list
Eight TPAs - **NAS, MEDNET, NEXTCARE, DUBAICARE, ADNIC, SUKOON, ECARE, AAFIYA** - and forty networks between them. Each TPA gets a strength and a best-area note: NAS → Abu Dhabi, MEDNET → UAE-wide, NEXTCARE → Dubai, DUBAICARE → Dubai, ADNIC → Abu Dhabi, SUKOON → regional, ECARE → budget options in the northern emirates, AAFIYA → various.

The same file carries the JSON template for a network database - provider records with coverage flags per network - which is the design behind [[Network database design]] and [[Finding a hospital in a network]].

A shorter, stripped copy of the same lists (67 lines, no table, no template) sits in `00_ORIGINALS` as "TPA's & Networks". The two are **not** byte-identical, unlike most of the work_os folder - see Work OS duplication map.

## List 5: the provider panels are the authority for facilities
This is where the actual hospitals live, one file per network, read by the facility-search tooling:
- **Mednet** - a "Full Network List" CSV and a May list, `Mednet-Network-May.csv` (latin1-encoded). The May list carries **twelve insurance network columns**: Gold, Silver Premium, Silver Classic, Green, Silk Road OP, Silk Road IP, Emerald, Pearl, EBP OP, EBP IP, Basic OP, Basic IP - plus Dental, Optical and Alternative, which the tooling deliberately excludes from insurance answers.
- **NextCare** - six workbooks, one per network.
- **Aafiya, Dubai Care, Ecare, NAS** - one CSV each.

These files are spreadsheets, not notes: they are mentioned by name and not ingested.

## Where the counts disagree
| TPA | Work OS list | Multi-agent design | Provider panel |
|---|---|---|---|
| Mednet | 7 | 8 | **12 insurance networks** |
| Dubai Care | 6 | 7 (N5 split into OP and IP) | - |
| NAS | 5 | 6 | - |

And the Mednet **JSON schema** in the work_os set names only seven network columns (Gold, Green, Pearl, Silver Classic, Silver Premium, Silk Road OP, Silk Road IP) - it omits Emerald, EBP OP/IP and Basic OP/IP from the live CSV. So the schema is a merged, narrower view; the CSV is wider.

Two other lists that look like network lists but are not:
- `05_CODE/config.py`'s `NETWORK_PROVIDERS` holds eight **insurer** names, not networks - see [[Network tiers]].
- The CRM catalogue's eight networks are the selling ones, and they are **not the same eight as the eight TPAs**: the catalogue has E Care Blue and no ADNIC.

## Which list to trust, for which question
- **"Is this hospital covered?"** → the provider panel for that network (list 5). Always. Never the tier table.
- **"Which plan should I quote?"** → the CRM catalogue (list 4), because it is what the desk sells. See [[Insurance plan catalogue]].
- **"How many networks does this TPA have?"** → say what the source says and name the source. The counts are design-set artefacts, not TPA publications, and three of them disagree.
- **"What tier is this?"** → [[Network tiers]], remembering the tier labels are the note's own, not official TPA definitions.

## Why the lists disagree
The design files were written by an AI in January-February 2026 from general knowledge, then extended by hand. The provider panels are the only lists produced from data. That difference is worth remembering when quoting a network count to a client.

## One more distinction to keep straight
A **TPA operates the network**; an **insurer underwrites the plan**. The two roles sit on the same line of a quotation sheet, which is why "Dubai Care N4" and "Dubai Insurance - Remnto N4" can be the same product seen from two sides. See [[Dubai Insurance]], [[Dubai Care]] and [[Network tiers]].

Related: [[Network tiers]], [[Network lookups]], [[Finding a hospital in a network]], [[Network database design]], [[MEDNET provider list schema]], [[TPA Network Lookup Agents]], [[Insurance plan catalogue]], Work OS duplication map.
