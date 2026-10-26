---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_WhatsApp_Search.md"]
updated: 2026-10-22
tags: [whatsapp, wacli, search, compliance]
summary: "How to search a lead's WhatsApp history, answer follow-up questions from it, and export chats for compliance."
---
# WhatsApp Search And Export Workflow

How the locally synced WhatsApp database is used to track follow-ups. Written for [[wacli]]; prerequisites are a background sync and conversations already synced.

## Search
By lead name, REF-ID or phone, plus raw keyword search across all chats and listing chats or messages for a JID with the CLI. Output lists inbound and outbound messages with timestamps, last contact and total count.

## Questions it answers
- How many times have I contacted a lead (count outbound lines).
- Which question is still unanswered (export the chat and read).
- Was a coverage topic such as pre-existing conditions discussed (keyword search).
- Which leads mention a given plan (keyword search across chats).
- When was the last contact.

## Export
A Markdown file per chat into the lead's document folder; export after the quote is sent and again after the policy is booked, stored with a date stamp. An optional script exports every chat into one folder.

## Compliance
"All lead communications must be archived." Before claiming a lead is fully informed, search for coverage, benefits, exclusions and limits, check the response rate, and export for the compliance file.

## Troubleshooting
No messages found (search term or no sync), JID format error (must end `@s.whatsapp.net`), empty export (sync not run).

Related: [[Local message archive]], [[WhatsApp follow-up gaps]], [[WhatsApp non-responder follow-up]], [[WhatsApp Tool Guide]].
