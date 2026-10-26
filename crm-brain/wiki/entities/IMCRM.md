---
type: entity
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/Insurance Workspace/Sales-System/Tasks/tasks.json", "raw/20_AI-and-Agents/My-Shared-Brain/context/crm-health-lead-detail.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/imcrm.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Workflows/Extract IMCRM Health Leads.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Leads/IMCRM Health Leads - May 2026.md", "raw/10_Work-Insurance/IMCR Health Leads - 07-Jun-2026.md", "raw/10_Work-Insurance/Leads not in CRM.md", "raw/10_Work-Insurance/Crm_data_extraction.md", "raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/10_Work-Insurance/IMCRM Data Extractor - Handoff.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/Memory/IMCRM_Extension_How_to_Use.md", "raw/Health-Insurance/Memory/IMCRM_Extension_Server.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md"]
updated: 2026-10-22
tags: [crm, tool]
summary: "The CRM that supplies health and motor leads - lead structure, status vocabulary, the 07-Jun-2026 book of 68 leads, and the tools that read it."
status: expanded
---
# IMCRM

The CRM that supplies leads. In [[WhatsApp analysis May-June 2026]] "direct IMCRM leads" are one of the lead sources ([[Referral sources]]), and each health lead carries an ID of the form HEA-xxxxxxxx that appears in the WhatsApp chat names.

**Update 2026-10-22:** the earlier note on this page said the vault holds IMCRM workspace notes that are "not ingested yet" and that this page was a stub. The shared-brain CRM notes are now ingested, and the sections below fill in the CRM's structure and how it is automated. The May-June 2026 audit material below is unchanged.

## Structure of a health lead
- **List route:** the Health List at `/quotes/health?...`, filtered by created date. The list is paginated and its data is embedded in the page's `data-page` JSON, so every page can be read without clicking through pagination.
- **Detail route:** `/quotes/health/<UUID>`, a page roughly 8,000 pixels tall with 26 collapsible sections, some lazy-loaded behind a "Load ..." button. A health lead reference id takes the form `HEA-` plus eight characters.
- **Sections:** lead meta info, quote details, customer profile, member details, contacts, lead status, e-commerce details, available plans, manage payments, embedded products, policy details, commission schedule, booking details, email status, documents, digital consent, FTC tracking, InstantAlfred chat logs, broker on record, lead activities, lead history, API logs, audit logs, KYC audit logs, health routing logs and OCR AI logs.
- **Fields not visible in the list:** mobile number and email live only on the detail page. Full field lists are on [[IMCRM Health Lead Detail Extraction Guide]].

## How the shared brain drives it
The browser harness opens a controlled tab on the filtered list, the agent confirms the filters, the page data is read, and each `next_page_url` is followed to the end. Contact details then require one detail-page fetch per lead. Sources: [[Extract IMCRM Health Leads Workflow]], [[Sales Context File Set]], [[Browser harness]].
- **May 2026 run:** 6 pages, 51 leads, saved as a markdown table in the Sales workspace. The counts are summarised in [[IMCRM Health Leads May 2026]]; the file itself holds names, phone numbers and emails and stays out of the wiki.
- **Write operations are documented but gated:** changing a lead status, adding an activity, uploading a document, adding a manual payment - each paired with a screenshot to confirm. The vault rule is not to edit CRM data unless asked. See [[Automation guardrails]].

## How the CRM feeds the daily audit (May 2026)
The [[Sales System]] audit picks up two kinds of automated CRM mail, both carrying a health lead ID of the form HEA-xxxxxxxx:
- **Callback alerts** - "client is online and has changed plan preference". These are the source of the follow-up calls the audit proposes. In 26-29 May 2026 three such alerts (sent 18 and 20 May) stayed uncalled for 6-8 days and then 9-11 days, appearing in all four daily reports.
- **Application notifications** - "application approved, payment link sent". These create a payment-chase task instead of a callback.

The CRM is also the system of record the audit tells you to check before acting: a lead whose record showed three name variants was flagged for verification in the CRM, and one lead ID appears under two different client names across the four audits. Alias and data-quality handling in the CRM are therefore a live source of sales risk.

See [[Daily sales audit]], [[Sales operations issues]], [[WhatsApp lead follow-up statuses]].

## The lead book as of 07-Jun-2026
A full export of the health list on one morning: **68 leads**, created between **31-May and 07-Jun 2026**. The eight columns of every dump are `# / Ref ID / URL Link / Name / Lead Status / Assignment Type / Created Date / Visa Category`.
- **Status:** Quoted 34, Followed Up 19, Application Pending 6, Lost 4, New Lead 3, In Negotiation 1, Policy Booked 1.
- **Assignment:** System Assigned 53, System Reassigned 10, Self Assigned 5.
- **Visa:** Sponsored (Employer or Family) 50, N/A 9, Investor / Partner 5, Golden Visa 4.

