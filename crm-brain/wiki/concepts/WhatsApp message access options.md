---
type: concept
sources: ["raw/20_AI-and-Agents/Sales_OS_Opencode_Session.md", "raw/20_AI-and-Agents/whatsaoo agent sessinon.md", "raw/20_AI-and-Agents/Links.md"]
updated: 2026-10-22
tags: [whatsapp, integration, comparison]
summary: "The ways to read (and send) WhatsApp messages from an agent, as compared in Sales_OS_Opencode_Session on 31 Jan 2026."
---
# WhatsApp message access options

The ways to read (and send) WhatsApp messages from an agent, as compared in [[Sales_OS_Opencode_Session]] on 31 Jan 2026.

| Method | Claimed latency | Notes |
|---|---|---|
| [[Evolution API]] webhooks | under 50 ms | Push on new message; needs a hosted instance |
| Evolution API websockets | under 100 ms | More setup |
| Evolution API REST polling | 1-5 s | Easy |
| Playwright / Selenium scraping WhatsApp Web | 1-10 s | Breaks on UI changes, needs an open browser, ban risk ([[send-whatsapp]]) |
| WhatsApp Business API | under 50 ms | Official, complex, paid |
| [[Baileys]] library | not compared | Chosen later; see [[WhatsApp automation stack]] |

**Corrections.** The session calls Evolution API "official" and ban-free. It is an unofficial gateway (Baileys-class) unless connected to the Cloud API, so a ban risk remains for bulk use ([[WhatsApp AI Agent with Claude Code]]). Latency numbers are the model's, not measured.

Decision at the time: webhooks into a VPS backend with manual approval ([[Draft and approve messaging flow]]). See also [[Local message archive]] for the archive-based alternative.
