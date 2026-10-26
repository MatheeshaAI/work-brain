---
type: concept
sources: ["raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md"]
updated: 2026-10-22
tags: [insurance, plans, extraction, imcrm]
summary: "The entry-level plan set: four named plans selected by name for extraction, and how that differs from the catalogue and network-based definitions."
---
# Entry level plans

"Entry level" is used in three different ways in this workspace, and they select different plan sets. Knowing which definition is in play matters, because the wrong one sends the wrong plans to a customer.

## Definition 1: four named plans (the extraction set)
The extraction plan of 2026-05-22 targets exactly **four plans by name**:

| Provider | Plan | Network |
|---|---|---|
| [[Takaful Emarat]] | APN Plan | Aafiya |
| [[Takaful Emarat]] | Silver Plan | Nextcare |
| [[Takaful Emarat]] | Essential Plan | Aafiya |
| [[Dubai Insurance]] | Remento N4 (also written RN4 / Remnto N4) | Dubai Care |

Source: [[Entry level plans extraction plan]]. Three of the four are [[Takaful Emarat]] plans, which is why the network-based filter below excludes Takaful Emarat and still produces a Takaful-heavy list.

## Definition 2: the platform catalogue's entry-level flag
The CRM platform catalogue carries an **entry level** marker on 15 plans, AED 930 to 1,183, spanning 8 networks and 12 insurers. That is the catalogue's own flag, on plans from many providers. See [[Insurance plan catalogue]], [[Network tiers]].

## Definition 3: the extension's basic filter
The extension's "Extract Basic Plans" button selects by **network**, not by plan name or by the catalogue flag. See [[Basic plan filter]].

## The three definitions compared
| | Selection key | Result |
|---|---|---|
| Extraction plan (2026-05-22) | plan name | 4 fixed rows, always present, `*(not found)*` when absent |
| Platform catalogue | catalogue flag | 15 plans across 8 networks |
| Extension basic filter | network name + price sort | max 2 per provider, cheapest first |

## Caveats
- **The extraction feature is design intent.** Every checkbox in the plan is unticked, and the extension's own memory note lists no such button. See [[IMCRM Data Extractor]].
- **The plan name is not stable.** The Dubai Insurance plan appears as "Remento N4", "Remnto N4" and "RN4"; the older vault vocabulary says "Dubai Care N4". The name is a template artefact - see [[Plan price tiers]].
- **The workspace has its own file for this** (`Workspace/Plans/Entry Level Plan.md`) which is not in this ingest scope and may well define the set differently.
- The workspace's `Plans/` folder also holds a per-insurer plan file for most of the market; those are the natural place for a canonical definition.

Related: [[Basic plan filter]], [[Insurance plan catalogue]], [[Takaful Emarat]], [[Dubai Insurance]], [[Plan price tiers]], [[IMCRM Data Extractor]].
