---
type: source
sources: ["raw/10_Work-Insurance/README_Lead_Tracking.md"]
updated: 2026-10-22
tags: [insurance, crm, leads, tracking, workflow]
summary: "Lead tracker overview with 7-stage client-centric workflow"
---
# Source: Insurance Sales Workspace - Lead Tracking System

Original note: [[raw/10_Work-Insurance/README_Lead_Tracking|README_Lead_Tracking]]. Describes tracker columns and simplified workflow.

## Statistics (13-Jan-2026)
Total 37, New 9, Followed Up 24, Qualified 1, Policy Booked 3, Payment Link Sent 1. Sources: Bought 27, Self Assigned 9, Reassigned 4.

## Folder structure (client-centric simplified)
Lead_Tracker.csv, 1_New_Leads, 2_Info_Collected, 3_Quote_Sent, 4_Documents_Collection, 5_Ready_for_Submission, 6_Payment_Pending, Onboarding_policies, Lost_Leads, Knowledge_Base.

## Tracker columns
Reference ID (HEA-XXXXXXX for health), Client Name, Status, Lead Source, Date, Visa Type, Stage, Contact, Insurance Company, Premium, Next Action, Follow-up Date, Notes, Documents Status, Payment Status.

## Workflow stages
1 New Lead (create folder in 1_New_Leads, save initial conversation) → 2 Info Collected (gather details, move to 2_Info_Collected) → 3 Quote Sent (prepare/send quote, save in folder, move to 3_Quote_Sent, set follow-up) → 4 Documents Collection (approved quote, request docs, move to 4_Documents_Collection, track received) → 5 Ready for Submission (all docs collected, move to 5_Ready_for_Submission) → 6 Payment Pending (submitted to portal, payment link received, move to 6_Payment_Pending, share link) → 7 Policy Confirmed (payment received, move to Onboarding_policies).

## Related

- [[Lead tracking in the CRM]]
- [[Insurance CRM pipeline]]
- [[Folder structure convention]]
- [[Lead reference IDs]]
- [[Insurance Sales Operations - Master Workspace]]
