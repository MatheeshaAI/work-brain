---
type: concept
sources: ["raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md"]
updated: 2026-10-22
tags: [agents, architecture, design, crm]
summary: "The three-tier agent design - data fetchers, action agents, reporters - where the orchestrator never sees raw external data."
---
# Tiered agent architecture

A design for splitting the desk's daily automation into three tiers of agents, so that the main session only ever sees summaries. Dated **2026-05-04**, status "Approved for implementation" - **design intent, not a confirmed build**.

## The three tiers
| Tier | Agents | Role |
|---|---|---|
| 1 - Data fetchers | `crm-reader`, `gmail-checker`, `whatsapp-reader`, `crm-status-updater` | Pull one specific thing from one external system and return a clean summary |
| 2 - Action agents | `lead-onboarder`, `lead-updater`, `whatsapp-sender`, `ftc-drafter`, `policy-booker`, `document-filer`, `renewal-updater` | Do the work, each owning one step of a sales workflow |
| 3 - Reporters | `daily-briefer`, `pipeline-auditor`, `renewal-scanner` | Read local markdown and report; already isolated |

The orchestrator (Claude) sits above all three and dispatches. It never reads raw CRM HTML, Gmail thread bodies or WhatsApp history. See [[Context isolation]].

## The problem it solves
The four most-used workflows - CRM pull, Gmail lead check, WhatsApp history read, CRM status update - ran as **inline skills inside the main session**. Consequences stated in the spec: raw external data stays in the context permanently, every later message costs more, one lead is pulled from the CRM several times across onboarding steps, and monthly token limits are hit faster than expected.

## The Tier 1 contracts
| Agent | Input | Output | Writes? |
|---|---|---|---|
| `crm-reader` | a lead reference in any form | structured summary: name, date of birth, members, category, email, mobile | no files, no pipeline entries |
| `gmail-checker` | today's date | list of new lead references with client names | no files |
| `whatsapp-reader` | phone number or lead name | conversation summary: last message date, message count, status assessment | no files |
| `crm-status-updater` | reference + new status | confirmation that the status saved | no local lead files |

Note the shape: **every Tier 1 agent is read-only or write-only-to-the-CRM, and none of them writes a local file.** Local file creation belongs to Tier 2.

## Onboarding as a pipeline inside one subagent
`lead-onboarder` fetches the CRM data **once** and passes it down the steps inside the subagent: create the lead file, add it to the pipeline, prepare the WhatsApp welcome message, update the CRM status. The orchestrator then shows the message for review before it is sent - see [[Approval gates]]. **Document folders are created by `document-filer`, not at onboarding**, so a lead that never sends documents never gets an empty folder.

Several leads can be onboarded in parallel, one dispatch each.

## Success criteria as written
- The main session never contains raw CRM, Gmail or WhatsApp data.
- A full onboarding completes with **one** subagent dispatch.
- Several leads onboard in parallel.
- Monthly token usage drops measurably.

## Caveats
- Nothing confirms the agents were built; the spec only says "approved for implementation".
- It is a **redesign of skills already in use** - the four inline skills are supposed to be retired and replaced by Tier 1 agents, which is an organisational change as much as a technical one.
- It cites the whatsapp-mcp store path, which shows the WhatsApp stack had already moved past the Baileys generation. See [[WhatsApp automation stack]].

Related: [[Context isolation]], [[Agent architecture redesign spec]], [[Multi-agent systems]], [[Approval gates]], [[Agent loop]].
