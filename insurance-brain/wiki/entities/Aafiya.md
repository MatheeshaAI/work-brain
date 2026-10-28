---
type: entity
sources: ["raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [tpa, network, insurance, uae]
summary: "A TPA network that appears in the extension's basic-plans allow-list and carries two of the four entry-level plans."
---
# Aafiya

A TPA network in the UAE market. It appears in this ingest scope in three places, and the three do not use the same label.

## The three labels
| Where | Label used | What it refers to |
|---|---|---|
| Extension basic-plans filter | `AAFIYA (APN)` | a network label that has a plan name inside it |
| Entry-level extraction set | APN Plan; Essential Plan | two named [[Takaful Emarat Insurance]] plans written on Aafiya |
| CRM catalogue | `Takaful Emarat - Essential (Entry Level, AAFIYA)` | insurer, plan, tier and network in one string |

**The ambiguity matters.** "APN" is used both as part of a network label (`AAFIYA (APN)`) and as a plan name (the Takaful Emarat APN Plan). A filter that keys on network strings and a filter that keys on plan names therefore select overlapping but different sets - see [[Basic plan filter]] and [[Entry level plans]].

## Where it sits in the tier ladder
- Aafiya is one of the **eight networks that actually sell** in 2026, with [[Takaful Emarat Insurance]] writing on it in the CRM sample. See [[Network tiers]].
- It carries plans at the **entry end** of the catalogue: the APN plan and the Essential plan are both in the four-plan entry-level extraction set.
- The extension's basic-plans filter **includes** it, which is why Aafiya appears in a shortlist alongside the two E-care networks.

## Caveats
- The ingested sources name the network but never describe its provider list, tier ladder or hospital count. The provider-level detail for Aafiya lives in the workspace's network files and the provider-lookup skills, which are **not** part of this ingest scope.
- The workspace has a `Networks/` folder with provider lists for other TPAs; there is no Aafiya file in the workspace area.

Related: [[Network tiers]], [[Basic plan filter]], [[Entry level plans]], [[Takaful Emarat Insurance]], [[Insurance plan catalogue]], [[Nextcare]].

See also (added): [[Network plan code list (NAS_CN)]] for the plan codes of this network.
