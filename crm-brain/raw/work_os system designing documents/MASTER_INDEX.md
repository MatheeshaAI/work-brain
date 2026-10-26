# Work OS — Master Index

> Your single entry point for everything. Open this first.

---

## Daily Commands (Start Here)

| What you need | File |
|---|---|
| Extract / read a client from IMCRM | [01_DAILY_COMMANDS/CRM_Guide.md](01_DAILY_COMMANDS/CRM_Guide.md) |
| Set up or run WhatsApp agent | [01_DAILY_COMMANDS/WhatsApp_Setup.md](01_DAILY_COMMANDS/WhatsApp_Setup.md) |

---

## System Design

| Topic | File |
|---|---|
| Full AI OS — all 9 components & architecture | [02_SYSTEM_DESIGN/AI_OS_Architecture.md](02_SYSTEM_DESIGN/AI_OS_Architecture.md) |
| Visual system overview with flow diagrams | [02_SYSTEM_DESIGN/Full_System_Documentation.md](02_SYSTEM_DESIGN/Full_System_Documentation.md) |
| 20-stage pipeline plan & feature list | [02_SYSTEM_DESIGN/PLANNING.md](02_SYSTEM_DESIGN/PLANNING.md) |
| ClaudeClaw full system spec (TypeScript) | [02_SYSTEM_DESIGN/REBUILD_PROMPT.md](02_SYSTEM_DESIGN/REBUILD_PROMPT.md) |
| Multi-agent TPA specialist design | [02_SYSTEM_DESIGN/Multi_Agent_Design.md](02_SYSTEM_DESIGN/Multi_Agent_Design.md) |
| System overview for new leads | [02_SYSTEM_DESIGN/System_Overview.md](02_SYSTEM_DESIGN/System_Overview.md) |
| AI system prompt (20-yr UAE expert persona) | [02_SYSTEM_DESIGN/system_prompt.md](02_SYSTEM_DESIGN/system_prompt.md) |

---

## Insurance Knowledge Base

| Topic | File |
|---|---|
| All 24 UAE insurance companies | [03_INSURANCE_KNOWLEDGE/Companies.md](03_INSURANCE_KNOWLEDGE/Companies.md) |
| Plan tiers + actual pricing data | [03_INSURANCE_KNOWLEDGE/Plans.md](03_INSURANCE_KNOWLEDGE/Plans.md) |
| All 8 TPAs, networks & hospital schema | [03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md](03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md) |
| MEDNET provider JSON schema | [03_INSURANCE_KNOWLEDGE/MEDNET_Provider_Schema.md](03_INSURANCE_KNOWLEDGE/MEDNET_Provider_Schema.md) |
| Real IMCRM plan pricing data | [03_INSURANCE_KNOWLEDGE/CRM_Plan_Pricing_Data.md](03_INSURANCE_KNOWLEDGE/CRM_Plan_Pricing_Data.md) |
| Sales frameworks (consultative, SPIN, etc.) | [03_INSURANCE_KNOWLEDGE/Sales_Frameworks.md](03_INSURANCE_KNOWLEDGE/Sales_Frameworks.md) |
| Required documents for policy submission | [03_INSURANCE_KNOWLEDGE/Required_Documents.md](03_INSURANCE_KNOWLEDGE/Required_Documents.md) |

---

## Automation Guides

| Topic | File |
|---|---|
| Browser automation (CRM + Gmail) | [04_AUTOMATION/Browser_Automation.md](04_AUTOMATION/Browser_Automation.md) |
| Sales automation & FTC email patterns | [04_AUTOMATION/Sales_Automation_Notes.md](04_AUTOMATION/Sales_Automation_Notes.md) |
| WhatsApp + Notion integration | [04_AUTOMATION/WhatsApp_Notion_Integration.md](04_AUTOMATION/WhatsApp_Notion_Integration.md) |
| WhatsApp MVP approach (based on Mark) | [04_AUTOMATION/whatsapp_mvp_Based_on_Mark.md](04_AUTOMATION/whatsapp_mvp_Based_on_Mark.md) |

---

## Code (Python)

All Python source files: [05_CODE/](05_CODE/)

| File | Purpose |
|---|---|
| [config.py](05_CODE/config.py) | All settings, API keys, constants |
| [main.py](05_CODE/main.py) | Entry point, menu system |
| [start.py](05_CODE/start.py) | Setup wizard & requirement checker |
| [analyzer.py](05_CODE/analyzer.py) | AI message analysis |
| [drafter.py](05_CODE/drafter.py) | Message generation |
| [stage_detector.py](05_CODE/stage_detector.py) | Pipeline stage detection |

---

## Reference & Research

| Topic | File |
|---|---|
| Sales AI team design (Strawberry Browser inspired) | [06_REFERENCE/Sales_AI_Team_Design.md](06_REFERENCE/Sales_AI_Team_Design.md) |
| Production AI agent tutorial (ARIA / COO system) | [06_REFERENCE/Build_Production_AI_Agent.md](06_REFERENCE/Build_Production_AI_Agent.md) |
| WhatsApp personal assistant (Memorae concept) | [06_REFERENCE/WhatsApp_Memorae_Chatbot.md](06_REFERENCE/WhatsApp_Memorae_Chatbot.md) |

---

## Archive (Session Logs)

Large session logs for reference — kept out of the way.

| File | Contents |
|---|---|
| [07_ARCHIVE/Sales_OS_Session_Jan31.md](07_ARCHIVE/Sales_OS_Session_Jan31.md) | Full Jan 31 planning session for the Sales OS |
| [07_ARCHIVE/WhatsApp_Agent_Session.md](07_ARCHIVE/WhatsApp_Agent_Session.md) | WhatsApp agent build session |
| [07_ARCHIVE/CONVERSATION_LOG.md](07_ARCHIVE/CONVERSATION_LOG.md) | Requirements conversation log |

---

## Originals

[00_ORIGINALS/](00_ORIGINALS/) — All original files before reorganization. Safe to delete once you're happy with the new structure.

---

## Build Status

| Component | Status |
|---|---|
| WhatsApp MVP (webhook + draft approval) | Working skeleton |
| AI analysis (analyzer.py) | Stub |
| Message drafter (drafter.py) | Stub |
| Stage detection (stage_detector.py) | Stub |
| CRM browser automation | Documented, not built |
| Notion integration | Documented, not built |
| Dashboard (Streamlit) | Not started |
| Multi-agent TPA system | Designed, not built |

**Biggest quick win:** Get the WhatsApp webhook running → test draft approval flow → then build analyzer + drafter.
