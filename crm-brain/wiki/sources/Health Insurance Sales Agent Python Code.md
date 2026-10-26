---
type: source
sources: ["raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/05_CODE/start.py", "raw/work_os system designing documents/05_CODE/analyzer.py", "raw/work_os system designing documents/05_CODE/drafter.py", "raw/work_os system designing documents/05_CODE/stage_detector.py", "raw/work_os system designing documents/05_CODE/__init__.py", "raw/work_os system designing documents/00_ORIGINALS/config.py", "raw/work_os system designing documents/00_ORIGINALS/main.py", "raw/work_os system designing documents/00_ORIGINALS/start.py", "raw/work_os system designing documents/00_ORIGINALS/analyzer.py", "raw/work_os system designing documents/00_ORIGINALS/drafter.py", "raw/work_os system designing documents/00_ORIGINALS/stage_detector.py", "raw/work_os system designing documents/00_ORIGINALS/__init__.py"]
updated: 2026-10-22
tags: [code, python, sales-agent, whatsapp, config, pipeline, ai, design-vs-built]
summary: "The seven Python files in 05_CODE: a settings module, a console menu, a setup wizard and three AI wrappers - assembled from three different projects and not runnable as archived."
---
# Source: Health Insurance Sales Agent Python Code

The only actual code in the [[Work OS]] folder: seven Python files in `05_CODE/`, byte-identical (same MD5) to the copies in `00_ORIGINALS/`. They are the Python side of the [[Leads Folder Sales Agent]] and the [[WhatsApp Agent MVP Setup Guide]].

**What this is:** a fragment, not a project. The files come from **three different codebases** and the folder has no `requirements.txt`, no `.env.example`, no `core/`, `integrations/`, `database/`, `knowledge/` or `ui/` directories. Nothing here runs as archived; see "Contradictions and flags" below.

## 1. config.py - the settings module
Source: [[raw/work_os system designing documents/05_CODE/config.py|config.py]]

**Purpose.** One module holding every path, key name, threshold and domain vocabulary, so the rest of the code imports constants instead of repeating literals. It is the ancestor of the folder-based approach in [[Task single source of truth]], and the place where [[AI provider abstraction]] is decided.

**Inputs.** Environment variables, read through `python-dotenv` (a `.env` file in the working directory):
- keys: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `CRM_API_KEY`, `EMAIL_PASSWORD`
- `AI_PROVIDER` (default `openai`), `OPENAI_MODEL` / `ANTHROPIC_MODEL`, `AI_TEMPERATURE` (0.7), `AI_MAX_TOKENS` (2000)
- `DATABASE_PATH` (default `<folder>/data/leads_db.sqlite`)
- CRM: `CRM_URL`, `CRM_USERNAME`, `CRM_PASSWORD`; email: `EMAIL_ADDRESS`, `EMAIL_SERVER` (smtp.gmail.com), `EMAIL_PORT` (587)
- `FOLLOW_UP_INTERVAL_HOURS` and `QUOTATION_FOLLOW_UP_HOURS` (both 48), `POSITIVE_THRESHOLD` (0.6), `NEGATIVE_THRESHOLD` (0.4)
- `LOG_LEVEL` (INFO), `DASHBOARD_HOST` (localhost), `DASHBOARD_PORT` (8501), `DASHBOARD_DEBUG`, `WHATSAPP_HEADLESS`

**Outputs.** Derived paths (clients, extracted, knowledge, screenshots, logs) and the six knowledge JSON filenames it expects: `networks.json`, `plans.json`, `insurers.json`, `regulations.json`, `templates.json`, `objections.json`. It also points at a `system_prompt.txt` beside the code - the same persona prompt as [[Health Insurance Expert System Prompt]].

