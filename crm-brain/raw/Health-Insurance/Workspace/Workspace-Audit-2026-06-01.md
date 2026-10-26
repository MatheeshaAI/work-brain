# Workspace Audit — 01 June 2026

A full walkthrough analysis of the Health-Insurance workspace. No changes made.

---

## What This System Is

A **AI-assisted health insurance sales CRM** built on Claude Code + Obsidian. ~275 markdown files interconnected by wikilinks. Handles the full lifecycle: lead onboarding → quoting → FTC → payment → policy booking → renewals.

**Advisor:** Matheesha Sarathchandra  
**CRM:** Alfred IMCRM (imcrm.alfred.ae)  
**WhatsApp Bridge:** Go (whatsmeow) + Python MCP server on localhost:8080

---

## Architecture (3-Layer)

| Layer | What | Notes |
|---|---|---|
| 1. Orchestrator | AGENTS.md | Reads intent → dispatches subagent |
| 2. 10 Subagents | `.claude/agents/` | Each has narrow scope, exact SOP steps |
| 3. Conventions | project-conventions skill | Auto-loaded rules, 7 feedback files |

### 10 Subagents

| Subagent | Trigger |
|---|---|
| lead-onboarder | New lead / REF_ID |
| document-filer | File/move documents |
| lead-updater | Status change |
| whatsapp-sender | Send follow-up/WhatsApp |
| ftc-drafter | FTC email / financial terms |
| policy-booker | Book policy |
| renewal-scanner | Renewal check |
| renewal-updater | Renewal update |
| daily-briefer | Morning briefing |
| pipeline-auditor | Inconsistency check |

---

## Directory Structure

```
Workspace/
├── PIPELINE.md          — Master dashboard (lead status, production, checklist)
├── RENEWALS.md          — Renewals pipeline (currently on April 2026)
├── tasks.md             — Task management with wikilinks
├── SYSTEM.md            — Full system documentation (810 lines)
├── REFERRALS.md         — Referral leads tracker
├── Leads/               — All lead files (166+ individual, group, motor, referrals)
│   ├── Leads.md         — Root index (only 1 entry)
│   ├── Health Insurance/
│   │   ├── Individual-Health-Insurance/  — 166 leads + index
│   │   └── Group-Health-Insurance/       — Group leads
│   ├── Motor Insurance/                  — Motor leads
│   ├── Lead-Context/
│   ├── Referral Leads/
│   ├── Renewals/Health Insurance/        — Monthly renewal folders (Jan-Dec)
│   └── recovered files/                  — Legacy scripts archive
├── Documents/           — 17 client document folders
├── Renewals/            — Individual renewal files
│   └── May/             — May 2026 renewals
├── Knowledge Base/      — Insurer underwriting notes
├── Plans/               — 20+ plan files with pricing
├── Networks/            — Network provider lists (Excel)
├── SOPs/                — Standard operating procedures (5 files)
├── Sales Reports/       — CRM CSV exports + plan data
├── Reports/             — Generated reports
├── daily/               — Daily activity logs
└── .obsidian/           — Obsidian vault config
```

**Total files:** ~275 .md files + Excel files, scripts, JSON, images

---

## Key Observations

### ✅ What's Strong

1. **Full lifecycle coverage** — Lead creation → WhatsApp → quoting → FTC → booking → renewals. All automated.
2. **Wikilink graph** — Every lead, renewal, and task is cross-linked. The graph is navigable and bidirectional.
3. **WhatsApp bridge works** — Go (whatsmeow) + Python MCP server. Messages archived in SQLite for compliance.
4. **Plans library is comprehensive** — 400+ plans across 20+ insurers with pricing and co-pay details.
5. **Real usage patterns** — Files are actively maintained. This is a live operational system.
6. **Document management is clean** — Consistent naming, per-client folders, document checklists in lead files.

### ⚠️ What Needs Attention

1. **PIPELINE.md table formatting is broken** — Rows are jumbled together in the New Leads section. Multiple REF-IDs on same line.
2. **RENEWALS.md is on April 2026** — It's June 1. April data in the master file, but May renewals exist in `Renewals/May/`.
3. **Very old leads still in "New Leads"** — Leads from April/May 2025 (over a year old) are still listed as "Await WhatsApp response."
4. **Root Leads.md index has only 1 entry** — The main index file shows only 1 lead while Individual-Health-Insurance.md has 166.
5. **May production is thin** — 0 new business booked, 0 renewals renewed. Just 1 group addition (2,251 AED).
6. **Possible test/placeholder names** — "AAA AAA", "aaaaa omer", "Oiu Kjhg" — may be legitimate but stand out.
7. **Maintenance surface area is large** — 275 files, 10 agents, WhatsApp bridge, CDP scripts, IMCRM integration. Many failure points.
8. **Pipeline auditor likely hasn't run recently** — Stale leads, orphaned references probably exist.

### 🔍 Data Snapshot (from PIPELINE.md)

| Metric | Value |
|---|---|
| New Business Booked (May) | 0 |
| Group Additions (May) | 1 policy — 2,251 AED |
| Renewals Booked (May) | 0 |
| **Total May Production** | **1 policy — 2,251 AED** |
| New Business Booked (April) | 3 policies |
| Renewals Booked (April) | 1 policy — 9,162.56 AED |
| April Renewal Premium Due | 57,098.06 AED (8 policies) |

### Pipeline Leads by Status (estimated from PIPELINE.md)

- **New Leads (waiting response):** ~50+
- **Quoted / In Progress:** ~15+
- **Payment Stage:** ~5+
- **Policy Booked:** ~10+
- **Renewals tracked:** ~25+ across monthly folders

---

## Summary

A genuinely working AI sales assistant — not a demo. Structurally well-designed with real operational discipline. The main gaps are **pipeline maintenance** (formatting, stale data, month rollover) rather than fundamental design issues. A focused cleanup session would bring everything back to sharp.
