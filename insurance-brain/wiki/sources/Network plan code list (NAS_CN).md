---
type: source
sources: ["raw/10_Work-Insurance/NAS_CN.md"]
updated: 2026-10-22
tags: [insurance, networks, tpa, plan-codes]
summary: "A bare list of plan-network codes in TPA_TIER format covering NAS, Mednet, Nextcare, Dubai Care, ADNIC, Sukoon, Ecare and Aafiya."
---
# Network plan code list (NAS_CN)

Despite the file name, this is not about one network. It is a seven-block list of codes in the `TPA_TIER` format, about 45 lines, with no prose. It looks like a lookup or normalisation list for the facility-search work. The same names appear in [[TPA Network Lookup Agents]] and [[Network database design]].

## Contents by block
| Block | Codes |
|---|---|
| [[NAS]] | CN (Comprehensive), GN (General), RN (Restricted), SRN (Super-restricted), WN (Workers) |
| [[Mednet]] | Gold, Silver Premium, Silver Classic, Emerald, Pearl, Silk Road IP, Silk Road OP |
| [[Nextcare]] | GN Plus, GN, GN Limited, RN, RN2, RN3 |
| [[Dubai Care]] | N1, Exclusive N2, N2, N3, N4, N5 |
| [[ADNIC]] | Platinum, Gold, Silver, Bronze |
| [[Sukoon Insurance]] | Premium, Edge, Signature + Medcare, Signature, Advance, Vital |
| [[Ecare]] and [[Aafiya]] | Ecare Classic, Green, Blue; Aafiya APN Plus, APN, Essential |

## Notes
- The NAS letter codes expand the way [[Network tiers]] does.
- ADNIC and Sukoon are insurer product ladders (their own plan names), not TPA networks. The other blocks are TPA networks. The file mixes the two without saying so.
- Dental, optical and the NAS "Value" plan that the facility-search skills mention are not in this list.
- Not stated: which codes are sold today. [[Network tiers]] records that only about eight networks actually sell in 2026.
