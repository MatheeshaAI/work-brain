---
type: entity
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/whatsapp.md", "raw/20_AI-and-Agents/My-Shared-Brain/whatsapp-reference.md", "raw/20_AI-and-Agents/My-Shared-Brain/memory/2026-05-17.md"]
updated: 2026-10-22
tags: [whatsapp, messaging, sales, tool]
summary: "The WhatsApp Business account used from the work browser profile for lead follow-up; read and draft are allowed, sending is not without instruction."
---
# WhatsApp Business

The messaging tool the sales work runs on, reached through the work browser profile. Source: `workspaces/Sales/Context/whatsapp.md`, plus the technical reference [[WhatsApp Web Interface Reference Guide]].

## How it is used
- From the work browser profile only, and always in a controlled tab the agent opened itself - see [[Work browser profile]].
- Allowed: list unread chats, summarise unread chat previews, open a controllable WhatsApp Web tab, draft next actions from chat content.
- Not allowed without explicit instruction: sending a message. See [[Automation guardrails]].
- Reading previews is fine for summaries; opening a conversation is only needed when exact context is required.
- Work chats and personal chats stay separate.

## Why the preview-first rule
The chat list carries a one-line preview of the latest message, so most follow-up triage needs no conversation opening at all. Unread chats can be filtered from the list, and the reference gives the selectors for both.

## Technical shape
WhatsApp Web is a drawer-based React app with a virtual-scrolled chat list, `data-testid` anchors throughout and lazy loading of older messages - see [[Virtual scrolling and lazy loading]]. A full technical reference with ten scripts exists in the source tree and is summarised in [[WhatsApp Web Interface Reference Guide]].

## Recorded use
The daily note for 2026-05-17 records opening a controlled WhatsApp Web tab and reading the unread chat list during the first CRM extraction run. See [[Shared Brain Daily Notes May 2026]].

## Caveats
- Automating WhatsApp Web sits against the service's terms; the vault's own rule - never send without instruction - is the practical limit.
- The reference guide was written for the May 2026 build and will drift.

Related: [[My Shared Brain]], [[Browser harness]], [[WhatsApp lead follow-up statuses]], [[Pending reply drafts]], [[Client message style]], [[Sales]].
