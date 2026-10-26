---
type: source
sources: ["raw/work_os system designing documents/00_ORIGINALS/README (2).md", "raw/work_os system designing documents/01_DAILY_COMMANDS/WhatsApp_Setup.md", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/05_CODE/start.py", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/analyzer.py", "raw/work_os system designing documents/05_CODE/drafter.py", "raw/work_os system designing documents/05_CODE/stage_detector.py"]
updated: 2026-10-22
tags: [whatsapp, evolution-api, fastapi, mvp, setup, approval]
summary: "Setup and operating guide for the FastAPI WhatsApp health-insurance agent: Evolution API webhook in, AI draft, human approval, send; with endpoints, file tree, VPS deployment and troubleshooting."
---
# Source: WhatsApp Agent MVP Setup Guide

Two near-identical documents: the project README (`README (2).md`) and the "daily commands" version (`WhatsApp_Setup.md`, a technical guide). Together they describe the MVP of the [[Leads Folder Sales Agent]]. This is the **setup instruction set**; it does not record a run.

## What it does (design)
Receives WhatsApp messages from [[Evolution API]] by webhook, has an AI (OpenAI or Anthropic) analyse sentiment, intent and pipeline stage, drafts a personalised reply, stores it as **pending approval** in SQLite, and sends it only after the owner approves. See [[Draft and approve messaging flow]].

## Setup flow
1. Copy `.env.example` to `.env` and set: Evolution API URL, key and instance name; `AI_PROVIDER` (`openai` or `anthropic`); the matching key; `AI_MODEL` (the examples are a GPT-4 turbo preview and a Claude Sonnet 4.6 name). **The guide asks for secrets in a `.env`; none are shown.**
2. `pip install -r requirements.txt` ([[Work OS Master Index]] lists the dependencies).
3. `python start.py` checks Python 3.10+, installs requirements, creates directories, sets up `.env`.
4. `python main.py` starts the server on port 8000.

## Endpoints
| Endpoint | Purpose |
|---|---|
| GET `/`, `/health` | health checks |
| POST `/webhook/whatsapp` | receive messages from Evolution API |
| GET `/api/drafts`, GET `/api/drafts/{id}` | list or fetch drafts |
| PUT `/api/drafts/{id}` | edit a draft |
| POST `/api/drafts/{id}/approve` | approve and send |
| POST `/api/drafts/{id}/refine` | ask the AI to redraft with instructions |
| DELETE `/api/drafts/{id}` | discard |

## Message flow
WhatsApp message, Evolution API, webhook to the server, AI analysis (sentiment, intent, stage), AI draft, saved as pending, owner reviews by API or dashboard, then **approve** (send), **refine** (redraft, then approve) or **discard**.

## Stage detection
The agent infers which pipeline stage a client is in from the message: New Lead (first contact asking for a quote), Followed Up, Quoted, In Negotiation (price objections, competitor comparisons), Missing Documents Requested, Payment Link Sent, and the rest of the 20 stages ([[Health Insurance Sales Agent Plan (Jan 2026)]]).

## Testing
Curl a fake `MESSAGES_UPSERT` payload to the webhook, list drafts, approve draft 1, refine draft 1 with "make it more urgent and mention price match". The sample number is a placeholder.

## Deployment on a Hostinger VPS
Upload the folder, install, set `.env`, register the webhook with Evolution API (events `MESSAGES_UPSERT`, `MESSAGES_UPDATE`, `SEND_MESSAGE`), then run under **systemd** (`whatsapp-agent.service`, restart always). See [[Hostinger]] and [[VPS hosting for agent servers]].

## File structure
`config.py`, `main.py` (FastAPI), `start.py`, `core/` (webhook, message_handler), `integrations/` (evolution_api, ai_client), `ai/` (analyzer, drafter, stage_detector), `database/` (models, manager), `requirements.txt`, `.env.example`.

**Only part of this tree was saved.** `05_CODE/` holds `config.py`, `main.py`, `start.py` and the three AI wrappers, plus a package marker that shows the wrappers were copied out of the `ai/` folder. `core/`, `integrations/`, `database/`, `requirements.txt` and `.env.example` are not there, and neither is the FastAPI app: **the archived `main.py` is a console menu, not the server** - it prints a banner and an eight-option menu, with every option returning "Feature coming soon". `start.py` matches this guide well (Python 3.10 check, requirement imports, `.env` copy, the same three endpoints printed), but it references a `whatsapp_agent/` folder and a `requirements.txt` that do not exist in the archive. Detail: [[Health Insurance Sales Agent Python Code]].

## Troubleshooting (as documented)
"database is locked": delete the SQLite file and restart (this **loses drafts**); AI failures fall back to neutral sentiment and a default message; check Evolution API URL, key and instance; run imports from inside the folder; logs under `data/logs/`.

## Status and caveats
- Status: MVP skeleton. [[Work OS Master Index]] says analyzer, drafter and stage detector are stubs, so "complete WhatsApp agent" in the README is optimistic. The saved code agrees: the analyzer and drafter delegate to an AI client module that is absent, and the stage detector implements six rules that can reach only seven of the nineteen stages it lists ([[Stage detection rules]]).
- **Stage detection, as implemented.** The detector reads the analysis dict and applies a fixed rule order - ask-for-quote plus new-lead type, question plus follow-up type, a quote topic, an objection intent, then document/payment topics - with "assume Followed Up" as the default and New Lead on an exception. It cannot produce renewal, KYC, transaction-approval, payment, sale, policy or lost stages.
- **Failure behaviour is a fixed default, not an error.** A missing or failing AI call returns a neutral analysis, a generic acknowledgement, or the original text, so the pipeline keeps running; the fallback is indistinguishable from a real result in the output itself ([[Safe fallback defaults]]).
- The README states the guides were "built for health insurance agents in UAE"; the default systemd paths and `your-user` are placeholders.
- It relies on Evolution API (a third-party gateway on a linked personal number), which has different ban and stability risks from official WhatsApp Business; see [[WhatsApp Business]] and [[WhatsApp automation stack]].
- Conflicts with the older no-API-key requirement in [[Sales Agent Requirements Conversation Log]]; the later decision used an API gateway.
- `config.py` reads every key from the environment and stores no credential values; the archived code contains none.

Related: [[whatsaoo agent sessinon]], [[WhatsApp MVP and Notion Integration]].
