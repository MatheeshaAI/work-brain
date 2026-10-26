---
type: concept
sources: ["raw/10_Work-Insurance/README_Pipeline.md", "raw/10_Work-Insurance/README.md", "raw/Health-Insurance/Dashboard/lib/leadStore.js", "raw/Health-Insurance/Memory/memory.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/PLANNING.md", "raw/work_os system designing documents/00_ORIGINALS/CONVERSATION_LOG.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/stage_detector.py"]
updated: 2026-10-22
tags: [insurance, crm, pipeline, sales]
summary: "16-stage insurance sales pipeline from new lead to policy booked"
---
# Insurance CRM pipeline

16-stage pipeline for health/motor/renewals from [[Insurance Sales Pipeline - 16-Stage System]].

## Stages
1. **New Lead** - Fresh inquiry
2. **Allocated** - Assigned to advisor  
3. **Followed Up** - Initial contact made (remind after 2 days)
4. **Quoted** - Quote sent
5. **In Negotiation** - Discussing terms/price
6. **Application Pending** - Waiting for application (remind after 3 days)
7. **Missing Documents Requested** - Docs requested (daily reminder)
8. **Application Submitted** - Submitted to insurer
9. **Sent for Transaction Approval** - Awaiting approval
10. **KYC Cleared** - KYC complete
11. **Payment Link Sent to Customer** - Link shared (remind after 1 day)
12. **Payment Pending** - Waiting for payment (daily reminder)
13. **Payment Initiated** - Payment in process
14. **Policy Documents Pending** - Waiting for policy docs
15. **Policy Booked** - Completed/active
16. **Lost** - Declined/not interested

## Auto follow-up rules
Stage 3 (2 days), Stage 6 (3 days call+WhatsApp), Stage 7 (daily), Stage 11 (24h no payment), Stage 12 (daily escalate).

## Tracking
Managed in Lead Tracker CSV with folder movement through stage groups (01_New_Leads through Onboarding_policies/Lost_Leads). See [[Lead tracking in the CRM]] and [[Folder structure convention]].

## Related

- [[Insurance Sales Platform]]
- [[Tasks and analytics]]
- [[IMCRM]]
- [[Sales operations issues]]
- [[WhatsApp lead follow-up statuses]]

## A second, coarser pipeline runs beside it (2026-10-22 ingest)
The workspace keeps its own pipeline in `Workspace/PIPELINE.md` with **five stage sections** - New Leads, In Progress, Application / Payment Stage, Policy Booked, Renewals - plus a Production Summary and a Pending Tasks checklist. The local dashboard reads exactly those sections.

Source: [[Insurance Dashboard (Health Insurance OS)]], [[Lead pipeline stages]].

**These are different boards, and no source maps one onto the other.** The 16 stages above live in the CRM; the 5 sections live in a markdown file; the lead file itself carries a third, coarser status (new, quoted/followed up, application/payment, booked/allocated). When a lead appears in `New Leads`, it does not follow that it is a CRM "New Lead" - the CRM's own New Lead count was 3 of 68 leads on 07-Jun-2026, while the workspace's New Leads section is a working queue.

The workspace's four workflows (new lead, quotation, policy booking, renewal) are the practical counterpart of the 16 stages; see [[Task single source of truth]].

## 19/20-stage variant (work_os)
**Contradiction flagged.** The work_os planning set models the CRM pipeline with **20 stages** (the heading says "19 total" but twenty are listed): New Lead, Allocated, Followed Up, Quoted, In Negotiation, then the renewal-only Renewal Terms Received, Renewal Terms Sent and Pending BOR Request, then Application Pending, Missing Documents Requested, Application Submitted, KYC Cleared, Sent for Transaction Approval, Payment Link Sent To Customer, Payment Initiated, Payment Pending, Sale Leads, Policy Documents Pending, Policy Pending and Lost. This page lists 16. The extra four are the three renewal stages and `Sale Leads`; the two lists also differ in that work_os drops `Allocated` and renames `Policy Booked` as `Policy Pending`. The owner recommended dropping Allocated. Neither list is marked as the authoritative CRM list; see [[Health Insurance Sales Agent Plan (Jan 2026)]] and [[Negotiation stage stalls]].

## A third count in the saved code (2026-10-22 ingest)
The Python settings module in the work_os folder declares a **19-stage** list: the 20 above with **Allocated removed** and the rest in the same order. That matches the owner's recommendation, so it is the closest thing to a settled list in the vault - but it is a constant in a file, not a CRM export. Against this page's 16 it adds the three renewal stages and `Sale Leads`, and it ends at **"Policy Pending"** where this page says "Policy Booked". The stage detector carries its own duplicate copy of the same 19 names, and its docstring calls them "20 stages" ([[Health Insurance Sales Agent Python Code]]).

Source: [[Health Insurance Sales Agent Python Code]], [[Stage detection rules]].
