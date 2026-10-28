---
type: concept
sources: ["raw/10_Work-Insurance/Network Database Design.md", "raw/10_Work-Insurance/find-network.md", "raw/work_os system designing documents/00_ORIGINALS/Network Database Design.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md"]
updated: 2026-10-22
tags: [insurance, network, database, tpa, search]
summary: "Network database design and hospital lookup approach"
---
# Network database design

Design for storing and searching TPA hospital networks. From [[Network Database Design]] and [[find-network]] sources (both present in raw folder).

## Purpose
Track which hospitals/clinics are in which TPA networks (and tiers) to answer "is [hospital] covered?" questions quickly. Supports the [[TPA Network Lookup Agents]] and facility search workflows.

## TPAs and networks (structure)
From [[TPA's and their networks with structure]]: NAS (CN/GN/RN/SRN/WN), MEDNET (Gold/Silver Premium/Silver Classic/Emerald/Pearl/Silk Road IP/OP), NEXTCARE (GN+/GN/GN Limited/RN/RN2/RN3), DUBAICARE (N1/Exclusive N2/N2/N3/N4/N5), ADNIC (Platinum/Gold/Silver/Bronze), SUKOON (Premium/Edge/Signature+/Signature/Advance/Vital), ECARE (Classic/Green/Blue), AAFIYA (APN Plus/APN/Essential). See [[Network tiers]] for mapping.

## Data sources
Dubaicare has detailed network lists (see [[Dubaicare Network Comparison (N4-N1)]] and [[Dubaicare-Hospitals-Dubai]]). Full Dubaicare network list CSV exists (819KB) - structure to be understood; rows not copied per privacy rules.

## Related concepts/pages
[[Finding a hospital in a network]], [[TPA Network Lookup Agents]], [[Network tiers]], [[Mednet]], [[Dubai Care]], [[NAS]], [[Nextcare]].

## Related

- Insurance Sales Platform
- [[Insurance Sales Operations - Master Workspace]]

## Also stored in work_os
A copy of the JSON template is in `raw/work_os system designing documents/00_ORIGINALS/Network Database Design.md` (expanded only for NAS and MEDNET, arrays empty, truncated at the end) and in `03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md`. Details and the network-count contradictions: [[TPAs and Networks Reference (Work OS)]].
