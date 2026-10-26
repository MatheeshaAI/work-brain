---
type: concept
sources: ["raw/20_AI-and-Agents/Sales_OS_Opencode_Session.md", "raw/20_AI-and-Agents/whatsaoo agent sessinon.md", "raw/20_AI-and-Agents/send-whatsapp.md", "raw/work_os system designing documents/01_DAILY_COMMANDS/WhatsApp_Setup.md", "raw/work_os system designing documents/00_ORIGINALS/README (2).md", "raw/work_os system designing documents/04_AUTOMATION/WhatsApp_Notion_Integration.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Full_System_Documentation.md", "raw/work_os system designing documents/05_CODE/drafter.py", "raw/work_os system designing documents/05_CODE/analyzer.py"]
updated: 2026-10-22
tags: [whatsapp, approval, architecture, agents]
summary: "The owner's rule for agent-written client messages: the agent drafts, the human approves, then it sends - never an instant auto-reply."
---
# Draft and approve messaging flow

The owner's rule for agent-written client messages: **the agent drafts, the human approves, then it sends** - never an instant auto-reply. Stated in [[Sales_OS_Opencode_Session]] (31 Jan 2026) and planned for [[Leads Folder Sales Agent]].

## Planned flow (design intent)
1. Client message reaches the VPS through an [[Evolution API]] webhook.
2. The agent analyses it (sentiment, stage, requirements) and drafts a reply for the pipeline stage.
3. The draft is saved to a shared database and shown on every device (home laptop and office desktop) through a web UI.
4. The owner reads it, edits it, or asks the agent to rewrite or add detail.
5. On approval the agent sends through the same API. Sending is delayed, never automatic.
Open question in the plan: whether to auto-send after a timeout; the owner's wording implies strictly manual.

## Why
Messages carry money, health and trust risks, and the owner's real failure is forgetting follow-ups, not writing them. So the agent mainly reminds and drafts. This is an instance of [[Approval gates]]; the queue idea matches [[Pending reply drafts]].

## Contrast
[[send-whatsapp]] sends immediately; the Claude Code tutorial in [[WhatsApp AI agent build recipe]] answers automatically with an optional per-chat human toggle. Neither has a draft-approval step.

## Work OS variants of the same rule
The work_os folder repeats the draft-then-approve rule in three designs: the FastAPI endpoints `GET /api/drafts`, `PUT /api/drafts/{id}` (edit), `POST /api/drafts/{id}/approve`, `POST /api/drafts/{id}/refine` (ask the AI to redraft with instructions) and `DELETE` (discard) ([[WhatsApp Agent MVP Setup Guide]]); the Notion variant where a `DraftMessage` property is reviewed and an `Approved` checkbox triggers the send ([[WhatsApp MVP and Notion Integration]], [[Work OS Full System Documentation]]); and the CRM-and-Gmail variant where the draft is shown in the CLI or Notion before automation sends it ([[Browser Automation for CRM and Gmail]]). The FTC email adds a second gate, written client confirmation before the payment link ([[FTC email confirmation flow]]). Failure mode documented: if the AI call fails the MVP falls back to a default neutral draft rather than sending nothing.

## How the saved code implements the drafting half
The archived `drafter.py` is the drafting side of this flow: it takes the analysis dict, the current stage and the original message, and returns a draft string, plus a `refine_message` that takes an instruction and returns `{message, reasoning}`. The approval half is not in the archive - there is no server, no draft store and no approve endpoint, only the endpoint list in the setup guide.

What the code adds is the **failure contract**: when the AI client is missing or raises, drafting returns a fixed acknowledgement and refining returns the original text unchanged. The flow still produces a draft, so the human gate still applies - see [[Safe fallback defaults]] and [[Health Insurance Sales Agent Python Code]].
