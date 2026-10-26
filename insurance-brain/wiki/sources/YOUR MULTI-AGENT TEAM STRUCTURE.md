---
type: source
sources: ["raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/work_os system designing documents/00_ORIGINALS/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Multi_Agent_Design.md"]
updated: 2026-10-22
tags: [agents, insurance, tpa, multi-agent]
summary: "Original note: YOUR MULTI-AGENT TEAM STRUCTURE."
---
# Source: YOUR MULTI-AGENT TEAM STRUCTURE

Original note: [[raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE|YOUR MULTI-AGENT TEAM STRUCTURE]]. A design for answering hospital and network questions across four insurance TPAs with a router plus specialist agents. It is the basis of [[TPA Network Lookup Agents]].

## The concept
Specialized AI agents, each an expert in one TPA's networks and rules. The note's reasoning: every TPA has different networks, claim processes and hospital lists, so one generalist agent is "slow, confused", while four specialists give "instant, accurate answers". See [[Specialist agents]] and [[Multi-agent systems]].

## Architecture
User question -> [[Router agent]] decides which TPA agent to activate -> one of the four agents ([[Mednet]], [[Dubai Care]], [[NAS]], [[Nextcare]]) -> response to the user. For broad questions the router fans out to all four ([[Parallel agent search]]).

## The four agents (27 networks in total)
- **[[Mednet]] specialist (8 networks):** Gold, Silver Premium, Silver Classic, Green, Emerald, Pearl, Silk Road OP, Silk Road IP. Specialty: premium and expat clients, wide hospital coverage.
- **[[Dubai Care]] specialist (7 networks):** N1, Exclusive N2, N2, N3, N4, N5 OP, N5 IP. Specialty: Dubai-focused plans, government and corporate contracts.
- **[[NAS]] specialist (6 networks):** Comprehensive, General, Restricted, Super-Restricted, Workers, Value. Specialty: budget plans, SME groups, labor insurance.
- **[[Nextcare]] specialist (6 networks):** GN+, GN, GN Limited, RN, RN2, RN3. Specialty: flexible plans, customizable coverage.
Tier labels (premium to budget, outpatient and inpatient) are summarized in [[Network tiers]].

## Five worked scenarios
1. **Hospital to network.** "Is American Hospital Dubai covered in MEDNET Silver Premium?" The router picks the Mednet agent, which finds the hospital in Gold, Silver Premium and Silver Classic and answers yes, listing where else it is covered and where it is not (Green, Emerald, Pearl, Silk Road).
2. **Several hospitals at once.** Mediclinic Parkview, Aster and NMC Royal. The router sends the question to all four agents. Examples of results: all three in Mednet Gold and Silver Premium, Dubai Care N1, NAS Comprehensive and Nextcare GN+; only two of three in Dubai Care N2 (NMC missing). The router merges and ranks by price (budget, mid-range, premium).
3. **Network to hospital list.** "What hospitals are in Dubai Care N3 in Dubai?" Routed to the Dubai Care agent, which returns 47 hospitals grouped as top hospitals, major private hospitals and specialty clinics, with an area breakdown (Deira 12, Bur Dubai 8, Jumeirah 6, Business Bay 5, others 16).
4. **Reverse lookup.** "Which plans cover Burjeel Hospital Abu Dhabi?" All four agents search. Mednet, NAS and Nextcare cover it; Dubai Care does not ("focus on Dubai hospitals only"). The router presents options by TPA and names a cheapest and a widest-coverage plan.
5. **Complex multi-criteria.** A family of four wants Cleveland Clinic, Mediclinic Parkview and Saudi German Hospital under AED 10,000 a year. The router extracts the requirements, adds a budget filter, each agent finds networks covering all three hospitals and computes the family cost (2 adults and 2 children), and the router ranks them and recommends the cheapest, with an offer to send a quote.

## Why the note says this wins
Compared with a single agent searching all 27 networks one after another (slow, generic, mixes up TPAs, no cross-comparison, poor filtering), the multi-agent version is fast (parallel), expert, accurate (no cross-TPA confusion), good at "plans covering hospitals X, Y, Z", can compare prices, and scales by adding an agent per new TPA.

## Caveats and open items
- **Prices are probably illustrative.** The AED figures (for example NAS Comprehensive AED 1,800 a year, Mednet Gold AED 3,500) appear only inside example answers and are not tied to a quote source.
- **Incomplete note.** The heading is "PART 4", so earlier parts are missing, and some agent sections are run together in the text.
- **Tier inconsistency.** Scenario 2 labels NAS Comprehensive a "budget option" while the agent list calls it the premium tier of NAS.
- **Coverage gap (not from this note).** The vault owner's tooling also covers other TPAs such as Aafiya and Ecare, which this design does not include.

Related: [[TPA Network Lookup Agents]], [[Router agent]], [[Specialist agents]], [[Parallel agent search]], [[Network tiers]], [[Multi-agent systems]].

## Also stored in work_os
Stored twice in the work_os folder: `00_ORIGINALS/YOUR MULTI-AGENT TEAM STRUCTURE.md` and, renamed, `02_SYSTEM_DESIGN/Multi_Agent_Design.md` (identical). The Master Index lists it as 'Multi-agent TPA specialist design'. A shorter companion in the same folder, `02_SYSTEM_DESIGN/TPA Multi-Agent Insurance Network System.md`, has different network counts (MEDNET 8, Dubai Care 7, NAS 6, Nextcare 6); the discrepancies are recorded in [[TPAs and Networks Reference (Work OS)]].
