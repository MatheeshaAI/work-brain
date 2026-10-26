---
type: concept
sources: ["raw/10_Work-Insurance/README_Folder_Structure.md", "raw/Health-Insurance/Context/WORKSPACE_REORGANIZATION.md", "raw/Health-Insurance/Memory/wikilink-conventions.md"]
updated: 2026-10-22
tags: [insurance, organization, structure]
summary: "Client-centric folder structure convention"
---
# Folder structure convention

Client-centric organization from [[Insurance Sales Workspace - Client-Centric Structure]].

## Structure
```
Clients/[Client Name] - [Ref ID]/
├── 01_Conversations/  # WhatsApp, email, call logs
├── 02_Quotations/     # Quotes sent, final quote
├── 03_Documents/      # EID, Passport, Visa, medicals, sponsor docs
├── 04_Applications/   # Forms, KYC, signed quote
├── 05_Meetings/       # Notes, transcripts, recordings
├── 06_Policies/       # Policy doc, receipt, schedule
└── _Client_Info.txt   # Quick reference
```

## _Client_Info.txt fields
Client, Reference ID, Stage, Insurance Type, Contact, Members, Insurance Company, Premium, Policy Number, Next Action, Notes.

## Workflow
New lead creates folder with subfolders and info file; as lead progresses add docs and update info; on policy confirmation move final docs to 06_Policies and keep for renewals/claims.

## Related

- [[Lead tracking in the CRM]]
- [[Insurance CRM pipeline]]
- [[Insurance Sales Operations - Master Workspace]]

## A second folder convention, in the live workspace (2026-10-22 ingest)
The client-centric layout above is the **raw-notes** convention. The running desk uses a different one, reorganised on 23-Apr-2026:

```
Workspace/
├── Leads/
│   ├── Health Insurance/Individual-Health-Insurance/   <- one file per lead
│   ├── Health Insurance/Group-Health-Insurance/
│   ├── Motor Insurance/
│   ├── Lead-Context/
│   ├── Referral Leads/
│   └── Renewals/<month>/
├── Documents/<REF_ID>-<Name>/
├── Sales Reports/
├── SOPs/
├── PIPELINE.md, RENEWALS.md, REFERRALS.md, tasks.md
```
plus `Plans/`, `Networks/`, `Knowledge Base/`, `Reports/` and `daily/` for reference material, with the tooling (`Scripts/`, `Dashboard/`, `IMCRM Data Extracting Extention/`, `Workflows/`) kept at the vault root.

Source: [[Workspace reorganization]], [[Workspace and infrastructure separation]].

Two differences from the client-centric convention: the unit is the **lead file**, not the client folder, and every folder that holds files carries a **markdown index** listing its contents. See [[Lead folder index files]], [[Wikilink conventions]].
