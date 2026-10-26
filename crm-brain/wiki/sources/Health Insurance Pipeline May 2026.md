---
type: source
sources: ["raw/Health-Insurance/Workspace/PIPELINE.md"]
updated: 2026-10-22
tags: [insurance, pipeline, production, leads]
summary: "The master pipeline dashboard (421 lines, May 2026): sections, production numbers and the shape of the open work, without client detail."
---
# Health Insurance Pipeline May 2026

The workspace's master dashboard, headed "Pipeline - 08 May 2026" but containing entries dated to 22 May. It is the file the dashboard app reads ([[Lead pipeline stages]], [[Insurance Dashboard]]). It holds client names, phone-linked actions and ref IDs; only patterns and counts are kept here.

## Sections in order
Production summaries (May and April), New Leads (needs immediate action), Motor Leads, In Progress (Quoted / Followed Up), Application / Payment Stage, Policy Booked (May and April), Renewals (April), Pending Tasks (daily checklists), Outstanding Documents, Cancelled / Inactive, Notes.

## Production
| Month | New business booked | Other | Total |
|---|---|---|---|
| May 2026 | 0 | 1 group addition, AED 2,251.45 | 1 policy |
| April 2026 | 3 policies | - | 3 policies |
See [[Workspace Audit 2026-06-01]].

## Shape of the open work
- Policy Booked lists for April (3 rows by ref ID, name, date) and May (one group addition).
- Notes record a batch of 25 new leads added on 21 April from the last-30-days report: 3 new, 2 quoted, 14 followed up, 3 application pending, 1 payment link sent, 2 allocated ([[Leads Last 30 Days report]]).
- "Urgent follow-ups": 10 leads in Followed Up for 13+ days, 1 application pending for 15 days, 9 allocated leads for 21 days awaiting policy confirmation, and one payment unconfirmed for 26 days.
- Daily checklists by date (22 May, 6 May, 24 and 27 April) mix follow-ups, document chasing, waiting for an insurer's final premium, and waiting for a commission or credit note before sending for booking ([[Commission calculation]]).
- Outstanding documents: 4 items, 2 resolved.
- Cancelled / inactive: 1 entry (member deceased, cancellation submitted to the insurer).
- Family inquiries are logged with a document folder path; one family of six with golden visas is noted.

## Observations
- Document flow and insurer waits (final premium, credit note) dominate the checklist, matching [[Document request handling]] and [[Open tasks]].
- The master file duplicates status held in each lead file; the [[Dual-update rule]] exists for that reason.
- Formatting damage in the New Leads table is noted by the audit.
