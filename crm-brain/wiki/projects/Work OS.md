---
type: project
sources: ["raw/work_os system designing documents/MASTER_INDEX.md", "raw/work_os system designing documents/requirements.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Full_System_Documentation.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/AI_OS_Architecture.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/PLANNING.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/05_CODE/start.py", "raw/work_os system designing documents/05_CODE/analyzer.py", "raw/work_os system designing documents/05_CODE/drafter.py", "raw/work_os system designing documents/05_CODE/stage_detector.py"]
updated: 2026-10-22
tags: [project, work-os, ai-os, sales, whatsapp, design-docs, code]
status: "design set (Jan to Feb 2026); a seven-file Python fragment exists in 05_CODE; most components documented, not built"
summary: "The umbrella design effort behind the 'work_os system designing documents' folder: an AI operating system for a solo UAE health-insurance advisor, built from numbered design folders and an archive of planning sessions."
---
# Work OS

An AI operating system for one health-insurance advisor, designed between 31 January and February 2026. "Work OS" is the folder name and the name used in this wiki; the documents call it variously the Sales OS, the Health Insurance Sales Agent System, PKM_System/ClaudeClaw-lite and the AI OS. The index is [[Work OS Master Index]].

## What it is meant to do
Take the advisor's daily channels (WhatsApp, calls, email, a custom CRM) and: capture every conversation, track the 20-stage pipeline, draft messages for approval, match hospitals to networks, and stop leads being lost to forgotten follow-ups ([[Negotiation stage stalls]]). Framed against the nine AI OS components in [[AI OS 9 Components Guide for Insurance]].

## The parts, and where they stand
| Part | Design source | Status |
|---|---|---|
| Sales agent with 20-stage pipeline | [[Health Insurance Sales Agent Plan (Jan 2026)]], [[Sales Agent Requirements Conversation Log]] | planned; see [[Leads Folder Sales Agent]] |
| Expert persona prompt | [[Health Insurance Expert System Prompt]] | written (a prompt, not a result) |
| WhatsApp approval MVP (FastAPI + Evolution API) | [[WhatsApp Agent MVP Setup Guide]] | working skeleton; analyzer, drafter, stage detector are stubs |
| Node/Notion/whatsapp-web.js stack | [[Work OS Full System Documentation]], [[WhatsApp MVP and Notion Integration]] | documented, not built |
| ClaudeClaw-style remote Claude Code | [[ClaudeClaw Rebuild Prompt]] | reference spec |
| CRM and Gmail browser automation | [[Browser Automation for CRM and Gmail]], [[Sales Automation Notes]] | quote extraction by Claude-in-Chrome works; full automation not built |
| Network lookup agents | [[TPAs and Networks Reference (Work OS)]] | designed; JSON template empty |
| Insurance knowledge base | [[UAE Health Insurance Plan Structure and Pricing]], [[Health Insurance Sales Frameworks]], [[Required Documents for Policy Submission]] | written knowledge notes |
| CRM daily guide | [[IMCRM CRM Guide]] | in use |
| Python core (config, menu, setup, AI wrappers) | [[Health Insurance Sales Agent Python Code]] | seven files exist in `05_CODE/`; not runnable as archived |
| Streamlit dashboard | [[Streamlit]] | not started |

## Chronology (as far as the notes show)
1. 31 Jan 2026: two OpenCode sessions plan the agent and the Evolution API approval workflow ([[Sales_OS_Opencode_Session]], [[whatsaoo agent sessinon]]); planning files are saved.
2. Early 2026: WhatsApp MVP setup guide, Node/Notion and browser-automation notes, ClaudeClaw reference.
3. February 2026: the AI OS gap analysis ("last updated February 2026").
4. After that, the practical work moved to other stacks: [[WhatsApp automation stack]] (Baileys, whatsapp-mcp, bridge server), the [[Sales System]] hourly audit and the [[IMCRM Data Extractor]].

## Contradictions and open questions
- Pipeline: 20 stages here versus 16 in [[Insurance CRM pipeline]]. The code in `05_CODE/` uses a **19-stage** list (Allocated dropped), so three counts are now in play - see [[Stage detection rules]].
- Two WhatsApp routes (Node whatsapp-web.js versus Python Evolution API); the owner never states which won, and later notes use Baileys.
- "No API keys" (original requirement) versus Evolution API keys (later decision).
- Tier vocabulary: Basic/Silver/Gold/Platinum in the prompt versus Basic/Basic Enhanced/Enhanced in the knowledge notes. `config.py` repeats the prompt's four-tier list and adds a fifth vocabulary of its own in `NETWORK_PROVIDERS`, which lists insurers and legacy names instead of the eight networks.
- **The saved code is not the described code.** The MVP guide says `python main.py` starts a FastAPI server on port 8000; the archived `main.py` is a console menu with every option marked "coming soon". See [[Health Insurance Sales Agent Python Code]].

## What the code actually contributes
`05_CODE/` holds a settings module with the CRM's controlled vocabularies (19 pipeline stages, 24 insurers, objection types, document types, statuses), a console menu, a setup wizard, and three thin AI wrappers with fixed fallbacks ([[Safe fallback defaults]]). Its most reusable content is the domain data in `config.py`; its most reusable pattern is the [[Stage detection rules]] order.

## Folder duplication
`02`, `04`, `06` and `07` folders are renamed copies of `00_ORIGINALS`; several originals also exist in `raw/` and are covered by their own pages (production-agent tutorial, Strawberry Browser chat, Memorae chatbot, multi-agent TPA structure, network database design). The seven Python files in `05_CODE/` are byte-identical to their `00_ORIGINALS` copies, and the work_os root also holds an empty `whatsapp-mvp/` folder.

Verified by MD5 across all 25 numbered files: **22 are byte-identical to their `00_ORIGINALS` copy; 3 differ** - `Companies.md`, `Plans.md` and `TPAs_and_Networks.md`, where the numbered version is the edited one (the company roster gains its explanation, the plan structure gains the pricing tables, the TPA list gains the summary table and the JSON template). The full file-by-file map is on [[Work OS duplication map]].

## The design set's four layers (2026-10-22 ingest)
Reading the folder as a whole, it stacks four things: an **operating model** ([[AI OS architecture]] - the nine components and their wiring), an **implementation plan** ([[Planning document]] - 20 stages, modules, file tree, phases), a **build specification** ([[Rebuild prompt]] - the prompt-as-spec genre), and the **automation layer** ([[Sales Automation]] - the Node service, the WhatsApp MVP, the Notion outbox and the browser-driven CRM). The reference material in `06` is where the product thinking lives: [[Sales AI Team]], [[WhatsApp Personal Assistant Chatbot - Memorae]].

Related: [[Multiagent System]], [[Sales AI Team]], [[Insurance Sales Platform]], [[AI Operating System]], [[Sales Automation]].
