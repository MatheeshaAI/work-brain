---
type: project
sources: ["raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/TPA Multi-Agent Insurance Network System.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Multi_Agent_Design.md"]
updated: 2026-10-22
tags: [agents, insurance, tpa]
status: design
summary: "**Goal.** Answer customer questions such as 'is hospital X in network Y?' and 'which plan covers hospitals A, B and C wi"
---
# TPA Network Lookup Agents

**Goal.** Answer customer questions such as "is hospital X in network Y?" and "which plan covers hospitals A, B and C within my budget?" by using one specialist agent per TPA behind a router. Source: [[YOUR MULTI-AGENT TEAM STRUCTURE]].

**Status.** Design. The note describes behavior and example answers; it does not show an implementation.

## Parts
- Router agent: reads the question, picks one agent or all.
- Four specialists: [[Mednet]] (8 networks), [[Dubai Care]] (7), [[NAS]] (6), [[Nextcare]] (6).
- Each specialist queries its own hospital and network database.
- Results are merged and ranked by price by the router.

## Question types it must handle
1. Hospital to network (one TPA).
2. Several hospitals, find plans covering all (all TPAs).
3. Network to hospital list, with area breakdown (one TPA).
4. Reverse lookup, hospital to all plans (all TPAs).
5. Multi-criteria with budget and family size (all TPAs plus a budget filter).

## Design properties claimed
Fast via Parallel agent search, accurate because each agent only knows its own TPA (Specialist agents), easy to extend by adding an agent.

## Open questions
- Where the real hospital and price data comes from (prices in the note look illustrative).
- Adding the remaining TPAs the owner works with (for example Aafiya and Ecare) is not covered in the note.
- Related tooling that exists outside this note, not described by it: the vault owner's `mednet-search` and `Network-Search-CLI` projects (in the Home folder) deal with network lookups.

See also: Multi-agent systems, [[Network tiers]], [[Health Insurance subagent guide]] (the same one-specialist-per-domain idea, run as a rule sheet in the health insurance workspace).

## work_os variant
`02_SYSTEM_DESIGN/TPA Multi-Agent Insurance Network System.md` restates the design with an orchestrator above the router, the four specialists and five query types (hospital-to-network, network-to-hospitals, multi-hospital matching, reverse lookup, complex multi-criteria). It still has no implementation; see [[TPAs and Networks Reference (Work OS)]] for the count discrepancies.
