---
type: source
sources: ["raw/work_os system designing documents/02_SYSTEM_DESIGN/PLANNING.md", "raw/work_os system designing documents/00_ORIGINALS/PLANNING.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/System_Overview.md", "raw/work_os system designing documents/00_ORIGINALS/README.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/05_CODE/stage_detector.py"]
updated: 2026-10-22
tags: [planning, sales-agent, pipeline, modules, january-2026]
summary: "The complete plan for an AI agent that manages a 20-stage health-insurance pipeline, with six modules, a file layout, four build phases and success targets."
---
# Source: Health Insurance Sales Agent Plan (Jan 2026)

Two documents written on 31 January 2026 at the end of the [[Sales_OS_Opencode_Session]]: `PLANNING.md` (the full plan) and `System_Overview.md` / `README.md` (a plain-language status and "what do you want built first" note). All four paths are copies of two texts. The planned system is the [[Leads Folder Sales Agent]].

**Status at writing: "Planning complete, ready for development."** Nothing in these notes is built; the later MVP is described in [[WhatsApp Agent MVP Setup Guide]].

## The problem it targets
The advisor loses leads in stage 5 (In Negotiation) mainly by **forgetting to follow up**. Health insurance is complex and buyers take time, so the pattern is: quick buyers (quote, one or two questions, buy), slow buyers (many questions over weeks), comparison shoppers (check competitors, find prices are similar, return). See [[Negotiation stage stalls]].

## Pipeline as modelled (20 stages)
New Lead; Allocated (recommended for removal because bought leads already carry all data, so go straight to Followed Up); Followed Up; Quoted; In Negotiation (critical); Renewal Terms Received, Renewal Terms Sent, Pending BOR Request (renewal clients only); Application Pending; Missing Documents Requested; Application Submitted; KYC Cleared; Sent for Transaction Approval; Payment Link Sent To Customer; Payment Initiated; Payment Pending; Sale Leads (closed won); Policy Documents Pending; Policy Pending; Lost.

**Contradiction flagged:** this plan counts 20 stages (19 once Allocated is removed) while [[Insurance CRM pipeline]] documents a 16-stage pipeline and omits the three renewal-only stages. The session log itself labels the list "19 total" and then numbers 20 items. The work_os list is the CRM's stage set as seen by the advisor; the 16-stage page is a trimmed working version. See [[Lead pipeline stages]] for a third vocabulary.

## Stage-by-stage agent actions (design intent)
| Stage | Agent actions |
|---|---|
| 1 New Lead | pull data from the CRM, fill a WhatsApp template, send; if no answer on the call, ask for a convenient time or member details |
| 3 Followed Up | four follow-up types (no answer, after quote, negotiation, documents); count follow-ups; track the client's stated proceed date; lost rule = 3 to 5 follow-ups, or 5 follow-ups counted from the proceed date |
| 4 Quoted | analyse reaction time, objections, competitor mentions, budget signals; draft value-based messages; follow up after 48 hours |
| 5 In Negotiation | find alternative plans, create urgency, value messaging, competitor analysis |
| 9 to 16 Application to payment | track documents, flag missing ones, reminders; speed varies from fast (clean case) to very slow (BMI or pre-existing conditions, underwriting loading) |
| 17 Closed won | congratulations message, delivery plan, data for the CRM sales report |
| 18 to 19 Policy docs | track generation, delivery notice, upsell or cross-sell |
| 20 Lost | analyse chat for loss reasons, find patterns, win-back strategy; see [[Lost lead analysis]] |

## Six AI modules
1. Chat Intelligence: parse WhatsApp `_chat.txt` exports, sentiment and mood, buying signals, requirements (budget, hospitals, specialists), personal details, attachments.
2. Network and Plan Matcher: match preferred hospitals to networks, direct-specialist versus GP-referral plans, budget tiers, co-pay filters. See [[Finding a hospital in a network]].
3. Message Drafter: personalised WhatsApp follow-ups, educational content, objection handling.
4. Pipeline Advisor: next best action, timing, stuck-lead alerts, stage transitions with rationale.
5. Lost Lead Analyzer: loss reasons, patterns, win-back templates.
6. WhatsApp-to-Email Syncer without API keys: watch WhatsApp Web, forward chats to email, link to client records.

## Planned file layout
`Leads/agents/` (chat_analyzer, info_extractor, network_matcher, message_drafter, pipeline_advisor, lost_analyzer, agent_orchestrator), `integrations/` (whatsapp_connector, whatsapp_to_email, crm_connector), `knowledge/` (networks, plans, insurers, regulations, templates, objections as JSON), `data/` (clients, extracted, pipeline_tracking.json), `ui/` (Streamlit dashboard and client view), plus `system_prompt.txt`, `main.py`, `config.py`, `requirements.txt` ([[Work OS Master Index]]).

## What the code actually looks like (2026-10-22 ingest)
Seven Python files were written for this plan, saved in `05_CODE/`. They match the plan's *spirit* but not its layout: a flat set of `config.py`, `main.py`, `start.py`, `analyzer.py`, `drafter.py`, `stage_detector.py` and a package marker - no `agents/` folder, no `integrations/`, no `knowledge/` JSON, no `ui/`.

Two plan details survived intact. The console menu in `main.py` has exactly the six planned modules as its first six options, all marked "coming soon" - so the menu is the plan rendered as an interface. And `config.py` sets up the `knowledge/` JSON files the plan listed, expecting `networks.json`, `plans.json`, `insurers.json`, `regulations.json`, `templates.json` and `objections.json` (which matches [[Network database design]] and [[Lost lead analysis]]), plus a `system_prompt.txt` - this prompt.

One stage detail changed: the code's list has **19** stages, not 20, with Allocated dropped as recommended. See [[Health Insurance Sales Agent Python Code]], [[Insurance CRM pipeline]].

## Tech stack and phases
Python 3.10+, OpenAI GPT-4 or Anthropic Claude, Selenium or Playwright for WhatsApp Web, SQLite or JSON, Tesseract OCR, SMTP/IMAP, Streamlit or FastAPI with React. Phase 1 core (1 to 2 weeks), Phase 2 integrations (1 week), Phase 3 advanced AI (1 to 2 weeks), Phase 4 dashboard (1 week).

## Dashboard and client view (intent)
Pipeline overview of all stages, leads per stage, stuck leads, lost analysis, conversion metrics; per client: details, chat history, stage, AI suggestions, document tracking, timeline.

## Success targets
Cut stage-5 time by 30%, reduce lead drop-off by 50% via follow-ups, raise close rate by 20%, cut follow-up time by 80% and drafting time by 70%. These are aspirations, not measured results.

## What System_Overview adds
It lists the created assets (PLANNING, CONVERSATION_LOG, system_prompt) and the empty folder tree, then offers three next steps: start building one module, refine the plan, or test with a real client's chat. It asks four questions (build priority, test data, how to sync WhatsApp, how to reach the CRM: API credentials, sample data or manual copy). A live client case is mentioned by name in the source; it is not reproduced here.

## Caveats
- The plan assumes the 20-year-expert prompt: [[Health Insurance Expert System Prompt]].
- It names insurers (24) matching [[Health Insurance Companies]].
- The "Chinese or Japanese text" glitch in the planning chat is explained in [[Sales_OS_Opencode_Session]].

Related: [[Leads Folder Sales Agent]], [[Sales Agent Requirements Conversation Log]], [[Insurance Sales Pipeline - 16-Stage System]].
