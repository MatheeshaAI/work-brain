---
type: source
sources: ["raw/work_os system designing documents/MASTER_INDEX.md", "raw/work_os system designing documents/requirements.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/05_CODE/start.py", "raw/work_os system designing documents/05_CODE/analyzer.py", "raw/work_os system designing documents/05_CODE/drafter.py", "raw/work_os system designing documents/05_CODE/stage_detector.py", "raw/work_os system designing documents/05_CODE/__init__.py"]
updated: 2026-10-22
tags: [work-os, index, build-status, dependencies]
summary: "The entry-point index of the 'work_os system designing documents' folder, its numbered layout, its self-reported build status, and the Python dependency list."
---
# Source: Work OS Master Index and requirements

The top-level index of the [[Work OS]] design folder ("Open this first"), plus the dependency pin list for the Python build. The folder is a reorganised set of January to February 2026 design notes for an AI sales system for a UAE health-insurance advisor. It is an index of other notes, so most of the substance lives in the pages linked below.

## Folder layout (as the index defines it)
| Folder | Purpose | Wiki pages |
|---|---|---|
| `01_DAILY_COMMANDS` | the two things used day to day: CRM extraction and WhatsApp agent setup | [[IMCRM CRM Guide]], [[WhatsApp Agent MVP Setup Guide]] |
| `02_SYSTEM_DESIGN` | AI OS architecture, system overview, 20-stage plan, ClaudeClaw spec, multi-agent TPA design, system prompt | [[AI OS 9 Components Guide for Insurance]], [[Work OS Full System Documentation]], [[Health Insurance Sales Agent Plan (Jan 2026)]], [[ClaudeClaw Rebuild Prompt]], [[Health Insurance Expert System Prompt]] |
| `03_INSURANCE_KNOWLEDGE` | insurers, plans and pricing, TPAs and networks, MEDNET schema, CRM pricing data, sales frameworks, required documents | [[UAE Health Insurance Plan Structure and Pricing]], [[TPAs and Networks Reference (Work OS)]], [[Health Insurance Sales Frameworks]], [[Required Documents for Policy Submission]] |
| `04_AUTOMATION` | browser automation, FTC email patterns, WhatsApp MVP, WhatsApp plus Notion | [[Browser Automation for CRM and Gmail]], [[Sales Automation Notes]], [[WhatsApp MVP and Notion Integration]] |
| `05_CODE` | Python source files, referenced by the index | [[Health Insurance Sales Agent Python Code]] |
| `06_REFERENCE` | outside-inspired design material | existing source pages for the Strawberry Browser chat, the production-agent tutorial and the Memorae chatbot |
| `07_ARCHIVE` | the large session logs | [[Sales_OS_Opencode_Session]], [[whatsaoo agent sessinon]], [[Sales Agent Requirements Conversation Log]] |
| `00_ORIGINALS` | every file before reorganisation, "safe to delete once you're happy" | see "Duplicates" below |

## Code files listed (design intent, and now ingested)
`config.py` (settings), `main.py` (entry point and menu), `start.py` (setup wizard), `analyzer.py` (AI message analysis), `drafter.py` (message generation), `stage_detector.py` (pipeline stage detection). The index says the folder is in `05_CODE/`, and the seven files are indeed there - byte-identical to their `00_ORIGINALS` copies - so the listing is accurate. **What the files are is narrower than the index implies**: `main.py` is a console menu, not the FastAPI server the MVP guide describes, and the three AI wrappers depend on an `integrations/ai_client.py` module that is not in the folder. Full detail: [[Health Insurance Sales Agent Python Code]]. The index's own build-status table ("analyzer, drafter and stage detection = stubs") is accurate, and the code confirms it.

## Build status table (self-reported, early 2026)
| Component | Status |
|---|---|
| WhatsApp MVP (webhook plus draft approval) | working skeleton |
| AI analysis, message drafter, stage detection | **stubs** |
| CRM browser automation | documented, not built |
| Notion integration | documented, not built |
| Dashboard (Streamlit) | not started |
| Multi-agent TPA system | designed, not built |

The index's "biggest quick win" advice: get the WhatsApp webhook running, test the draft-approval flow, then build the analyzer and drafter. This is **design intent plus a snapshot of status at that time**, not a current state; later work moved to a different stack, see [[WhatsApp automation stack]] and [[Sales System]].

## requirements.md
A pinned Python dependency list for the planned stack, grouped as: core (dotenv, pydantic); AI (openai, anthropic, langchain); web automation (selenium, playwright, webdriver-manager, undetected-chromedriver); data (pandas, numpy, openpyxl, xlrd); OCR (pytesseract, Pillow, opencv); email (yagmail, email-validator); database (sqlalchemy; sqlite3 listed although it is built in and not pip-installable); dashboard (streamlit, plotly, altair); API (fastapi, uvicorn, httpx, requests); utilities; logging (loguru); testing (pytest). It lists both OpenAI and Anthropic SDKs, matching the "either provider" decision in [[WhatsApp Agent MVP Setup Guide]]. Some pins are old relative to the date of the folder, and it includes both Selenium and Playwright, so it reads as a wish list rather than a tested lockfile.

## Duplicates and caveats
- `02_SYSTEM_DESIGN`, `04_AUTOMATION`, `06_REFERENCE`, `07_ARCHIVE` are renamed copies of `00_ORIGINALS` files (byte-identical in the checks made: for example AI_OS_Architecture equals AI_OS_9_Components_Mapping). Each wiki page lists both paths.
- The MASTER_INDEX links `Full_System_Documentation.md` as the "visual system overview", while `System_Overview.md` is actually the README text of the Leads planning project. The titles are close and easy to mix up.
- The `05_CODE` folder is a fragment of three different projects and is not runnable as archived: no `requirements.txt`, no `.env.example`, no `core/`, `integrations/`, `database/` or `knowledge/`. See [[Health Insurance Sales Agent Python Code]].
- No credentials appear in these two files.

Related: [[Work OS]], [[Leads Folder Sales Agent]].
