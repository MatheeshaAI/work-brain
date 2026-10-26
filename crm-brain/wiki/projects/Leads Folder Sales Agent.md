---
type: project
sources: ["raw/20_AI-and-Agents/Sales_OS_Opencode_Session.md", "raw/20_AI-and-Agents/whatsaoo agent sessinon.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/PLANNING.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/System_Overview.md", "raw/work_os system designing documents/00_ORIGINALS/CONVERSATION_LOG.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/system_prompt.md", "raw/work_os system designing documents/01_DAILY_COMMANDS/WhatsApp_Setup.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/05_CODE/analyzer.py", "raw/work_os system designing documents/05_CODE/drafter.py", "raw/work_os system designing documents/05_CODE/stage_detector.py", "raw/work_os system designing documents/05_CODE/start.py"]
updated: 2026-10-22
tags: [project, sales-agent, whatsapp, evolution-api, planning, insurance, code]
status: "planned (31 Jan 2026); folder skeleton, planning files and a seven-file Python fragment exist; no working modules recorded"
summary: "A planned pipeline-aware sales agent that reads lead folders and chats, drafts WhatsApp follow-ups, and sends only after the owner approves."
---
# Leads Folder Sales Agent

**Goal.** An AI agent that sits over the owner's Leads folder (client details, WhatsApp chat exports, quotations), knows the CRM pipeline, and stops leads from being lost to forgotten follow-ups. Planned in two OpenCode sessions on 31 Jan 2026: [[Sales_OS_Opencode_Session]] and its fork [[whatsaoo agent sessinon]].

## Design intent (not built)
- **System prompt.** A health-insurance sales expert with 20 years of UAE experience.
- **Modules.** Chat intelligence (parse exports, find buying signals and objections), network and plan matcher, message drafter, pipeline advisor, lost-lead analyzer, and a WhatsApp-to-email syncer. Knowledge files: networks, plans, insurers, regulations, templates, objections. See [[Network database design]] and [[Insurance plan catalogue]].
- **Pipeline rules the owner gave.** Drop "Allocated" (bought leads arrive complete); follow up 48 hours after a quote; mark lost after 3-5 follow-ups, or 5 from the client's stated proceed date; Stage 5 (negotiation) is where leads stall. Compare [[Lead pipeline stages]] and [[Insurance CRM pipeline]].
- **Message path.** Evolution API webhooks into a VPS-hosted backend, AI drafts, owner reviews and edits on laptop or office desktop, then approves and the message is sent. See [[Draft and approve messaging flow]], [[Evolution API]], [[Approval gates]].
- **Phases.** Core functions (1-2 weeks), integrations (1), advanced AI (1-2), dashboard (1), testing (1). Later estimate for the approval system alone: 4-6 hours.

## Built facts
- A Leads folder with one sample client folder existed.
- Planning document, conversation log, system prompt text file, README and empty folder structure were written to the folder.
- **Seven Python files** were written for it in `05_CODE/`: a settings module holding the pipeline stages, insurers, tiers and status vocabularies; a console menu whose six options are exactly the six planned modules and whose every option prints "coming soon"; a setup wizard; and three thin AI wrappers (analyze, draft, detect stage) that depend on an AI client module not present in the archive. Detail: [[Health Insurance Sales Agent Python Code]].
- The `config.py` stage list is the owner's recommended 19 (Allocated removed), and the detector implements six ordered rules over the AI analysis ([[Stage detection rules]]).
- Nothing else is recorded.

## Relationships and open questions
- Successor and neighbour ideas: [[Sales AI Team]], [[Sales System]], [[Insurance Sales Platform]], [[WhatsApp Personal Assistant Chatbot (Memorae-inspired)]], and the WhatsApp stack in [[WhatsApp automation stack]].
- Open: which pipeline (16 or 20 stages) is authoritative - the code's 19 makes a third candidate; whether Evolution API or Baileys won; where the credentials the plan needs would be stored (see [[Automation guardrails]]). The saved code reads every key from the environment and stores no credential values.
- Privacy: the sample client folder name carries a person and a lead reference; neither is recorded in the wiki.

## Work OS documents for this project
The project's plan and requirements are also stored in the work_os folder and summarised in [[Health Insurance Sales Agent Plan (Jan 2026)]] (modules, phases, file layout), [[Sales Agent Requirements Conversation Log]] (the interview), [[Health Insurance Expert System Prompt]] (the persona) and [[WhatsApp Agent MVP Setup Guide]] (the FastAPI/Evolution API skeleton). Status update from [[Work OS Master Index]]: the WhatsApp MVP is a "working skeleton" while the analyzer, drafter and stage detector are stubs, so the earlier line here that no working modules are recorded should be read as "skeleton only". The saved code confirms this and adds the detail that the skeleton is incomplete: the FastAPI server, the database layer and the AI client are not in the archive, and the file named `main.py` is a text menu rather than the server ([[Health Insurance Sales Agent Python Code]]). Umbrella project: [[Work OS]]. Planned modules include [[Lost lead analysis]]; the core pain is [[Negotiation stage stalls]]. Stage count: the plan keeps 20 stages while [[Insurance CRM pipeline]] has 16 and the code has 19.
