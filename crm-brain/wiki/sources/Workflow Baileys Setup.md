---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_Baileys_Setup.md"]
updated: 2026-10-22
tags: [whatsapp, baileys, setup, sqlite]
summary: "Full setup guide for the Baileys plus SQLite WhatsApp integration that replaced the wacli Go binary on Windows."
---
# Workflow Baileys Setup

Complete install and usage guide for the Node.js [[Baileys]] integration. It states that it replaces the old `wacli` system (a Go binary that only worked on Linux and Mac) with something that runs natively on Windows. Related: [[Quickstart Baileys WhatsApp]], [[Baileys migration notes]], [[WhatsApp setup quick start]].

## Features claimed
Send and receive messages, auto-sync full history as a backup, local SQLite database with no cloud dependency, search conversations, export chats to Markdown, background service on Windows.

## Install
Node.js 16 or newer, then `npm install` in `Scripts`, which installs the Baileys library (WhatsApp Web protocol), `better-sqlite3` and `pino` logging.

## Auth
First run shows a QR code; scan once via Linked Devices ([[Linked device authentication]]). The auth folder holds session keys and must not be deleted or shared; it is credentials, not copied here.

## Usage
- Send text or documents (`wa-send.js`), search by phone/name/REF-ID with a result limit (`wa-search.js`), export a chat by JID (`wa-export.js`).
- Service control: `wa-sync.js start | stop | status`; logs in a log file.

## Database
Three tables: `messages` (all message types), `contacts` (JID mapping), `chats` (metadata and last message time). Sample SQL for counting and keyword search is given. See [[Local message archive]].

## Old versus new (as the file's table)
| Feature | wacli | Baileys |
|---|---|---|
| OS | Linux/Mac only | Windows, Mac, Linux |
| Auth | `wacli auth` | QR code plus auth folder |
| Database | binary | SQLite (readable) |

## Caveats in the file
Service must keep running; the phone must be online; first sync can take over 10 minutes; one writer at a time (database locked errors); small ban risk of unofficial APIs. Migration: old wacli data is ignored and everything re-syncs.

Flag: this guide and [[Workflow WhatsApp Setup]] (wacli) describe two different stacks, and the 2026-05-20 system overview describes a third (Go bridge). See [[WhatsApp stack timeline]].