Half the book sits at *Quoted* and one lead has reached *Policy Booked*. Source: [[IMCR Health Leads 07-Jun-2026]]. Note that the file titled [[Leads missing from the CRM]] is a 35-lead **slice of this same export**, not a set of leads absent from the system.

## The health detail page, as a data source
Two worked extractions read the detail page end to end. The readable blocks are **Customer profile, Member details, Additional contacts, Lead status, E-com details, Available plans, Manage payments, Policy details, Documents, Booking details, Lead history**, plus a set of panels that are usually empty or collapsed (Embedded Products, Email Status, Digital Consent, FTC Tracking, Audit Logs, Lead Activities, InstantAlfred Chat Logs).
- **The plan catalogue on the page holds 376 plans.** The first 15 are all entry level and span 8 networks and 12 insurers - see [[Insurance plan catalogue]] and [[Network tiers]].
- **A lead accumulates 16 documents** across underwriting, identity, payment and policy groups - see [[Document request handling]].
- **The commission block** on a booked policy carries rate, VAT on commission, total, branch and the insurer invoice numbers - see [[Commission and premium reporting]].
- **Payment state is a real risk category** on the profile (Low / Medium / High), alongside KYC status, salary band, member category and private-client flag.
- Source: [[Steps to get client data from IMCRM]], [[IMCRM health detail page extraction]].

**The privacy point:** every one of those sections is PII or PII-adjacent, including identity documents and medical history. Any extraction has to be redacted at the boundary - see [[Getting client data from the CRM]].

## Tools that read it
- **IMCRM Data Extractor** - a Chrome extension that reads the page DOM and copies formatted text out. Six buttons, one per extraction type, and a copy button that routes on the last type used. See [[IMCRM Data Extractor]], [[IMCRM Data Extractor handoff]], [[Extracting leads from the CRM]], [[IMCRM Data Extracting Extention PLAN]].
- **The shared-brain browser harness** - reads the list pages via embedded page data and fetches one detail page per lead when contact details are needed. See [[Extract IMCRM Health Leads Workflow]].
- **A proposed connector** - a script that would write one markdown file per lead, feeding an ICM-folder sales agent. **Design intent, not built.** See [[Using ICM for a CRM-driven insurance sales agent]].

## The status vocabulary is narrower than the work
CRM statuses cover the sales stages (New Lead → Quoted → Application Pending → In Negotiation → Policy Booked → Lost). They do **not** cover the post-sale states the desk actually works in - waiting on e-cards, documents received but not submitted, QA refer-back. Those live on a separate desk task list. See [[CRM hygiene]], [[Open tasks]], [[WhatsApp lead follow-up statuses]].

## The workspace's own CRM tooling (2026-10-22 ingest)
The in-place `raw/Health-Insurance/` folder documents a **different build** of the extension than the handoff page above, and adds a third piece.

- **A persistent memory set** describes the extension in `raw/Health-Insurance/Memory/`: `manifest.json`, `popup.html`, `popup.js` (about 626 lines) and a legacy `content.js`; four extraction features (lead details, member details, available plans, and a **basic-plans** subset); and five buttons (Extract Data, Extract Basic Plans, Copy to Clipboard, Debug, Create Lead File). Source: [[IMCRM extension memory note]].
- **The basic-plans filter is a network filter**: include `E CARE BLUE`, `E CARE`, `AAFIYA (APN)`; exclude Fidelity, Takaful Emarat, Essential, Dubai Care; max 2 plans per provider, cheapest first. See [[Basic plan filter]].
- **Create Lead File needs a local server**: `node Scripts/lead-file-server.js` writes the lead file, the document folder and a `PIPELINE.md` row. See [[Local file writing sidecar]].
- **A planned fifth extraction**: an "Extract Entry Level Plans" button that pulls four named plans and renders a markdown table with two price columns and separate co-pay / co-insurance columns. Design intent only - every checkbox in the plan is unticked. See [[Entry level plans extraction plan]].
- **The planned agent design** makes CRM reading a subagent: `crm-reader` pulls one lead and returns a structured summary, and `crm-status-updater` sets a status and confirms it. The main session never sees the page. See [[Tiered agent architecture]], [[Context isolation]].

**Flag:** the button set here (five) and the button set on [[IMCRM Data Extractor]] (six) disagree, and so do the live folder paths (`raw/Health-Insurance/IMCRM Data Extracting Extention` here, `C:\Users\mathe\Desktop\PKM_System\Health-Insurance\...` there). Two copies of the extension exist and the notes do not say which is newer.


## Cross-source note: files produced from the CRM (2026-10-22)
Individual health and motor lead files in the vault are IMCRM extractor output ([[Individual health insurance leads folder]], [[Motor insurance leads folder]]). Motor notes consist of one line saying so. Group business has no CRM ref ID ([[Group health insurance leads folder]]). Overview: [[Workspace Leads folder overview]].
