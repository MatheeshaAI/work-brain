---
type: source
sources: ["raw/10_Work-Insurance/README_Folder_Structure.md"]
updated: 2026-10-22
tags: [insurance, crm, structure, organization]
summary: "Client-centric folder structure for insurance sales"
---
# Source: Insurance Sales Workspace - Client-Centric Structure

Original note: [[raw/10_Work-Insurance/README_Folder_Structure|README_Folder_Structure]]. Detailed client folder layout.

## Structure
Clients/[Client Name] - [Ref ID]/ with subfolders: 01_Conversations (whatsapp/email/call), 02_Quotations (Quote_1/2/Final), 03_Documents (EID/Passport/Visa/medicals/sponsor), 04_Applications (forms/KYC/signed quote), 05_Meetings (notes/transcripts/recordings), 06_Policies (policy doc/receipt/schedule). _Client_Info.txt with quick reference (stage, insurance type, contact, members, company, premium, policy number, next action, notes).

## Workflow
New lead: add to Lead_Tracker (stage 1), create client folder with subfolders and _Client_Info.txt, save initial conversation. Progress: update stage in tracker, add docs to subfolders, update _Client_Info.txt. Policy confirmed (stage 15): move final docs to 06_Policies, keep in Clients/ for renewals/claims.

## Benefits
Everything in one place, easy to find, conversation/meeting history, document organization, renewal-ready, claims support.

## Migration notes
Delete stage-based folders, create Clients/, move existing leads, create for all active leads, use templates.

## Related

- [[Folder structure convention]]
- [[Lead tracking in the CRM]]
- [[Insurance CRM pipeline]]
- [[Insurance Sales Operations - Master Workspace]]
