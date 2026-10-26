---
name: project-conventions
description: Background reference for all naming conventions, file paths, status values, and workflow rules in this health insurance CRM. Claude-only — loaded automatically when context is needed.
user-invocable: false
---

# Project Conventions Reference

This is internal reference knowledge for Claude. Do not show this to the user unless they ask about a specific convention.

## File Naming

### Lead Files
Pattern: `Workspace/Leads/[REF_ID]-[First]-[Last].md`
- REF_ID includes the full `HEA-` prefix: `HEA-XXXXXXXX`
- Use the name as it appears in IMCRM
- No spaces — hyphen-separated

### Renewal Files
Pattern: `Workspace/Renewals/[Provider]-[PolicyNumber]-[First]-[Last].md`
- **TE policies:** Use last 10 digits of full policy number
  - `01-115-01-25-0528328171` → `TE-0528328171-Claudius-Vertesi.md`
- **DIC policies:** Use the short policy number
  - `DIC-572095` → `DIC-572095-Rathan-Castelino.md`

### Document Folders
Pattern: `Workspace/Documents/[REF_ID]-[First]-[Last]/`
- Must match the lead file name exactly
- Create the folder only when documents are actually provided — never preemptively

### Document File Naming
Use descriptive names including the person's first name:
- `EID_[FirstName].pdf` / `EID_[FirstName].png`
- `Passport_[FirstName].pdf`
- `Visa_[FirstName].pdf`
- `Policy_Certificate_[InsuranceCo].pdf`
- `Policy_Bond_[InsuranceCo].pdf`
- `ECard_[FirstName].pdf`
- `Receipt_[InvoiceNumber].pdf`
- `FTC_Email_Draft.txt`

## Lead Status Values
(Used in lead markdown files AND PIPELINE.md — must stay in sync)

| Status | Meaning |
|--------|---------|
| `New Lead` | Just created, welcome message sent |
| `Quoted` | Quote comparison sent to client |
| `Followed Up` | Follow-up sent after quote |
| `Payment Initiated` | Payment link shared with client |
| `Payment Pending` | Client confirmed intent but not paid |
| `Policy Booked` | Fully booked, documents uploaded |
| `Lapsed` | Lead went cold / no response |

## Renewal Status Values
`Due` → `Contacted` → `Quote Sent` → `Payment Pending` → `Renewed` → `Lapsed`

## PIPELINE.md Sections (in order)
1. 🔴 New Leads (Needs Immediate Action)
2. 🟡 In Progress (Quoted / Followed Up)
3. 🟠 Payment Stage
4. ✅ Policy Booked
5. 🔄 Renewals

## WhatsApp Salutation Rules
| IMCRM Gender/Marital | Salutation |
|----------------------|-----------|
| Male (any) | Mr. |
| Female-Married | Mrs. |
| Female-Unmarried | Miss |
| Female (no status) | Ms. |
| Age < 18 | First name only |

## Phone Number Format
- WhatsApp: international format without `+` — `971501234567`
- JID format: `971501234567@s.whatsapp.net`
- UAE numbers: `971` + 9-digit number (drop leading 0 from local format)

## Key Paths
- CRM base URL: `https://imcrm.alfred.ae/quotes/health/[8-CHAR-CODE]`
- Lead detail script: `node Scripts/get_lead_detail.js [8-CHAR-CODE]`
- WhatsApp bridge health: `curl http://localhost:8080/api/health`
- WhatsApp messages DB: `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db`
- Session folder: `Scripts/crm-session/` (no re-login needed while session exists)

## Dual-Update Rule
**Always update both files together:**
- When changing a lead's status → update the lead's `.md` file AND `PIPELINE.md`
- When changing a renewal's status → update the renewal's `.md` file AND `RENEWALS.md`
- Never leave one out of sync with the other

## Do Only What Is Asked
Do not add unrequested analysis, extra sections, or content when performing status updates or document filing. If the user says "update status to Quoted", update the status — do not add notes about next steps unless asked.

## Document Moves
Move files from Downloads — do not copy. Source locations:
- `C:/Users/Matheesha-IM.AE/Downloads/`
- `C:/Users/Matheesha-IM.AE/Pictures/Screenshots/`
- `C:/Users/Matheesha-IM.AE/.browseros/downloads/`

## Advisor
All leads in this system: **Matheesha Sarathchandra** — matheeshasarathchandra@gmail.com
