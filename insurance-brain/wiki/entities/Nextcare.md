---
type: entity
sources: ["raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/Insurance Workspace/Sales-System/Drafts/pending_replies.json", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Multi_Agent_Design.md"]
updated: 2026-10-22
tags: [tpa, insurance]
summary: "A TPA with a specialist agent in TPA Network Lookup Agents."
---
# Nextcare

A TPA with a specialist agent in [[TPA Network Lookup Agents]]. Source: [[YOUR MULTI-AGENT TEAM STRUCTURE]].

**Specialty:** flexible plans, customizable coverage.

**6 networks** (see [[Network tiers]]):
- GN+ (General Network Plus): premium tier
- GN (General Network): mid-high tier
- GN Limited: mid tier
- RN (Restricted Network): economy tier
- RN2 (Restricted Network 2): budget tier
- RN3 (Restricted Network 3): budget tier

**In the examples:** GN+ covers all three hospitals in the multi-hospital example and Burjeel Abu Dhabi (with GN). Example prices (illustrative): GN+ AED 2,400, GN AED 1,900 a year; AED 8,000 for the example family on GN, described as "flexible add-ons".

**Cross-source notes (from [[WhatsApp analysis May-June 2026]]):**
- A real case refers to a "Next N5" plan with a AED 3,500 dental limit. The four-agent design note lists no N5 network for Nextcare (only GN+, GN, GN Limited, RN, RN2, RN3), so the design's network list may be incomplete or "Next N5" is a plan name. Unresolved.
- The Basic Enhanced plan "HAYAH Care Protect RN3 B" ([[Plan price tiers]]) appears to use the RN3 network (inference from the name).

Compare: [[Mednet]], [[Dubai Care]], [[NAS]].

## Claims-side appearance (from the daily audits)
The [[Daily sales audit]] of 29 May 2026 records a **claims escalation** in which a client's claim had been rejected a second time through the TPA's own customer app despite a prior escalation. The internal claims team was handling it, the client was venting, and there had been no resolution update for 5 days.

Two things worth keeping from it:
- The TPA's **customer app** is where the client experiences the rejection, so the sales desk ends up carrying the escalation even though it is not a sales issue.
- The draft the system wrote is a **holding reply** - acknowledge, state that it is escalated internally, promise a concrete update - because the sales desk cannot give a resolution.

It is the only claims case in the ingested window. No other Nextcare operational detail appears in these sources.

Related: [[Sales operations issues]], [[Pending reply drafts]], [[Daily sales audit]].

See also (added): [[Network plan code list (NAS_CN)]] for the plan codes of this network.

## Where it sits in the work_os reference lists (2026-10-22 ingest)
The work_os TPA list gives Nextcare **6 networks** - GN+, GN, GN Limited, RN, RN2, RN3 - and describes it as a wide network for **Dubai**. The multi-agent design gives the same six, with the same names, so **Nextcare is the one TPA whose two lists agree**. Source: [[TPAs and Networks Reference (Work OS)]], [[YOUR MULTI-AGENT TEAM STRUCTURE]].

The same plan-code list carries the same six under slightly different spellings ("GN Plus" for "GN+"). The facility-search tooling reads **six NextCare network workbooks**, one per network. See [[TPA and network reference]].

Note the unresolved point above: the design list has no N5, yet a real case refers to a "Next N5" plan - so either the list is incomplete or N5 is a plan name rather than a network. See [[Network tiers]].