**Domain vocabularies it declares** (this is the most useful thing in the folder - the CRM's own controlled lists):
| Constant | Contents |
|---|---|
| `PIPELINE_STAGES` | 19 stages - the work_os 20-stage list with **Allocated removed**; against this page's CRM list it adds the three renewal stages and `Sale Leads`, and ends at `Policy Pending` where the CRM says `Policy Booked` |
| `INSURANCE_COMPANIES` | the 24 insurers of [[Health Insurance Companies]] |
| `NETWORK_PROVIDERS` | 8 names, but **not the 8 TPAs** (see flags) |
| `HOSPITAL_NETWORKS` | 9 hospital groups (HealthHub, Aster, Mediclinic, American Hospital Dubai, Medeor, NMC, Burjeel, Al Zahra, Saudi German Hospital) |
| `PLAN_TIERS` | Basic, Silver, Gold, Platinum |
| `OBJECTION_TYPES` | 9 (Price, Network, Coverage, Timing, Trust, Competitor, Budget, Pre-existing, BMI) |
| `CLIENT_TYPES` / `INQUIRY_TYPES` | Individual, Family, Corporate, Renewal / 7 inquiry kinds |
| `DOCUMENT_TYPES` | 6 (Emirates ID, Passport, Visa, Medical Report, BMI Report, Pre-existing Proof) |
| `APPLICATION_STATUS` / `PAYMENT_STATUS` / `LOST_REASONS` | 5 / 5 / 9 controlled lists |

**How it works.** Load `.env`, read the variables, then **create directories as an import side effect** (clients, extracted, knowledge, screenshots, logs). **No credential values are stored in the file** - only variable names.

## 2. main.py - the console menu (not the server)
Source: [[raw/work_os system designing documents/05_CODE/main.py|main.py]]

**Purpose.** The entry point of the *Leads folder* project: a boxed banner ("Health Insurance Sales Agent System", "Powered by 20-Year UAE Insurance Expert AI", version 1.0.0, "Status: Development Mode") over an eight-option text menu.

**Inputs.** Keyboard choice 1-8.

**Outputs.** Logging only. `loguru` writes to `logs/agent.log` with 500 MB rotation and 10-day retention, plus a stdout sink.

**How it works.** Adds its own folder to `sys.path` so `from config import ...` resolves, then loops on the menu. Options 1-6 (analyse chat, generate follow-up, match plans, pipeline recommendations, analyse lost lead, WhatsApp-to-email sync) all log the choice and print "Feature coming soon in Phase 1"; option 7 is "Dashboard coming soon in Phase 4"; option 8 exits. The six options are the six planned modules of [[Health Insurance Sales Agent Plan (Jan 2026)]] turned into menu entries. It logs that the dashboard will be at `http://localhost:8501`, the Streamlit port from `config.py`.

**Not the FastAPI app.** The setup guide says `python main.py` starts a server on port 8000 with webhook endpoints. This file starts no server and defines no endpoints.

## 3. start.py - the setup wizard
Source: [[raw/work_os system designing documents/05_CODE/start.py|start.py]]

**Purpose.** A pre-flight check for the WhatsApp agent, run before the server.

**Inputs.** The local Python environment and the presence of `.env` / `.env.example`.

**Outputs.** `data/` and `logs/` directories, and printed instructions.

**How it works.**
1. Requires Python 3.10 or newer (the version the plan pins).
2. Creates `data` and `logs` **relative to the current directory** - unlike `config.py`, which anchors them to the code folder, so the two disagree about where the data lives.
3. Tries to import `fastapi`, `uvicorn`, `sqlalchemy`, `requests`, `openai`, `loguru`; on the first failure it prints "pip install -r requirements.txt".
4. If `.env` is missing it copies `.env.example` to `.env` and tells the user to add the Evolution API URL and key plus an OpenAI or Anthropic key.
5. Prints the endpoint list (webhook, drafts, health on `:8000`) and the run instruction `cd whatsapp_agent` then `python main.py`.

**Both referenced files are missing** from the archive: `requirements.txt` and `.env.example` are not in the folder.

## 4. analyzer.py - message analysis wrapper
Source: [[raw/work_os system designing documents/05_CODE/analyzer.py|analyzer.py]]

**Purpose.** Turn a WhatsApp message into a structured analysis for the stage detector and the drafter.

**Inputs.** `analyze_message(sender, message)` plus an initial `init_ai_client(provider, api_key, model)` that stores one global client.

**Outputs.** A dict with `sentiment`, `intent`, `type`, `urgency`, `key_topics`, `needs_response`.

**How it works.** It is a **thin wrapper, not the intelligence**: the real work is delegated to `AIClient` imported from `integrations.ai_client` - a module that **does not exist in the archive**. If the client was never initialised, or the call raises, the function returns a fixed fallback: sentiment `neutral`, intent `other`, type `follow_up`, urgency `medium`, no topics, `needs_response` true. The fallback shape is exactly what [[Stage detection rules]] expects to read.

## 5. drafter.py - message drafting wrapper
Source: [[raw/work_os system designing documents/05_CODE/drafter.py|drafter.py]]

**Purpose.** Produce the reply text for a given pipeline stage, and rewrite a draft on instruction.

**Inputs.** `generate_draft(analysis, stage, original_message)`; `refine_message(original, instructions)`.

**Outputs.** A string, or a dict `{message, reasoning}` for a refinement.

**How it works.** Same pattern as the analyzer: a global `AIClient` from the missing `integrations` package. On no client or on an exception, `generate_draft` returns a fixed acknowledgement ("Thank you for your message. I'll review it and get back to you shortly.") and `refine_message` returns the **original text** with the reason "Could not refine, using original". Note that both fallbacks are safe for the approval flow but produce a reply that says nothing - see [[Safe fallback defaults]] and [[Draft and approve messaging flow]].

## 6. stage_detector.py - pipeline stage inference
Source: [[raw/work_os system designing documents/05_CODE/stage_detector.py|stage_detector.py]]

**Purpose.** Map the analysis dict to one pipeline stage. This is the only file in the folder with no missing dependency (it needs only `loguru`).

**Inputs.** `detect_stage(sender, analysis)`.

**Outputs.** One stage name from its own copy of the 19-stage list.

**How it works.** A fixed rule order, first match wins:
1. intent `ask_for_quote` **and** type `new_lead` -> New Lead
2. intent `question` **and** type `follow_up` -> Followed Up
3. `quote` present in `key_topics` -> Quoted
4. intent `objection` -> In Negotiation
5. any of `document`, `payment`, `policy`, `application` in `key_topics` -> Missing Documents Requested, or Payment Link Sent To Customer, or Application Pending
6. otherwise -> **Followed Up**, logged as a warning ("Could not detect stage, assuming")
Any exception -> New Lead.

## 7. __init__.py - the provenance clue
Source: [[raw/work_os system designing documents/05_CODE/__init__.py|__init__.py]]

Thirty bytes: a docstring reading "AI module initialization". It is a package marker with no code - and it says where these files came from. The setup guide's file tree puts `analyzer.py`, `drafter.py` and `stage_detector.py` in an `ai/` package and `ai_client.py` in `integrations/`. This marker sat in that `ai/` folder, so the three wrappers were **copied out of their package** into `05_CODE/`, while `config.py`, `main.py` and `start.py` were copied out of two other projects.

## Contradictions and flags
- **`main.py` is not the server.** The guide's setup step "python main.py starts the server on port 8000" does not match the archived file, which is a text menu; the FastAPI app (`core/`, `database/`, `integrations/`) is absent. The same name belongs to two different programs.
- **`NETWORK_PROVIDERS` is wrong.** The list (Nextcare, GIG, Oman Insurance, Daman, AXA, Cigna, MetLife, Allianz) mixes insurers and legacy names - Oman Insurance is the old name for Sukoon, AXA the old name for GIG, and Daman, Cigna, MetLife and Allianz are insurers, not networks. The eight real networks are in [[TPAs and Networks Reference (Work OS)]]. Under `HOSPITAL_NETWORKS` the folder holds hospital groups instead.
- **`PLAN_TIERS` is a fourth vocabulary.** Basic/Silver/Gold/Platinum, the same ladder as the persona prompt, against Basic/Basic Enhanced/Enhanced in [[Plan tiers and variables]] and Entry/Good/Best in the CRM.
- **`AI_MODEL` can be undefined.** Model settings are only assigned when `AI_PROVIDER` is exactly `openai` or `anthropic`; any other value leaves `AI_MODEL`, `AI_TEMPERATURE` and `AI_MAX_TOKENS` undefined, and the name error appears later at first use rather than at import.
- **The 19-stage list is duplicated** in `config.py` and `stage_detector.py`, with a third wording in the plan. The code drops "Allocated" and keeps "Policy Pending" (the CRM list says "Policy Booked").
- **`stage_detector.py` docstring says "20-stage pipeline"** while its own list holds 19.
- **Two dead reads.** The detector reads `analysis["message"]` into a variable it never uses, and the analyzer never returns a `message` key; and `key_topics` is tested for exact membership, so a topic string like "quotation request" would not match `"quote"`.
- **Twelve of the nineteen stages are unreachable** by the detector: renewal terms (3), pending BOR, application submitted, KYC, transaction approval, payment initiated, payment pending, sale leads, policy documents pending, policy pending, lost.
- **Directories are created on import**, so merely reading `config.py` writes folders to disk.
- **`.env` handling:** keys come from the environment only; no credential values appear in any of the seven files.
- **Empty leftovers:** the work_os root also holds an empty `whatsapp-mvp/` folder and a `whatsapp.skill` archive (a packaged tool skill file); the skill is a tool configuration, so it is skipped rather than ingested.

Related: [[Work OS]], [[Leads Folder Sales Agent]], [[WhatsApp Agent MVP Setup Guide]], [[Work OS Master Index]], [[Stage detection rules]], [[Safe fallback defaults]], [[Environment-driven configuration]], [[AI provider abstraction]].
