---
type: source
sources: ["raw/Health-Insurance/Workspace/REFERRALS.md"]
updated: 2026-10-22
tags: [insurance, referrals, leads]
summary: "The small tracker for referral leads not yet in the CRM: four status tables and the current two waiting entries."
---
# Referral Leads Tracker

A short file for leads that arrive from a colleague or client referral and are not yet onboarded in the CRM ([[IMCRM]]). Once the person answers and gives details, they are onboarded as a full lead and removed from the list. Concept: [[Referral lead onboarding]]; wider context: [[Referral sources]].

## Four tables
| Table | Meaning |
|---|---|
| Awaiting Response | welcome message sent (columns: name, phone, referred by, date contacted, notes) |
| Responded, details received | ready to onboard |
| No Response, follow up needed | adds a last follow-up column |
| Onboarded | name, ref ID, referrer, date |

## Current state (early May 2026)
Two entries, both "Awaiting Response", both contacted on 4 May 2026 with the welcome message, each from a different referrer (colleagues). The other three tables are empty. Names and phones are in the source only.

## Notes
Pairs with the rule that referral welcome messages use an adapted opening ([[Welcome message salutation rules]]). The tracker shows referral volume in this file was tiny next to the 123 April leads ([[April 2026 Leads report]]); the larger referral volume lives in WhatsApp chats.
