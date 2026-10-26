# Agent Architecture Redesign — Design Spec
**Date:** 2026-05-04
**Status:** Approved for implementation

---

## Problem

The 4 most-used daily workflows (CRM data pull, Gmail lead check, WhatsApp history read, CRM status update) are implemented as **inline skills** that execute inside the main Claude session. This means:

- Raw CRM HTML, Gmail thread content, and WhatsApp message dumps load into the main conversation context and stay there permanently
- Every subsequent message costs more tokens because the context is larger
- The lead onboarding flow hits the CRM multiple times for the same lead across different steps
- Monthly token limits are being hit faster than expected

---

## Solution

Reorganize all agents into a **3-tier architecture** and convert the 4 inline skills into proper isolated subagents.

---

## Architecture

```
Claude (orchestrator — never reads raw external data)
│
├── TIER 1: Data Fetchers
│   ├── crm-reader          (new)
│   ├── gmail-checker       (new)
│   ├── whatsapp-reader     (new)
│   └── crm-status-updater  (new)
│
├── TIER 2: Action Agents
│   ├── lead-onboarder      (refactored — pipeline orchestrator)
│   ├── lead-updater        (unchanged)
│   ├── whatsapp-sender     (unchanged)
│   ├── ftc-drafter         (unchanged)
│   ├── policy-booker       (unchanged)
│   ├── document-filer      (unchanged)
│   └── renewal-updater     (unchanged)
│
└── TIER 3: Reporters (read-only)
    ├── daily-briefer       (unchanged)
    ├── pipeline-auditor    (unchanged)
    └── renewal-scanner     (unchanged)
```

**Golden rule:** Claude only ever receives clean summaries. Raw CRM data, Gmail thread content, and WhatsApp message history never enter the main session context.

---

## Tier 1: New Data Fetcher Agents

### `crm-reader`
- **Input:** REF_ID (any format — short code, HEA-XXXXXXXX, or full URL)
- **Action:** Runs `Scripts/get_lead_detail.js` once for the given REF_ID
- **Returns:** Structured lead summary — name, DOB, members, category, email, mobile (corrected to 971 prefix)
- **Does NOT write:** Any files or pipeline entries
- **Replaces:** `alfred-crm` inline skill

### `gmail-checker`
- **Input:** None (checks today's date automatically)
- **Action:** Searches Gmail for new health insurance leads assigned to Matheesha Sarathchandra
- **Returns:** List of new REF_IDs with client names — nothing else
- **Does NOT write:** Any files
- **Replaces:** `alfred-lead-checker` inline skill

### `whatsapp-reader`
- **Input:** Phone number or lead name
- **Action:** Queries SQLite messages database (`Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db`) or MCP tools if available
- **Returns:** Conversation summary — last message date, message count, status assessment (responsive / no response / interested / not interested)
- **Does NOT write:** Any files
- **Replaces:** `whatsapp-lead-checker` inline skill

### `crm-status-updater`
- **Input:** REF_ID + new status string (e.g., "Followed Up")
- **Action:** Navigates IMCRM, selects the new status from dropdown, clicks the confirm/change button to save
- **Returns:** Confirmation that status was saved in CRM
- **Does NOT write:** Local lead files (that is lead-updater's job)
- **Replaces:** `alfred-lead-status-update` inline skill
- **Note:** Must click confirm button — selecting the dropdown alone does not save

---

## Tier 2: Lead Onboarding Pipeline (Refactored)

The `lead-onboarder` agent becomes a true pipeline orchestrator. CRM data is fetched **once** and passed to all downstream steps internally.

### Old flow (today)
1. User says "onboard HEA-XXXX"
2. Alfred-crm skill runs inline → CRM data enters main context
3. Lead file created
4. Alfred-lead-status-update skill runs inline → more CRM work in main context
5. WhatsApp message shown to user
6. All CRM data remains in context for the rest of the conversation

### New flow
1. User says "onboard HEA-XXXX"
2. Claude dispatches to `lead-onboarder` subagent (isolated session)
3. Inside `lead-onboarder`:
   - Runs `Scripts/get_lead_detail.js` once — data stays inside subagent
   - Creates `Workspace/Leads/[REF_ID]-[First]-[Last].md`
   - Adds lead to `Workspace/PIPELINE.md` under New Leads
   - Prepares WhatsApp welcome message (using salutation rules from SOP)
   - Calls `crm-status-updater` to mark as Followed Up in IMCRM
   - Note: Documents folder is NOT created at onboarding — only created by `document-filer` when actual documents are provided
4. Returns to Claude: "Lead onboarded. Here's the WhatsApp message: [message text]"
5. Claude shows user the WhatsApp message for review and sending

CRM data is fetched, used, and discarded inside the subagent. Main session only sees the final summary.

### Parallel onboarding
When multiple leads arrive on the same day, `lead-onboarder` is dispatched in parallel for each REF_ID simultaneously (using `superpowers:dispatching-parallel-agents`). All leads onboard at the same time instead of sequentially.

---

## Tier 3: Reporters (Unchanged)

`daily-briefer`, `pipeline-auditor`, and `renewal-scanner` are read-only agents that work from local markdown files. No changes needed — they already don't load external data into the main session.

---

## CLAUDE.md Changes Required

### 1. Update delegation table — add Tier 1 agents

| User says... | Dispatch |
|---|---|
| "Details / info for [REF_ID]" | `crm-reader` |
| "Check Gmail / any new leads in email" | `gmail-checker` |
| "WhatsApp history / conversation with [client]" | `whatsapp-reader` |
| "Update CRM status for [REF_ID]" | `crm-status-updater` |

### 2. Remove retired inline skills

Remove from "Available Skills" section:
- `alfred-crm` — retired, replaced by `crm-reader` subagent
- `alfred-lead-checker` — retired, replaced by `gmail-checker` subagent
- `alfred-lead-status-update` — retired, replaced by `crm-status-updater` subagent
- `whatsapp-lead-checker` — retired, replaced by `whatsapp-reader` subagent

### 3. Add golden rule to orchestrator section

> Claude never reads raw CRM data, Gmail threads, or WhatsApp message history directly into the main session. All data fetching goes through Tier 1 subagents. Claude only receives summaries.

---

## Files to Create

| File | Purpose |
|---|---|
| `.claude/agents/crm-reader.md` | New Tier 1 agent |
| `.claude/agents/gmail-checker.md` | New Tier 1 agent |
| `.claude/agents/whatsapp-reader.md` | New Tier 1 agent |
| `.claude/agents/crm-status-updater.md` | New Tier 1 agent |
| `.claude/agents/lead-onboarder.md` | Refactored (pipeline orchestrator) |
| `CLAUDE.md` | Updated delegation table + golden rule |

---

## Files to Retire

| Asset | Action |
|---|---|
| `alfred-crm` skill | Remove from CLAUDE.md Available Skills section |
| `alfred-lead-checker` skill | Remove from CLAUDE.md Available Skills section |
| `alfred-lead-status-update` skill | Remove from CLAUDE.md Available Skills section |
| `whatsapp-lead-checker` skill | Remove from CLAUDE.md Available Skills section |

---

## Success Criteria

- Main Claude session never contains raw CRM HTML, Gmail thread bodies, or WhatsApp message dumps
- A full lead onboarding (CRM pull + file creation + pipeline update + WhatsApp message + CRM status update) completes with one subagent dispatch
- Multiple leads can be onboarded in parallel
- Monthly token usage decreases measurably compared to current inline skill usage
