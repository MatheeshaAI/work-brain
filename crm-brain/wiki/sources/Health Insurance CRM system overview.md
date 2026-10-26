---
type: source
sources: ["raw/Health-Insurance/Workspace/SYSTEM.md"]
updated: 2026-10-22
tags: [insurance, system, crm, architecture, agents, conventions]
privacy: aggregate only - no client data appears in this document
summary: "The canonical 808-line system reference: the three-layer agent architecture, the canonical lead status flow, the 10 subagents, 7 persistent rules, and the WhatsApp/IMCRM integration."
---
# Source: Health insurance CRM system overview

`Workspace/SYSTEM.md` is the workspace's own reference document - **808 lines, 35.9 KB, last written 20 May 2026**, in 14 sections. It ends with: *"This document is the canonical system reference. Update it when new agents, skills, SOPs, or rules are added."*

It is the closest thing the workspace has to a specification, and reading it against what the files actually contain explains most of the drift elsewhere in the wiki. See [[Workspace audit June 2026]].

## 1. What the system is
An **AI-assisted health insurance sales CRM** built on Claude Code plus Obsidian: lead onboarding → quoting → FTC email → payment → policy booking → renewals, with WhatsApp as the client channel and Alfred IMCRM as the system of record for quotes.

## 2. Three-layer architecture
| Layer | Where | Role |
|---|---|---|
| 1. Orchestrator | `AGENTS.md` | reads intent, dispatches a subagent, reports back |
| 2. **10 subagents** | `.claude/agents/` | narrow scope, exact SOP steps |
| 3. Conventions | `project-conventions` skill | auto-loaded rules, 7 feedback files |

The orchestrator rule is explicit: *"You do not do work directly. You delegate to subagents."* Simple factual questions are the exception - read the file and answer.

## 3. Data model
- **Lead identifier:** `HEA-XXXXXXXX` (8 alphanumeric characters).
- **Lead file structure:** General Information, Customer Profile, Payment Details, **Confirmed Plan (added when quoted)**, Member Details (one section per member for family cases), Documents, Status Updates.
- **Renewal file structure:** policy details, customer profile, renewal quote, payment status, status updates.
- **PIPELINE.md sections in order:** New Leads → In Progress → Payment Stage → Policy Booked → Renewals.
- **RENEWALS.md sections in order:** URGENT → Due This Month → In Progress → Quote Sent/Payment Pending → Renewed → Did Not Renew/Lapsed.

## 4. The canonical lead status flow
| Status | Meaning | Board section |
|---|---|---|
| `New Lead` | just created, welcome message sent | New Leads |
| `Quoted` | quote comparison sent | In Progress |
| `Followed Up` | follow-up sent after a quote | In Progress |
| `Payment Initiated` | payment link shared | Payment Stage |
| `Payment Pending` | client confirmed intent, not paid | Payment Stage |
| `Application Submitted` | application sent to insurer | Payment Stage |
| `Sent for Booking` | all documents ready | Payment Stage |
| `Policy Booked` | fully booked, documents uploaded | Policy Booked |
| `Lapsed` | lead went cold, no response | **removed** from the pipeline |

**Nine statuses.** Compare with the 22 values actually present in the dossiers, the 7 in the 30-day CRM export and the 6 in the April export. The specification is clean; the files are not. See [[Dossier structure]] and [[Lead pipeline stages]].

Note also that `Lapsed` means *"lead went cold"* here, while the renewals board uses `Lapsed` to mean *"did not renew"* - the same word, two meanings, in one workspace. See [[Renewal pipeline]].

## 5. The renewal lifecycle
```
Due -> Contacted -> Quote Sent -> Payment Pending -> Renewed
                                                   -> Lapsed
```
File naming `[Provider]-[PolicyNumber]-[First]-[Last].md` (Takaful Emarat uses the last 10 digits of the policy number, Dubai Insurance the short form), and the **three-file update rule**: renewal file + renewals board + pipeline board.

