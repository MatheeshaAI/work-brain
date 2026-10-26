---
type: source
sources: ["raw/Health-Insurance/Workflows/WhatsApp_Tool_Guide.md"]
updated: 2026-10-22
tags: [whatsapp, baileys, reference, support]
summary: "Command reference and client-inquiry workflow for the Baileys WhatsApp scripts, with troubleshooting and database notes."
---
# WhatsApp Tool Guide

The long-form manual for the [[Baileys]] scripts. It adds depth to [[Workflow Baileys Setup]]. All phone numbers and names in its examples are samples and are not repeated here.

## Sections
1. **Service management:** start, stop, status, follow logs.
2. **Sending:** text message; file with caption (PDF quotes, policy certificates, images, Word, Excel, any file by MIME type). Rules: international number with no plus sign, service running, relative paths from the `Scripts` folder, short professional captions.
3. **Searching:** by phone, partial name or REF-ID, default 50 results, newest first, with an output showing inbound ("Lead") and outbound ("You") messages, last contact and total count.
4. **Exporting:** Markdown file per chat by JID, with a header (JID, export time, message count) then the conversation; uses listed: compliance archive, sharing, requirements record, email attachment, policy documentation.
5. **Client inquiry workflow (6 steps):** receive inquiry, add it to the lead file, search the history, send quote or response, export the chat for the audit trail, update IMCRM status (via the lead status skill).
6. **Troubleshooting:** QR not showing, not authenticated, messages not syncing, database locked, permission denied.
7. **Database:** `messages` (id, jid, from_jid, from_me, timestamp, type, text, caption, filename, mimetype, media path), `contacts`, `chats`; typical size 10-50 MB per 1,000 messages; monthly backups advised for compliance.
8. **Reference:** phone and JID formats, message type codes (text, image, document, audio, video, sticker).

## Why it matters
It shows the intended compliance habit: every client conversation is archived locally and exported per lead. See [[Local message archive]], [[WhatsApp automation stack]], [[WhatsApp Search And Export Workflow]].

Related: [[Quickstart Baileys WhatsApp]], [[WhatsApp stack timeline]].
