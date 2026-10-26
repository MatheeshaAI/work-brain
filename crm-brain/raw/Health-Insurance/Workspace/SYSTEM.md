# Health Insurance CRM — Full System Overview

**Advisor:** Matheesha Sarathchandra — matheeshasarathchandra@gmail.com
**CRM:** [Alfred IMCRM](https://imcrm.alfred.ae/) (imcrm.alfred.ae)
**Last Updated:** 2026-05-20

---

## Table of Contents

1. [What This System Is](#1-what-this-system-is)
2. [Three-Layer Architecture](#2-three-layer-architecture)
3. [Data Model](#3-data-model)
4. [Lead Lifecycle](#4-lead-lifecycle)
5. [Renewal Lifecycle](#5-renewal-lifecycle)
6. [All 10 Subagents](#6-all-10-subagents)
7. [Skills](#7-skills)
8. [WhatsApp Integration](#8-whatsapp-integration)
9. [IMCRM Integration](#9-imcrm-integration)
10. [Standard Operating Procedures (SOPs)](#10-standard-operating-procedures-sops)
11. [Knowledge Base](#11-knowledge-base)
12. [Memory System — Persistent Rules](#12-memory-system--persistent-rules)
13. [Directory Structure Reference](#13-directory-structure-reference)
14. [Key Conventions](#14-key-conventions)

---

## 1. What This System Is

An **AI-assisted health insurance sales workflow** built on top of Claude Code. It manages the full lead lifecycle — from the moment a customer inquiry is created in IMCRM, through quoting and follow-up, to policy booking and annual renewal.

**Claude acts as an orchestrator.** It never does work directly. It reads the user's intent, delegates to the right subagent, and reports the result back. The subagents do the actual file reading, writing, CRM interaction, and WhatsApp messaging.

**All leads are attributed to Matheesha Sarathchandra**, a health insurance advisor at InsuranceMarket.ae in the UAE.

---

## 2. Three-Layer Architecture

```
User Intent
     ↓
┌─────────────────────────────────────────┐
│  Layer 1: CLAUDE.md (Orchestrator)      │
│  Reads intent → picks subagent          │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Layer 2: 10 Subagents (.claude/agents) │
│  Each has a narrow scope and exact steps│
│  Reads/writes files, runs scripts,      │
│  interacts with IMCRM and WhatsApp      │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Layer 3: Memory + Conventions          │
│  project-conventions skill (auto-loaded)│
│  7 feedback files (accumulated rules)   │
│  Ensures agents apply the right rules   │
│  without being re-instructed every time │
└─────────────────────────────────────────┘
```

### Orchestrator Delegation Table

| When the user says… | Claude dispatches… |
|---|---|
| "Add / onboard / new lead [REF_ID]" | `lead-onboarder` |
| "File docs / move documents for [REF_ID]" | `document-filer` |
| "Update / mark / status change for [REF_ID]" | `lead-updater` |
| "Send follow-up / WhatsApp to [REF_ID]" | `whatsapp-sender` |
| "FTC email / financial terms for [REF_ID]" | `ftc-drafter` |
| "Book policy for [REF_ID]" | `policy-booker` |
| "Renewal update for [client]" | `renewal-updater` |
| "Renewal check / what renewals are due" | `renewal-scanner` |
| "Morning briefing / what's today / priorities" | `daily-briefer` |
| "Audit / pipeline check / inconsistencies" | `pipeline-auditor` |

**When NOT to dispatch:** Simple factual questions ("What is the status of HEA-XXX?") are answered directly by reading the lead file — no subagent needed.

---

## 3. Data Model

### Lead Identifier
Format: `HEA-XXXXXXXX` (8 alphanumeric characters, assigned by IMCRM)

### Lead File Structure
Location: `Workspace/Leads/HEA-[8CHAR]-[First]-[Last].md`

```markdown
# Lead Detail: [REF_ID] - [Full Name]

## General Information
- Ref-ID, Customer Type (Individual / Family N), Created Date, Advisor, Status

## Customer Profile
- Full Name, Mobile, Email, Nationality, DOB, Emirate of Visa, Gender, Member Category

## Payment Details
- Total Amount, Status (Paid/Pending), Payment Method

## Confirmed Plan (added when quoted)
- Insurer, Plan Name, Premium, Confirmed Date

## Member Details (for Family type — one section per member)
### Member N: [Name] ([Relationship])
- Name, Gender, DOB, Nationality, Emirate of Visa, Member Category

## Documents
- [ ] Per-member EID, Passport, Visa checklist

## Status Updates
- Chronological dated log of all actions
```

**Member Category values:** Employee with salary above AED 4000 / Employee with salary below AED 4000 / Dependent spouse / Dependent child / Golden Visa / Investor-Partner / Domestic worker

**Gender values in IMCRM:** Male / Male-Married / Male-Unmarried / Female-Married / Female-Unmarried / Female-Single

### Renewal File Structure
Location: `Workspace/Renewals/[Provider]-[PolicyNumber]-[First]-[Last].md`

Contains: Policy details (provider, policy number, start/expiry, premium), Customer profile (name, email, phone), Renewal quote, Payment status, Documents checklist, Status updates.

### PIPELINE.md Sections (in order)

| Section | Emoji | Leads in this section |
|---|---|---|
| New Leads | 🔴 | Just onboarded, awaiting response |
| In Progress | 🟡 | Quoted or Followed Up |
| Payment Stage | 🟠 | Payment initiated through policy booking in progress |
| Policy Booked | ✅ | Fully booked (current month then archived) |
| Renewals | 🔄 | Summary table linking to RENEWALS.md |
| Production Summary | — | Monthly policy count and premium totals |
| Daily Checklist | — | Pending tasks with checkbox format |

**Columns per section vary:**
- New Leads: REF-ID, Client, Type, Created, Pending Action
- In Progress: REF-ID, Client, Type, Status, Amount, Days, Pending Action
- Payment Stage: REF-ID, Client, Status, Amount, Days, Pending Action

### RENEWALS.md Sections (in order)
1. Monthly Summary (count, total premium, breakdown by status)
2. URGENT — Expired / Expiring Within 24 Hours
3. Due This Month — Not Yet Contacted
4. In Progress (Contacted / Quoting)
5. Quote Sent / Payment Pending
6. Renewed
7. Did Not Renew / Lapsed
8. Renewal Checklist

---

## 4. Lead Lifecycle

```
IMCRM creates inquiry
        ↓
  [lead-onboarder]
  New Lead → welcome message shown to user
        ↓
  User sends plans/quote
        ↓
  [lead-updater] → Status: Quoted
        ↓
  [whatsapp-sender] → follow-up after no response
        ↓
  [lead-updater] → Status: Followed Up
        ↓
  Client confirms → [ftc-drafter] → FTC email drafted
        ↓
  [lead-updater] → Status: Payment Initiated
        ↓
  Payment received
        ↓
  [document-filer] → all docs moved and renamed
  [policy-booker] → documents verified, AML email drafted, policy uploaded in IMCRM
        ↓
  [lead-updater] → Status: Policy Booked
        ↓
  (Next year) → [renewal-updater] → enters Renewals pipeline
```

### Full Status Flow (in order)

| Status | Meaning | PIPELINE.md Section |
|---|---|---|
| `New Lead` | Just created, welcome message sent | 🔴 New Leads |
| `Quoted` | Quote comparison sent to client | 🟡 In Progress |
| `Followed Up` | Follow-up sent after quote | 🟡 In Progress |
| `Payment Initiated` | Payment link shared | 🟠 Payment Stage |
| `Payment Pending` | Client confirmed intent, not yet paid | 🟠 Payment Stage |
| `Application Submitted` | Application sent to insurer | 🟠 Payment Stage |
| `Sent for Booking` | All docs ready, sent for processing | 🟠 Payment Stage |
| `Policy Booked` | Fully booked, documents uploaded | ✅ Policy Booked |
| `Lapsed` | Lead went cold / no response | Removed from active pipeline |

---

## 5. Renewal Lifecycle

### Status Flow
```
Due → Contacted → Quote Sent → Payment Pending → Renewed
                                               ↘ Lapsed
```

### File Naming Convention

| Provider | Policy Number Rule | Example |
|---|---|---|
| Takaful Emarat (TE) | Last 10 digits of full policy number | `TE-0528328171-Claudius-Vertesi.md` |
| Dubai Insurance (DIC) | Short policy number as-is | `DIC-572095-Rathan-Castelino.md` |
| Orient Insurance (OI2) | Full policy number | `OI2-P01131320253298-Hemant-Barman.md` |

### Three-file Update Rule
When a renewal status changes, **always update all three simultaneously:**
1. `Workspace/Renewals/[file].md` — the individual renewal file
2. `Workspace/RENEWALS.md` (or `RENEWALS-[Month]-[Year].md`) — the pipeline
3. `Workspace/PIPELINE.md` — the Renewals section and Production Summary

---

## 6. All 10 Subagents

All agent definition files live at: `.claude/agents/`

---

### lead-onboarder
**Trigger:** "Add/onboard new lead [REF_ID]"
**File:** `.claude/agents/lead-onboarder.md`

**Steps:**
1. Parse REF_ID from any format (URL / `HEA-XXXXXXXX` / 8-char code)
2. Run `node Scripts/get_lead_detail.js [8-CHAR-CODE]` to fetch all CRM data
3. If CRM status is `Quoted` → change to `Followed Up` in IMCRM via Playwright (must click the confirm/change button — selecting the dropdown alone does NOT save)
4. Create `Workspace/Leads/[REF_ID]-[First]-[Last].md` with all member details
5. Append row to New Leads section of `Workspace/PIPELINE.md`
6. Determine salutation from gender/marital status field
7. **Show** the WhatsApp welcome message in chat — do NOT auto-send; user sends it themselves

**Critical rule:** Step 3 must complete before Step 7. If the lead stays in `Quoted` status, IMCRM may reassign it to another advisor.

**Returns:** Structured summary with file path, PIPELINE.md update, CRM status change result, WhatsApp message preview, and any flags (missing phone/email).

---

### document-filer
**Trigger:** "File docs / move documents for [REF_ID]"
**File:** `.claude/agents/document-filer.md`

**Steps:**
1. Read the lead markdown file to confirm lead identity
2. Scan three source directories for matching files:
   - `C:/Users/Matheesha-IM.AE/Downloads/`
   - `C:/Users/Matheesha-IM.AE/Pictures/Screenshots/`
   - `C:/Users/Matheesha-IM.AE/.browseros/downloads/`
3. Rename files descriptively: `EID_[FirstName].pdf`, `Passport_[FirstName].pdf`, `Visa_[FirstName].pdf`, etc.
4. **Move** files (not copy) to `Workspace/Documents/[REF_ID]-[First]-[Last]/`
5. Update the Documents checklist in the lead markdown file

**Key rule:** Move, never copy. This keeps Downloads clean and avoids duplicates.

---

### lead-updater
**Trigger:** "Update [REF_ID] — [status/notes/payment/docs]"
**File:** `.claude/agents/lead-updater.md`

**Steps:**
1. Read the lead markdown file
2. Apply the requested update (status, notes, payment amount, pending action)
3. Update the lead `.md` file
4. Move the lead's row to the correct PIPELINE.md section based on new status
5. Update the Pending Action column

**Dual-update rule:** Always update both the lead file AND PIPELINE.md together. Never leave one out of sync.

**Do only what was asked.** Do not add unrequested analysis, tables, or additional notes.

---

### whatsapp-sender
**Trigger:** "Send follow-up / WhatsApp to [REF_ID]"
**File:** `.claude/agents/whatsapp-sender.md`

**Steps:**
1. Read lead file — name, phone, gender, status, last contact date, quote details
2. Get conversation history via `get_chat_messages` MCP tool (or SQLite fallback)
3. Determine follow-up type from situation table (see below)
4. Apply salutation rules
5. Compose message: professional, 3–5 short paragraphs, one CTA, `*bold*` for key details, no filler
6. **Show message to user and wait for confirmation** before sending
7. Send via MCP `send_message` tool or Node.js REST API fallback
8. Add Status Update entry in lead file + update PIPELINE.md Pending Action

**Follow-up situation table:**

| Situation | Approach |
|---|---|
| Welcome sent, no reply > 2 days | Gentle check-in, restate plan options briefly |
| Quote sent, no reply > 2 days | Reference specific plans, ask for preference |
| Client asked a question | Answer directly + clear next step |
| Payment link shared, unpaid > 1 day | Confirm receipt, offer help |
| Requested specific plan | Confirm details, state next step |
| Quote too expensive | Offer budget-friendly alternatives |

---

### ftc-drafter
**Trigger:** "FTC email / financial terms for [REF_ID]"
**File:** `.claude/agents/ftc-drafter.md`

Generates the Financial Terms & Conditions confirmation email — sent to the client before sharing the payment link to get written confirmation of their plan choice.

**Output format (strict):**
- Plain `.txt` file (no markdown)
- Section headers in ALL CAPS
- Bullets indented with 4 spaces + `•`
- Sub-bullets indented with 8 spaces
- Outpatient Access bullet only included for basic/clinic-only plans

**Saved to:** `Workspace/Documents/[REF_ID]-[First]-[Last]/FTC_Email_Draft.txt`

---

### policy-booker
**Trigger:** "Book policy for [REF_ID]"
**File:** `.claude/agents/policy-booker.md`

**Steps:**
1. Read the lead file
2. Verify all required documents are present (per-member: EID, Passport, Visa + policy certificate, bond, e-cards, receipt, commission PDF)
3. Draft the AML & KYC booking email:
   - Subject: `[Client Name] - [REF_ID] - AML & KYC Check`
   - Reply to the insurer's AML check confirmation
   - CC: unit head
4. Show the IMCRM document upload checklist
5. Ask user for booking confirmation
6. On confirmation: update status to "Policy Booked", add Status Update entry, move to ✅ section in PIPELINE.md

**Reference SOP:** `Workspace/SOPs/Booking Policy.md`

---

### renewal-scanner
**Trigger:** "Renewal check / what renewals are due"
**File:** `.claude/agents/renewal-scanner.md`

Reads all renewal files and `RENEWALS.md` / `RENEWALS-[Month]-[Year].md` and produces a **prioritized action report**.

**Priority tiers:**
- 🔴 EXPIRED or expiring within 3 days → same-day action required
- 🟠 Expiring in 4–14 days → contact this week
- 🟡 Quote sent, no response > 5 days → follow up
- 🟢 Payment pending → chase payment
- Also flags group contacts (multiple family members sharing one phone number)

Takes no arguments — scans everything automatically.

---

### renewal-updater
**Trigger:** "Renewal update for [client name or policy number]"
**File:** `.claude/agents/renewal-updater.md`

Updates renewal client records across three files simultaneously:
1. `Workspace/Renewals/[file].md` — quote details, new plan, new premium, status
2. `Workspace/RENEWALS.md` — moves row to correct section
3. `Workspace/PIPELINE.md` — Renewals table row + Production Summary (when status becomes Renewed)

---

### daily-briefer
**Trigger:** "Morning briefing / what's today / priorities"
**File:** `.claude/agents/daily-briefer.md`

Takes no arguments. Reads PIPELINE.md, RENEWALS.md, and recently active lead files, then outputs a structured morning briefing:

- 🔴 URGENT — leads flagged TODAY or URGENT
- 📬 NEW LEADS — welcome messages not yet confirmed sent
- 📞 FOLLOW UPS — stale leads (no update > 5 days)
- 💳 PAYMENT STAGE — leads awaiting payment or booking
- 🔄 RENEWALS — expiring within 7 days, payment chasers
- 📊 PIPELINE SNAPSHOT — total counts by status
- ⭐ TOP 3 ACTIONS — highest-priority items for the day

---

### pipeline-auditor
**Trigger:** "Audit / pipeline check / inconsistencies"
**File:** `.claude/agents/pipeline-auditor.md`

**Read-only** — never modifies any files. Cross-checks:
1. Every lead file vs PIPELINE.md (status sync, missing file entries)
2. Every renewal file vs RENEWALS.md
3. Stale leads (no Status Update > 7 days, excluding Booked/Lapsed)
4. Missing Pending Actions in PIPELINE.md rows
5. Document folder gaps (leads without folders, orphaned folders with no matching lead)

Outputs an audit report with findings and recommendations. Run it periodically to catch inconsistencies.

---

## 7. Skills

Skills are reusable automations invoked with `/skill-name` in Claude Code.

### crm-plan-download (global skill)
**Location:** `~/.claude/skills/crm-plan-download/SKILL.md`
**Invoke:** Give a REF_ID and ask to "get basic plans" / "download plan comparison"

Downloads a basic/entry-level plan comparison PDF for a lead directly from IMCRM. Excludes Fidelity United (per underwriting preference). Saves the PDF to `Workspace/Documents/[REF_ID]-[Name]/`.

Accepts REF_ID in any format: `HEA-XXXXXXXX`, `282Q2JGD`, or a full IMCRM URL.

### document-renamer (global skill)
**Location:** `~/.claude/skills/document-renamer/SKILL.md`
**Invoke:** "Rename documents for [Lead Name]" / "Organize the documents folder"

Visually identifies each file in a lead's Documents folder (reads EIDs, passports, visas, insurance PDFs, etc.) and renames them descriptively using the pattern `[FirstName]-[LastName]_[DocumentType].ext`. Works with any document type including Emirates IDs, passports, visas, policy bonds, e-cards, quotations, and application forms.

### project-conventions (project skill, auto-loaded)
**Location:** `.claude/skills/project-conventions/SKILL.md`
**Not user-invocable** — loaded automatically by Claude as background context.

Contains the canonical reference for:
- File naming patterns (leads, renewals, documents)
- Lead status values (exact strings)
- Renewal status flow
- PIPELINE.md section order
- WhatsApp salutation rules
- Phone number format
- Key file paths and script commands
- The dual-update rule (always update both lead file AND pipeline file)
- Document move sources

---

## 8. WhatsApp Integration

### Architecture

```
Claude Code
    ↕ (MCP tools: send_message, get_chat_messages, search_messages, search_contacts)
Python MCP Server (Scripts/whatsapp-mcp/whatsapp-mcp-server/)
    ↕ (REST API on localhost:8080)
Go Bridge (Scripts/whatsapp-mcp/whatsapp-bridge/) — whatsmeow library
    ↕ (WhatsApp Web protocol)
WhatsApp / Matheesha's phone
```

### Session Setup (one-time per device)
```powershell
cd "Scripts/whatsapp-mcp/whatsapp-bridge"
go run .    # QR code appears — scan with phone → wait for "Connected" → Ctrl+C
```
Session credentials saved in `Scripts/whatsapp-mcp/whatsapp-bridge/store/` and persist across restarts.

### Starting the Bridge (every Windows session / after reboot)
```powershell
Start-Process -FilePath "go" -ArgumentList "run", "." -WorkingDirectory "C:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts\whatsapp-mcp\whatsapp-bridge" -WindowStyle Hidden
```
Verify: `curl http://localhost:8080/api/health` — expect `{"connected":true,"status":"ok",...}`

**The bridge does NOT survive reboots.** Restart it after every Windows restart.

### How Claude Sends Messages

**Primary — MCP tools (when loaded in session):**
```
send_message(recipient="971501234567", message="...")
get_chat_messages(phone="971501234567")
search_messages(query="...")
search_contacts(name="...")
```

**Fallback — Node.js REST API (when MCP tools not loaded):**
```javascript
node -e "
const msg = 'Your message here with emojis \u{1F44B}';
const body = JSON.stringify({ recipient: '971501234567', message: msg });
const http = require('http');
const options = { hostname: 'localhost', port: 8080, path: '/api/send', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };
const req = http.request(options, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => console.log(d)); });
req.write(body); req.end();
"
```

**Always use Node.js (not `curl`) for the fallback.** `curl` inline strings mangle emoji encoding. Node.js encodes the payload as proper UTF-8.

### Message Archive (SQLite)
All sent/received messages are archived locally at:
`Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db`

This is used to: search conversation history for a lead, identify non-responding leads, generate the weekly WhatsApp No-Response Report.

### Phone Number Format
- Use international format without `+`: `971501234567`
- WhatsApp JID format: `971501234567@s.whatsapp.net`
- UAE numbers: `971` + 9-digit number (drop leading `0` from local format)
- **CRITICAL:** The IMCRM scraper returns UAE numbers with prefix `970` — always correct to `971` before saving to lead files or sending WhatsApp

### Non-Responder SOP
Weekly process (`Workspace/SOPs/WhatsApp_FollowUp_NonResponders.md`):
1. Claude queries the SQLite DB to find leads with no inbound reply
2. Generates tiered report saved to `Workspace/Reports/WhatsApp-No-Response-Report-[Date].md`
3. Sends personalized follow-ups via Node.js REST API
   - 🟡 3–5 days since last outbound: gentle check-in
   - 🟠 6–7 days: more direct follow-up referencing their specific quote
   - 🔴 10+ days: final attempt before marking Lapsed

---

## 9. IMCRM Integration

**Base URL:** `https://imcrm.alfred.ae/`
**Lead URL pattern:** `https://imcrm.alfred.ae/quotes/health/[8-CHAR-CODE]`
**Auth:** Email + password from `.env` file
**Session persistence:** `Scripts/crm-session/` — no re-login needed between script runs

### Scripts

| Script | Purpose | How to run |
|---|---|---|
| `Scripts/get_lead_detail.js` | Fetch full details of a single lead | `node Scripts/get_lead_detail.js 282Q2JGD` |
| `Scripts/last_30_days_scraper.js` | Scrape all leads from last 30 days with pagination | Playwright page script |
| `Scripts/price_range_plan_scraper.js` | Filter insurance plans by min/max AED price | Playwright page script |
| `Scripts/single_lead_scraper.js` | Extract complete lead data from IMCRM lead page | Playwright page script |

### REF_ID Format Parsing
| Format provided | Example | Code to extract |
|---|---|---|
| 8-char code only | `282Q2JGD` | Use as-is |
| Full Ref-ID | `HEA-282Q2JGD` | Strip `HEA-` prefix |
| Full URL | `https://imcrm.alfred.ae/quotes/health/282Q2JGD` | Last path segment |

### CRM Status Change (Important)
After selecting a new status from the IMCRM dropdown, **you must click the confirm/change button**. Selecting the dropdown value alone does not save. If the button click fails, flag it to the user — do not assume the change succeeded.

---

## 10. Standard Operating Procedures (SOPs)

All SOPs live at: `Workspace/SOPs/`

### Booking Policy.md
Step-by-step guide for uploading documents and booking a policy in IMCRM after all documents are received.

Key steps:
1. Navigate to the lead in IMCRM
2. Upload all required documents (EID, Passport, Visa per member; policy certificate, bond, e-card, receipt, commission)
3. Reply to the insurer's AML check confirmation email with subject: `[Client Name] - [REF_ID] - AML & KYC Check`
4. CC unit head on the booking email

### FTC_Email_Template.md
The Financial Terms & Conditions email sent to clients before sharing the payment link. The client replies to this email to confirm their plan choice in writing.

**Output format (strict rules):**
- Plain `.txt` file — no markdown syntax
- Section headers: ALL CAPS
- First-level bullets: 4 spaces + `•`
- Sub-bullets: 8 spaces + `•`
- Outpatient Access bullet: only include for basic/clinic-only plans
- **Saved to:** `Workspace/Documents/[REF_ID]-[Name]/FTC_Email_Draft.txt`

### Policy_Delivery_Email_Template.md
Email sent to the client after the policy is fully booked. Shares the policy documents (bond, e-card, certificate) and requests a Google review.

- Attach: policy bond, e-card, insurance certificate
- Replace `[GOOGLE_REVIEW_LINK]` with the actual InsuranceMarket.ae Google review link before sending

### WhatsApp_Welcome_Message_Template.md
Template for the first WhatsApp message to every new lead.

**Salutation rules:**

| IMCRM Gender Field | Salutation to use |
|---|---|
| Male / Male-Married / Male-Unmarried | Mr. |
| Female-Married | Mrs. |
| Female-Unmarried | Miss |
| Female (no marital status) | Ms. |
| Age < 18 (any gender) | First name only (no title) |

**Canonical template:**
```
Hi [Salutation] [First Name] 👋

Matheesha Sarathchandra from InsuranceMarket.ae here - I'm your dedicated advisor for your health insurance inquiry!

I've reviewed your profile and we have the perfect options for you. Here's what we offer:

📋 BASIC PLAN - Clinic coverage only (Outpatient)
📋 BASIC ENHANCED - Clinic coverage + Direct access to Specialists (Outpatient)
📋 ENHANCED - Complete coverage: Clinics + Hospitals (Outpatient) + International plans

To share you the best quotations, I'd love to know:

1️⃣ Are you looking for a plan within a *specific budget*?
2️⃣ Or do you prefer coverage at *specific facilities* (clinics, hospitals, international)?

Once I know your preference, I'll send tailored quotes matching your needs!


Thanks,
```

All emojis (👋, 📋, 1️⃣, 2️⃣) are mandatory — never strip them. Copy character-for-character.

**For referral leads:** Replace the opening with "I received your contact details from my colleague [Referrer Name]!" and remove the "dedicated advisor" and "reviewed your profile" lines.

### WhatsApp_FollowUp_NonResponders.md
Weekly SOP for identifying and messaging leads who have not responded. Claude queries the SQLite message archive, generates a tiered report, and sends personalized follow-up messages.

---

## 11. Knowledge Base

Location: `Workspace/Knowledge Base/`

| File | What's in it |
|---|---|
| `INDEX.md` | Quick-reference table linking to all KB files |
| `Dubai-Insurance.md` | Child-alone policy conditions: age 6–12, sponsoring parent must also be insured with Dubai Insurance |
| `Takaful-Emarat.md` | Bank transfer payments cause a 1 business day delay on policy issuance — set this expectation with clients upfront |
| `General-Underwriting.md` | Age 65+ medical underwriting: required Medical Report form, 8 mandatory lab tests (CBC, Fasting Blood Sugar, Lipid Profile, Kidney/Liver Function, ECG Stress Test, Ultrasound, PSA for males). Document validity: UAE-issued, within last 3 months. |

### Plans Folder
`Workspace/Plans/` — 22 insurer plan files covering:
ADNIC, Abu Dhabi National Takaful, Adamjee, April-Hayah, BUPA, Cigna, DIC Viventa, Dubai Insurance, Fidelity United, HAYAH, ISONSECURE, Max Health, National General, Daman, NLGIC/Liva, Orient, Orient Takaful, Orient Allianz, Qatar Insurance, RAK Insurance, Takaful Emarat, Watania Takaful.

Plus `Plans.md` — master index across all insurers.

### Network Provider Lists
`Workspace/Networks/` — Mednet and Nextcare provider lists (April 2026, Excel format).

---

## 12. Memory System — Persistent Rules

Location: `~/.claude/projects/c--Users-Matheesha-IM-AE-Desktop-Health-Insurance/memory/`

These are corrections and confirmations accumulated from past sessions. Claude applies them automatically — you do not need to re-state them each session.

### Rule 1: Do Only What Was Asked
Do not add unrequested analysis, tables, or extra content when updating a lead or filing documents. If the user says "update status to Quoted", update the status only — do not add a breakdown of next steps.

### Rule 2: Document Folders — Create Only When Documents Are Provided
Never create a `Workspace/Documents/[lead]/` folder preemptively. Create it only when the user actually provides files to file.

### Rule 3: Move Documents, Don't Copy
When filing documents from Downloads, use `mv` not `cp`. This keeps the Downloads folder clean and avoids duplicate files.

### Rule 4: WhatsApp Welcome Message — Show, Don't Send
When onboarding a new lead, always **display the welcome message in chat** for the user to review and send themselves. Never auto-send it. The user wants to control when it goes out.

### Rule 5: CRM Status Change — Click the Confirm Button
After selecting "Followed Up" (or any new status) in the IMCRM dropdown, the confirm/change button must be **explicitly clicked**. The dropdown selection alone does not save. If the click fails, report it immediately.

### Rule 6: Phone Number Format — Correct 970 to 971
The CRM scraper returns UAE mobile numbers with prefix `970`. The correct UAE country code is `971`. Always verify and correct before saving to the lead file or sending any WhatsApp message.

### Rule 7: Referral Welcome Message — Adapt the Intro
For leads that came via referral:
- Replace the standard opener with: "I received your contact details from my colleague [Referrer Name]!"
- Remove the "dedicated advisor" line
- Remove the "I've reviewed your profile" line
- Change the plan intro to: "Just to give you an idea, these are the plan types we offer:"

---

## 13. Directory Structure Reference

```
Health Insurance/
│
├── CLAUDE.md                    ← Orchestrator instructions (primary system prompt)
├── .env                         ← IMCRM credentials (EMAIL, PASSWORD) — keep secure
│
├── Workspace/                   ← Your daily working space
│   ├── PIPELINE.md              ← Master lead pipeline (single source of truth)
│   ├── RENEWALS.md              ← April 2026 renewals pipeline
│   ├── RENEWALS-May-2026.md     ← May 2026 renewals pipeline
│   ├── REFERRALS.md             ← Referral leads not yet in IMCRM
│   ├── SYSTEM.md                ← This file
│   ├── leads.md                 ← Legacy master index (pre-dates per-file system)
│   ├── tasks.md                 ← Open task list
│   │
│   ├── Leads/                   ← One .md per lead (160+ files)
│   │   └── HEA-[8CHAR]-[First]-[Last].md
│   │
│   ├── Renewals/                ← One .md per renewal client (19 files)
│   │   └── [Provider]-[PolicyNumber]-[First]-[Last].md
│   │
│   ├── Documents/               ← Client documents organized by lead
│   │   └── [REF_ID]-[First]-[Last]/
│   │       ├── EID_[Name].pdf
│   │       ├── Passport_[Name].pdf
│   │       ├── Policy_Certificate_[Insurer].pdf
│   │       ├── Policy_Bond_[Insurer].pdf
│   │       ├── ECard_[Name].pdf
│   │       ├── Receipt_[Invoice].pdf
│   │       └── FTC_Email_Draft.txt
│   │
│   ├── SOPs/                    ← Standard Operating Procedures
│   │   ├── Booking Policy.md
│   │   ├── FTC_Email_Template.md
│   │   ├── Policy_Delivery_Email_Template.md
│   │   ├── WhatsApp_Welcome_Message_Template.md
│   │   └── WhatsApp_FollowUp_NonResponders.md
│   │
│   ├── Knowledge Base/          ← Insurer-specific product/underwriting knowledge
│   │   ├── INDEX.md
│   │   ├── Dubai-Insurance.md
│   │   ├── Takaful-Emarat.md
│   │   └── General-Underwriting.md
│   │
│   ├── Plans/                   ← Per-insurer plan details (22 files)
│   ├── Networks/                ← Mednet & Nextcare network Excel files
│   ├── Companies/               ← Group policy company files
│   ├── Reports/                 ← Generated reports (WhatsApp No-Response, etc.)
│   ├── Sales Reports/           ← IMCRM CSV exports
│   └── daily/                   ← Daily activity log files
│
├── Scripts/                     ← Automation scripts
│   ├── get_lead_detail.js       ← Main CRM data fetcher (node Scripts/get_lead_detail.js [CODE])
│   ├── last_30_days_scraper.js  ← Last 30 days lead export
│   ├── single_lead_scraper.js   ← Single lead full detail extractor
│   ├── price_range_plan_scraper.js ← Plan filter by price range
│   ├── crm-session/             ← Saved IMCRM login session (no re-login needed)
│   ├── whatsapp-mcp/
│   │   ├── whatsapp-bridge/     ← Go bridge (whatsmeow), REST API on localhost:8080
│   │   │   └── store/
│   │   │       ├── messages.db  ← SQLite: all sent/received WhatsApp messages
│   │   │       └── whatsapp.db  ← WhatsApp session/auth data (QR scan result)
│   │   └── whatsapp-mcp-server/ ← Python MCP server
│   └── baileys-archive/         ← Legacy WhatsApp stack (archived, do not use)
│
├── .claude/                     ← Claude Code configuration
│   ├── agents/                  ← 10 subagent definition files
│   │   ├── lead-onboarder.md
│   │   ├── document-filer.md
│   │   ├── lead-updater.md
│   │   ├── whatsapp-sender.md
│   │   ├── ftc-drafter.md
│   │   ├── policy-booker.md
│   │   ├── renewal-scanner.md
│   │   ├── renewal-updater.md
│   │   ├── daily-briefer.md
│   │   └── pipeline-auditor.md
│   ├── skills/
│   │   └── project-conventions/SKILL.md  ← Auto-loaded conventions reference
│   ├── settings.json            ← MCP server config (WhatsApp bridge)
│   └── settings.local.json      ← Approved commands allowlist
│
└── Workflows/                   ← Documentation of IMCRM/WhatsApp procedures
    ├── Workflow_Login.md
    ├── Workflow_Single_Lead_Detail.md
    ├── Workflow_Filter_Plans_By_Price.md
    ├── Workflow_Last_30_Days_Report.md
    └── Workflow_WhatsApp_Lead_Tracking.md
```

---

## 14. Key Conventions

### Naming Conventions

| Thing | Pattern | Example |
|---|---|---|
| Lead file | `HEA-[8CHAR]-[First]-[Last].md` | `HEA-282Q2JGD-Revathi-Amin.md` |
| Renewal file (TE) | `TE-[last10digits]-[First]-[Last].md` | `TE-0528328171-Claudius-Vertesi.md` |
| Renewal file (DIC) | `DIC-[shortnum]-[First]-[Last].md` | `DIC-572095-Rathan-Castelino.md` |
| Documents folder | `[REF_ID]-[First]-[Last]/` | `HEA-282Q2JGD-Revathi-Amin/` |
| EID document | `EID_[FirstName].pdf` | `EID_Revathi.pdf` |
| Passport | `Passport_[FirstName].pdf` | `Passport_Revathi.pdf` |
| Policy Certificate | `Policy_Certificate_[Insurer].pdf` | `Policy_Certificate_Takaful.pdf` |

### The Dual-Update Rule
**Every status change requires two file updates:**
- Lead update → lead `.md` file + `PIPELINE.md`
- Renewal update → renewal `.md` file + `RENEWALS.md` + `PIPELINE.md`

Never update one without the other.

### Phone Numbers
- Format for WhatsApp: `971501234567` (no `+`, no spaces, no dashes)
- JID format: `971501234567@s.whatsapp.net`
- IMCRM scraper returns `970` prefix → always correct to `971`

### Dates
- Use `DD-MMM-YYYY` format in lead files (e.g., `20-May-2026`)
- Use `YYYY-MM-DD` format in daily logs and task files

### Advisor Attribution
All leads and policies in this system belong to: **Matheesha Sarathchandra**
Email: matheeshasarathchandra@gmail.com
Company: InsuranceMarket.ae

---

*This document is the canonical system reference. Update it when new agents, skills, SOPs, or rules are added.*