## 6. The ten subagents
`lead-onboarder`, `document-filer`, `lead-updater`, `whatsapp-sender`, `ftc-drafter`, `policy-booker`, `renewal-scanner`, `renewal-updater`, `daily-briefer`, `pipeline-auditor`. Each has a fixed trigger phrase, a fixed file, and a fixed step list - the `whatsapp-sender` steps, for instance, read the lead, pull the conversation from the message archive, pick a follow-up type, apply the salutation rules, and compose 3-5 short paragraphs with one call to action.

**`pipeline-auditor` is the one the workspace most needs and least uses** - the June audit notes it has probably not run recently. See [[Workspace audit June 2026]].

## 7-9. Skills, WhatsApp, IMCRM
- **Skills:** `crm-plan-download` and `document-renamer` (global), `project-conventions` (project, auto-loaded).
- **WhatsApp:** a Go bridge (`whatsmeow`) on localhost:8080 with a Python MCP server in front of it; a **local SQLite archive** of every message for audit; one-time QR login, and the bridge must be restarted **after every Windows reboot**; phone numbers in international form without `+`, and the CRM's `970` prefix must be corrected to `971`; a non-responder SOP with a follow-up ladder.
- **IMCRM:** scripts for single-lead extraction and 30-day reporting; the reference id can arrive as a bare code, a full `HEA-` id or a quote URL and must be parsed to the 8-character code; a status change is only done by clicking the CRM's own confirm button.

## 10-11. SOPs and the knowledge base
Five SOPs (booking, FTC email, policy delivery email, WhatsApp welcome, WhatsApp non-responder follow-up) and a knowledge base of insurer underwriting notes with an index, the plan library and network provider lists. All five SOPs are already ingested - see [[Policy booking SOP]], [[Financial terms confirmation email SOP]], [[Policy delivery email SOP]], [[WhatsApp welcome message template]] and [[WhatsApp non-responder follow-up SOP]].

## 12. Seven persistent rules
1. **Do only what was asked** - no unrequested analysis, tables or notes.
2. **Create document folders only when documents are provided.**
3. **Move documents, don't copy them.**
4. **WhatsApp welcome message - show, don't send.**
5. **CRM status change - click the confirm button.**
6. **Phone number format - correct `970` to `971`.**
7. **Referral welcome message - adapt the intro.**

**Rules 2 and 4 contradict the workspace's own workflow.** The workflow that adds a lead says to create the documents folder as step 3, unconditionally, and to **send** the welcome message through the REST API (*"do not just display it - actually send it"*). The persistent rules say create the folder only when documents exist, and show the message rather than send it. The dossier store shows rule 2 losing: **16 document folders exist and 14 of them are empty**. See [[Folder structure convention]].

## 13-14. Conventions
- **Dual-update rule:** *"Always update both the lead file AND PIPELINE.md together. Never leave one out of sync."* In practice the board carries 35 unlinked references and a 106-row New Leads table the audit calls broken.
- **Dates:** `DD-MMM-YYYY` in lead files, `YYYY-MM-DD` in daily logs and task files - which is why the same date reads `20-May-2026` in a dossier and `2026-05-20` in a log.
- **Advisor attribution:** every lead and policy belongs to the single advisor, trading under the **InsuranceMarket.ae** brokerage name.
- **Phone numbers:** `97150xxxxxxx` for WhatsApp, `97150xxxxxxx@s.whatsapp.net` as the JID.

## Related
- [[Insurance Sales Operations - Master Workspace]]
- [[Dossier structure]]
- [[Client dossiers]]
- [[Pipeline board]]
- [[Renewals board]]
- [[Task list]]
- [[Lead pipeline stages]]
- [[Insurance CRM pipeline]]
- [[Lead reference IDs]]
- [[Folder structure convention]]
- [[WhatsApp setup quick start]]
- [[Baileys migration notes]]
- [[CRM hygiene]]
- [[Workspace audit June 2026]]
