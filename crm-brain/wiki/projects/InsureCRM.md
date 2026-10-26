---
type: project
sources: ["raw/30_Projects/InsureCRM 1/InsureCRM.md", "raw/30_Projects/InsureCRM 1/Breakdown.md", "raw/30_Projects/InsureCRM 1/Original Idea.md", "raw/30_Projects/InsureCRM 1/Needs More Work.md", "raw/30_Projects/InsureCRM 1/index.html"]
updated: 2026-10-22
tags: [project, crm, insurance, prototype]
summary: "Static HTML/CSS/JS insurance agency CRM dashboard prototype."
---
# InsureCRM

**Goal:** Insurance agency CRM dashboard for renewals, premiums, commissions, leads, tasks, clients. Prototype/mockup (all data hardcoded).

## Built facts (from [[InsureCRM 1 Breakdown]])
- **KPI cards:** Renewals (48), Premiums collected, Commissions collected (with % change)
- **Lead pipeline:** 5 stages (New/Contacted/Qualified/Proposal/Closed-Won), totals/active
- **Pending tasks:** with priority/due dates
- **Activity feed:** recent actions
- **Recent clients table**
- **Sidebar nav:** Dashboard, Leads, Renewals, Policies, Premiums, Commissions, Tasks, Profile, Settings
- **AED currency**, dark/light mode with localStorage, theme toggle
- **Renewal premium shown separately**, monthly targets (premiums AED 200k, commissions AED 20k) with progress bars, 6-month history chart (CSS bars), Contacts page with expandable accordion cards showing policies
- **Page navigation** between Dashboard/Contacts

## Original idea
Track renewals, premiums collected, commissions collected, total/active leads by stage, pending tasks. Later added renewal premium, targets, history, contacts, dark mode, AED.

## Status
Prototype/Design mockup — visually complete, functionally limited. No backend/auth/CRUD/real data. See [[InsureCRM 1 Needs More Work]] for gaps (search not wired, modals missing, no commission engine, no mobile nav, etc.)

## Related
[[Insurance CRM]], [[Renewals]], [[Commissions]] (concepts if needed).
