---
type: concept
sources: ["raw/Health-Insurance/Workspace/Plans/All-Plans-List.md", "raw/Health-Insurance/Workspace/Plans/Entry Level Plan.md", "raw/Health-Insurance/Workspace/Plans/Plans.md", "raw/Health-Insurance/Workspace/Knowledge Base/INDEX.md"]
updated: 2026-10-22
tags: [insurance, networks, lookup, facilities, providers]
summary: "How a network or provider question is answered from the workspace: the plan sheets' network column, and where the actual facility lists live."
---
# Network lookups

"How do I know this hospital is covered?" is asked in two forms, and the workspace answers them at two different levels of certainty.

## Level 1 - which plan runs on which network
This is what the plan library answers. The **Network** column of `Plans.md` gives the network for every one of the 418 plans, and the derived guides group them the same way:
- `All-Plans-List.md` - every plan, grouped by network, with provider, tier, price and the co-pay line.
- `Entry Level Plan.md` - the same grouping for entry-level plans only, with a **Key Features** column and a "Best for" line per network.

The libraries also record the **panel tiers** in use: DUBAI CARE N1-N5 plus Exclusive N2, and network labels such as MEDNET, NAS, NEXTCARE, ECARE, E CARE BLUE, AAFIYA, NEURON, HEALTHNET, ALLIANZ, SUKOON. Tier meaning and which provider writes on which network is covered by [[Network tiers]] and [[TPA's and Their Networks with Structure]].

**The caveat that matters:** the Network column mixes operators with insurer names and with product names (`Maxwell`, `SUKOON PREMIUM`, `QIC MEDNET`, `RAK NAS`, `DUBAI CARE (Remnto)`). A lookup that filters on that column alone will miss rows and will sometimes match a plan family rather than a network. See [[Plan sheet format]].

## Level 2 - which facilities a network covers
**This is where the workspace is weakest.** The actual provider panels live in `raw/Health-Insurance/Workspace/Networks/` as **spreadsheets**, which are binaries and are therefore **not ingested** - only the filenames are recorded here:

- `Mednet-Network-List-April-2026.xlsx`
- `Nextcare Full List - April 2026.xlsx`
- `Dubai Care Exclusive N2.xlsx`
- `Dubai Care N1.xlsx`, `Dubai Care N2.xlsx`, `Dubai Care N3.xlsx`, `Dubai Care N4.xlsx`, `Dubai Care N5.xlsx`

So the desk can answer "which plans run on Nextcare" from the plan sheets, and "is this clinic in the panel" only by opening the spreadsheet for that network. The entry-level guide states the limit itself: "Nextcare has extensive coverage across UAE - check specific facility availability."

The network operators themselves are covered in the wiki as entities: [[Mednet]], [[Nextcare]], [[Dubai Care]], [[NAS]], [[Aafiya]], [[Ecare]], plus the insurer pages for the writers.

## The lookup that goes wrong
Confusing the **network operator** with the **insurer**. "Dubai Insurance - Dubai Care Exclusive N2" is one line in the plan table, but Dubai Insurance is the insurer and Dubai Care is the network; the plan sheet also carries a separate `DUBAI CARE (Remnto)` label, which is the same family of products under an unstable name. See [[Dubai Insurance]] and [[Plan price tiers]].

## Related
- [[Insurance plan sheets]]
- [[Plan sheet format]]
- [[Network tiers]]
- [[TPA's and Their Networks with Structure]]
- [[Finding a hospital in a network]]
- [[Network database design]]
- [[Plan price tiers]]
- [[Customer objections]]
