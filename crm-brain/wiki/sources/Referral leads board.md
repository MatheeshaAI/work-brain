---
type: source
sources: ["raw/Health-Insurance/Workspace/REFERRALS.md", "raw/Health-Insurance/Workspace/Leads/Referral Leads/Referral_Leads_Tracker.md"]
updated: 2026-10-22
tags: [insurance, referrals, leads, tracker]
privacy: aggregate only - referrer and client identities are not reproduced
summary: "Two referral trackers with four rows between them, no conversion recorded in either, and a four-state board that has only ever used one of its states."
---
# Source: Referral leads board

`Workspace/REFERRALS.md` (888 bytes, 33 lines, last written **15 May 2026**) is the root referral tracker. It is the **oldest file in the workspace root** - it has not been touched since mid-May, while every other board was updated on 20-24 May.

## The four-state board
> "Leads received via colleague/client referrals - **not yet onboarded in IMCRM**. Once the client responds and provides details, onboard them as a full lead and remove from this list."

| Section | Rows | State |
|---|---|---|
| Awaiting Response | **2** | welcome message sent, contacted 04-May-2026, from two different referrers |
| Responded - Details Received (Ready to Onboard) | 0 | empty table |
| No Response - Follow Up Needed | 0 | empty table |
| Onboarded | 0 | empty table |

Columns: name, phone, referred by, date contacted, notes.

**Only one of the four states has ever been used.** The board has two rows in it and none has ever moved. The workflow is a one-way street: a referral enters as Awaiting Response, and the only recorded exit is **deletion** - "onboard them as a full lead and remove from this list".

## The second tracker
`Leads/Referral Leads/Referral_Leads_Tracker.md` is a separate file with **3 pending rows**, all from **one** referrer, all status **Message Sent**, all added **20-05-2026**, with the detail blocks still empty ("awaiting name and details"). It records the six-step conversion process - collect details, enter in IMCRM to generate the reference, create the lead file, create the documents folder, move into the pipeline sections, then remove or mark converted. See [[Referral lead records]].

## What the two trackers disagree about
| | Root board | Leads tracker |
|---|---|---|
| Rows | 2 | 3 |
| Dates | 04-May-2026 | 20-May-2026 |
| Referrers | 2 different | 1 |
| State model | 4 sections | status field per row |
| Conversion | remove the row | remove or mark converted |

Two files, two shapes, two dates, no reconciliation, and **no record anywhere of a referral that was converted**. The Onboarded section exists but has never held a row. See [[CRM hygiene]].

## The wider picture
The April CRM export carries a dedicated **IMCRM Sub-Source** column, and 23 of its 123 leads are attributed to the advisor's own referral while 100 have no sub-source recorded. So referrals are a real intake channel at volume, and the sub-source is only filled in sometimes. The referral count therefore cannot be reconstructed from the trackers, and the CRM's own sub-source field is the only reliable count. See [[April 2026 leads report]] and [[Sales reporting]].

## Related
- [[Referral lead records]]
- [[Referral sources]]
- [[Referral leads board]]
- [[Client dossiers]]
- [[April 2026 leads report]]
- [[CRM hygiene]]
- [[Lead reference IDs]]
- [[Standard intro message]]
- [[Referral leads folder]]
- [[Referral Leads Tracker]]
- [[Lead capture gaps]]
