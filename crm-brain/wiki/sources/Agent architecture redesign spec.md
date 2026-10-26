---
type: source
sources: ["raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md"]
updated: 2026-10-22
tags: [agents, architecture, design, crm, context]
summary: "Design spec for a 3-tier agent architecture that keeps raw CRM, Gmail and WhatsApp data out of the main session."
---
# Source: Agent architecture redesign spec

Original file: [[raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md|2026-05-04-agent-architecture-redesign-design.md]]. Dated **2026-05-04**, status "Approved for implementation". A design spec, not a record of a build.

## The problem it states
The four most-used daily workflows - CRM data pull, Gmail lead check, WhatsApp history read, CRM status update - ran as **inline skills inside the main Claude session**. The stated consequences:
- Raw CRM HTML, Gmail thread bodies and WhatsApp message dumps load into the main context and stay there permanently.
- Every later message costs more tokens because the context is bigger.
- Lead onboarding hits the CRM several times for the same lead across different steps.
- Monthly token limits are being hit faster than expected.

## The solution (design intent)
Reorganise everything into a **3-tier architecture** and turn the four inline skills into isolated subagents.

```
Claude (orchestrator - never reads raw external data)
├── TIER 1: Data Fetchers      crm-reader, gmail-checker, whatsapp-reader, crm-status-updater
├── TIER 2: Action Agents      lead-onboarder, lead-updater, whatsapp-sender, ftc-drafter,
│                               policy-booker, document-filer, renewal-updater
└── TIER 3: Reporters          daily-briefer, pipeline-auditor, renewal-scanner
```

**The golden rule:** Claude only ever receives clean summaries. Raw CRM data, Gmail thread content and WhatsApp message history never enter the main session context. Concept: [[Context isolation]].

## Tier 1 contracts (as specified)
| Agent | Input | Action | Returns | Writes? |
|---|---|---|---|---|
| `crm-reader` | a lead reference in any form (short code, full ID, URL) | runs the lead-detail extraction script **once** | structured summary: name, date of birth, members, category, email, mobile | no files, no pipeline entries |
| `gmail-checker` | none - uses today's date | searches Gmail for new health leads assigned to the advisor | list of new references with client names | no files |
| `whatsapp-reader` | phone number or lead name | queries the WhatsApp bridge SQLite store (or MCP tools) | conversation summary: last message date, message count, status assessment (responsive / no response / interested / not interested) | no files |
| `crm-status-updater` | reference + new status | navigates the CRM, selects the status, **clicks confirm** | confirmation that the status saved | no local lead files |

Each replaces one inline skill of the same job (CRM pull, Gmail check, CRM status update, WhatsApp history).

## Tier 2: the onboarding pipeline
`lead-onboarder` becomes a true pipeline orchestrator - CRM data is fetched **once** and passed to all downstream steps inside the subagent:
1. Run the extraction script once; the data stays inside the subagent.
2. Create the lead file under `Workspace/Leads/`.
3. Add the lead to `Workspace/PIPELINE.md` under New Leads.
4. Prepare the WhatsApp welcome message using the salutation rules from the SOP.
5. Call `crm-status-updater` to mark the lead as Followed Up in the CRM.
6. **Do not create the documents folder at onboarding** - only `document-filer` does that, when documents actually arrive.

The orchestrator then shows the user the message for review and sending. That review step is an [[Approval gates]] example in the sales workflow.

**Parallel onboarding:** when several leads arrive on the same day, `lead-onboarder` is dispatched for each reference at the same time.

## Tier 3
`daily-briefer`, `pipeline-auditor` and `renewal-scanner` stay as they are: read-only agents that work from local markdown files and already keep external data out of the main session.

## Required project-file changes
- Extend the delegation table with the four Tier 1 agents ("details for X" -> `crm-reader`, "check Gmail" -> `gmail-checker`, "WhatsApp history" -> `whatsapp-reader`, "update CRM status" -> `crm-status-updater`).
- Retire four inline skills from the documented skill list: the CRM pull, the Gmail lead check, the CRM status update, and the WhatsApp history check.
- Add the golden rule to the orchestrator section.
- Create four agent definition files plus a refactored `lead-onboarder`, and update the project instruction file.

## Success criteria as written
- The main session never contains raw CRM HTML, Gmail thread bodies or WhatsApp message dumps.
- A full onboarding (pull, file creation, pipeline update, message, status update) completes with **one** subagent dispatch.
- Several leads can be onboarded in parallel.
- Monthly token usage drops measurably.

## Caveats
- **Status is intent.** The spec says "Approved for implementation"; nothing in this scope confirms the agents were built or that the inline skills were removed. The whatsapp-mcp path it cites (`Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db`) does show that the WhatsApp stack had already moved on from the Baileys generation - see [[WhatsApp automation stack]].
- It is also the clearest statement in the vault of the same idea as [[Context engineering]] and [[Stage contracts and review gates]].

Related: [[Tiered agent architecture]], [[Context isolation]], [[Approval gates]], [[Multi-agent systems]], [[IMCRM]].
