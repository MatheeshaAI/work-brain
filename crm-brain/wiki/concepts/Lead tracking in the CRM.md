---
type: concept
sources: ["raw/10_Work-Insurance/README_Lead_Tracking.md"]
updated: 2026-10-22
tags: [insurance, crm, leads, tracking]
summary: "How leads are tracked in the CRM/folder system"
---
# Lead tracking in the CRM

Lead tracking uses `Lead_Tracker.csv` with client-centric folders. From [[Insurance Sales Workspace - Lead Tracking System]].

## Tracker columns
Reference ID (HEA-XXXXXXX for health), Client Name, Status, Lead Source, Date, Visa Type, Stage, Contact, Insurance Company, Premium, Next Action, Follow-up Date, Notes, Documents Status, Payment Status.

## Simplified workflow stages
1. **New Lead** - Create folder in 1_New_Leads, save initial conversation
2. **Info Collected** - Gather details, move to 2_Info_Collected
3. **Quote Sent** - Prepare/send quote, save in folder, move to 3_Quote_Sent, set follow-up
4. **Documents Collection** - Request docs after approval, move to 4_Documents_Collection, track received
5. **Ready for Submission** - All docs collected, move to 5_Ready_for_Submission
6. **Payment Pending** - Submitted, payment link received, move to 6_Payment_Pending, share link
7. **Policy Confirmed** - Payment received, move to Onboarding_policies

## Related

- [[Insurance CRM pipeline]]
- [[Folder structure convention]]
- [[Lead reference IDs]]
- [[IMCRM]]
- [[WhatsApp lead follow-up statuses]]
