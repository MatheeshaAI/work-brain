---
type: source
sources: ["raw/20_AI-and-Agents/WhatsApp AI Agent - Build Prompt.md"]
updated: 2026-10-22
tags: [whatsapp, prompt, baileys, express, sqlite, openrouter]
summary: "The paste-into-Claude-Code prompt that specifies a full WhatsApp AI agent: Baileys, Express, SQLite, OpenRouter, dashboard and Docker."
---
# WhatsApp AI Agent - Build Prompt

The prompt that the video in [[WhatsApp AI Agent with Claude Code]] tells you to paste into [[Claude Code]]. It casts the model as a senior full-stack developer and asks for a complete, deployable project. Overview in [[WhatsApp AI agent build recipe]].

## Specification
- **Capabilities.** Reply to WhatsApp messages with AI, handle several conversations at once, dashboard to view chats and toggle AI/human mode per chat, customisable by system prompt, local database, deploy to a VPS through GitHub and EasyPanel.
- **Stack.** Node.js with Express; [[Baileys]] for WhatsApp Web (inbound support, not bulk marketing); SQLite (better-sqlite3); EJS or plain HTML/CSS/JS dashboard; [[OpenRouter]] for model access (default `openai/gpt-4o-mini`); Dockerfile for [[EasyPanel]].
- **Features.** QR authentication with auto-reconnect; configurable model, key and system prompt; last-N-messages context; rate limiting and error handling; login page with basic auth; conversation list and detail; manual reply when in human mode.
- **Database.** Tables `conversations` (phone, last message, mode ai/human), `messages` (role, content, timestamp) and `logs`.
- **Production.** `.env` variables for the key, model, system prompt, admin login and port; persistent data under `/app/data/`; `/health` endpoint; graceful shutdown.
- **Layout.** `index.js`, `package.json`, `.env.example`, `Dockerfile`, `src/` (whatsapp, ai, database, dashboard, config), `views/` (login, conversations, conversation) and `public/style.css`.
- After the build Claude should walk the user through the API key, QR scan, system prompt and deployment.

## Caveats
- The setup advice (Ultra mode with permission bypass) removes safety prompts; avoid that on a machine holding client data. See [[Automation guardrails]].
- Contains no actual secrets, only placeholders.
