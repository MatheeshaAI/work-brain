---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_WhatsApp_Setup.md"]
updated: 2026-10-22
tags: [whatsapp, wacli, setup]
summary: "How to install Go, build the wacli command-line client from source and authenticate with WhatsApp."
---
# Workflow WhatsApp Setup

The first-generation setup guide, built on [[wacli]], a Go command-line WhatsApp client for local message management, search and archive. See also the earlier ingest [[WhatsApp integration setup complete (wacli)]].

## Steps
1. **Install Go** 1.25 or newer (Windows zip into the Program Files folder plus PATH; Homebrew on macOS; apt on Linux).
2. **Build wacli** from its GitHub repo with the `sqlite_fts5` build tag so full-text search works.
3. **Authenticate** with `wacli auth`; a QR code is scanned from the phone ([[Linked device authentication]]).

The rest of the file covers background sync and the first message tests, consistent with [[Workflow WhatsApp Send Message]] and [[WhatsApp Search And Export Workflow]], which both assume wacli.

## Status
Superseded: the April 2026 Baileys guide says it replaced wacli ([[Workflow Baileys Setup]]), and the May 2026 overview uses a Go bridge ([[WhatsApp stack timeline]]). Several workflow files still reference `wacli-*.js` scripts, so the documentation set is internally inconsistent.
