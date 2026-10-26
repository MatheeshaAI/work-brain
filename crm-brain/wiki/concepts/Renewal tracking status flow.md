---
type: concept
sources: ["raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance"]
updated: 2026-10-22
tags: [insurance, renewals, workflow]
summary: "The six-step renewal status flow used in the monthly renewal tables, and how it differs from the new-lead pipeline."
---
# Renewal tracking status flow

Each monthly renewal overview in [[Health renewals leads folder]] ends with the same legend, a six-step flow:

| Step | Marker | Meaning |
|---|---|---|
| Due | red | Policy approaching or past expiry, no contact yet |
| Contacted | orange | Client reached |
| Quote Sent | yellow | Renewal or replacement quote shared |
| Payment Pending | green | Client agreed, payment awaited |
| Renewed | tick | Policy renewed (possibly with another insurer) |
| Lapsed | cross | Not renewed |

## How it is used (April-June 2026, 20 renewals)
Due 15, Quote Sent 4, Renewed 1; Contacted, Payment Pending and Lapsed never used. The flow is date-driven (expiry date), not enquiry-driven like [[Lead pipeline stages]]. A renewal often becomes a re-quote: the replacement insurer is usually still TBD, and comparison links from [[Insurancemarket.ae]] are the first move.

## Gaps
- "Contacted" is skipped; contact is recorded in notes instead of the status.
- No intermediate step for "expired, awaiting decision", handled by a free-text note.
- Same customers can also exist as renewal-import files in the individual folder, see [[Individual health insurance leads folder]].

Related: [[Lead prioritization]], [[WhatsApp lead follow-up statuses]].
