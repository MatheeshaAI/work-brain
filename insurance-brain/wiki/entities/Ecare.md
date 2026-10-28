---
type: entity
sources: ["raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [tpa, network, insurance, uae]
summary: "A TPA network on the extension's basic-plans allow-list, written by Dubai Insurance and Takaful Emarat."
---
# Ecare

A TPA network in the UAE market. It appears in this ingest scope as one of the networks on the extension's basic-plans allow-list, and as the network behind a Takaful Emarat plan.

## The label problem
The sources use two related labels for what may be one network family:
- **`E CARE`** - one of the include values in the basic-plans filter.
- **`E CARE BLUE`** - the other include value in the same filter.

`E Care Blue` also appears as a **plan name** - "Takaful Emarat E Care Blue 1", a Basic-tier plan quoted from AED 1,128.75. So the same string can be a network label and a plan name, exactly as with `AAFIYA (APN)`.

Sources: [[IMCRM extension memory note]], [[Plan price tiers]], [[Entry level plans extraction plan]].

## Who writes on it
| Network label | Insurer seen writing on it |
|---|---|
| Ecare | [[Dubai Insurance]] |
| E Care Blue | [[Takaful Emarat Insurance]] |

Source: [[Network tiers]].

## Where it sits
- One of the **eight networks that actually sell** in 2026.
- On the cheap end of the ladder: both E-care labels are include values in the basic filter, which exists to shortlist affordable plans.
- The E-care writing from Takaful Emarat is what the Basic tier of the scripted intro quotes - "E Care Blue 1, from AED 1,128.75". See [[Standard intro message]], [[Batch intro messaging]].

## Caveats
- **No Ecare plan appears in the four-plan entry-level extraction set** (Takaful APN, Takaful Silver, Takaful Essential, Dubai Insurance Remento N4). If E-care plans are meant to be entry-level, the two selection rules disagree - see [[Basic plan filter]].
- The ingested sources give no hospital list, tier ladder or provider count for Ecare. The workspace's network folder holds provider lists for other TPAs only.

Related: [[Aafiya]], [[Takaful Emarat Insurance]], [[Dubai Insurance]], [[Network tiers]], [[Basic plan filter]], [[Insurance plan catalogue]].

See also (added): [[Network plan code list (NAS_CN)]] for the plan codes of this network.
