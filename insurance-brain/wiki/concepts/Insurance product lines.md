---
type: concept
sources: ["raw/Health-Insurance/Group-Health-Insurance.md", "raw/Health-Insurance/Individual-Health-Insurance.md", "raw/Health-Insurance/Motor-Insurance.md", "raw/Health-Insurance/Referral-Leads.md", "raw/Health-Insurance/Lead-Context.md"]
updated: 2026-10-22
tags: [insurance, product, organization]
summary: "The three insurance product lines the desk sells - individual health, group health and motor - and the folders, reference prefixes and counts that separate them."
---
# Insurance product lines

The Health-Insurance workspace sells three lines of business, and the folder layout is organised around them.

| Line | Folder (under `Workspace/Leads/`) | Index file | Reference prefix | Leads at ingest |
|---|---|---|---|---|
| Individual health | `Health Insurance/Individual-Health-Insurance/` | `Individual-Health-Insurance.md` | `HEA-` + 8 chars | 166 indexed, 168 files on disk |
| Group health (corporate) | `Health Insurance/Group-Health-Insurance/` | `Group-Health-Insurance.md` | `HEA-` | 1 |
| Motor | `Motor Insurance/` | `Motor-Insurance.md` | `CAR-` + 8 chars | 5 |

Cross-cutting folders sit beside the three product folders: `Referral Leads/`, `Lead-Context/`, `Renewals/` and a `recovered files/` folder holding orphaned script files.

## Why the split matters operationally
- **The reference prefix is the type.** `HEA-` means health, `CAR-` means motor, so one person can hold one of each and the two never collide in a filename. See [[Lead file naming]].
- **The extraction differs by line.** The browser extension has a separate extraction routine per line: health extraction reads the customer profile, the member table and the plans table; motor extraction reads the vehicle and quote side. See [[IMCRM Data Extractor]].
- **Group is a different kind of record.** The single group entry points at a company file rather than a person file, so it does not carry a personal member table.
- **Renewals are not a fourth product line.** A renewal file is filed under the product line it renews, with the insurer's own renewal code in the filename.

## What the split is not
- The product split is **organisational**. It says where a record is filed, not what the customer is buying.
- Plan, premium, network and eligibility knowledge for these lines lives elsewhere - the workspace `Plans/` folder, the insurer underwriting notes, the CRM catalogue and the network lists - none of which is in this ingest scope. See [[Insurance plan catalogue]], [[Entry level plans]].
- The root index files that carry the counts are duplicated inside the Leads area. See [[Lead folder index files]].

## The networks these lines are sold on
The health line is quoted across the eight networks that actually sell in 2026: [[Dubai Care]], [[Ecare]], [[Aafiya]], [[Nextcare]], [[NAS]], [[Mednet]], E Care Blue and Sukoon - written by a dozen insurers including [[Takaful Emarat]] and [[Dubai Insurance]]. The network is what a customer actually chooses between, so it is a second axis alongside the product line and the price tier. See [[Network tiers]], [[Insurance plan catalogue]], [[Finding a hospital in a network]].

Related: [[Individual Health Insurance leads index]], [[Motor Insurance leads index]], [[Group Health Insurance leads index]], [[Lead folder index files]], [[Lead pipeline stages]], [[Insurance plan catalogue]].
