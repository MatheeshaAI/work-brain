---
type: source
sources: ["raw/10_Work-Insurance/README_Pipeline.md"]
updated: 2026-10-22
tags: [insurance, crm, pipeline, stages, operations]
summary: "16-stage insurance sales pipeline with auto follow-up rules"
---
# Source: Insurance Sales Pipeline - 16-Stage System

Original note: [[raw/10_Work-Insurance/README_Pipeline|README_Pipeline]]. Detailed pipeline stages and operations.

## 16 stages
1 New Lead → 2 Allocated → 3 Followed Up (remind after 2 days) → 4 Quoted → 5 In Negotiation → 6 Application Pending (remind after 3 days) → 7 Missing Documents Requested (daily reminder) → 8 Application Submitted → 9 Sent for Transaction Approval → 10 KYC Cleared → 11 Payment Link Sent to Customer (remind after 1 day) → 12 Payment Pending (daily reminder) → 13 Payment Initiated → 14 Policy Documents Pending → 15 Policy Booked (completed) → 16 Lost

## Folder structure (by stage grouping)
01_New_Leads (1-2), 02_Active_Followup (3-5), 03_Application_Stage (6-7), 04_Submitted_Pending (8-10), 05_Payment_Stage (11-13), 06_Policy_Finalization (14), Onboarding_policies (15), Lost_Leads (16). Knowledge_Base under Health/Motor/Message_Templates.

## Status snapshot (13-Jan-2026)
Stage 1: 6, Stage 3: 24, Stage 4: 1, Stage 5: 1, Stage 11: 1, Stage 15: 3 (completed), Stage 16: 0. Priorities: allocate new leads, follow up quoted/negotiating, chase payment link.

## Auto follow-up rules
Stage 3 no update 2 days → reminder; Stage 6 no update 3 days → call+WhatsApp; Stage 7 daily reminder for docs; Stage 11 no payment after 24h → WhatsApp+call; Stage 12 daily reminder escalate.

## Document checklists
Health: passport/visa/EID for all members, medical reports if pre-existing, sponsor docs for dependents, birth certificate for newborns, discharge summary if applicable, medical application form, KYC form, signed quotation. Motor: EID, Mulkiya, passing certificate, inspection pics, license, previous policy for renewals.

## Operations
Add lead → CSV row stage 1 + folder in 01_New_Leads; move stage → update CSV, move folder, update next action/follow-up; daily dashboard filter by follow-up date today, sort by stage, focus on auto-follow-up stages. Reports track new/active/closed won/lost and conversion.

## Related

- [[Insurance CRM pipeline]]
- [[Lead tracking in the CRM]]
- [[Folder structure convention]]
- [[Tasks and analytics]]
- [[Insurance Sales Operations - Master Workspace]]


Note (added): the January 2026 planning session [[Sales_OS_Opencode_Session]] uses a 20-stage list; see [[Lead pipeline stages]] for the conflict.
