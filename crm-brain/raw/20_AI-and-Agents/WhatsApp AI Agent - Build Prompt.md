# Prompt: Build a WhatsApp AI Agent with Claude Code

Paste this into Claude Code (Claude Code) in VS Code to generate a complete, production-ready WhatsApp AI agent.

---

## Instructions for use

1. Open VS Code, create a new project folder.
2. Open Claude Code (the chat panel).
3. Set it to **Ultra mode** with **Bypass Permission**.
4. Paste the full prompt below and hit start.
5. Claude Code will ask you for your Open Router API key and guide you through scanning the WhatsApp QR code.
6. For deployment, you'll need a Hostinger VPS with EasyPanel (or follow the deploy instructions in the note).

---

## The Prompt

```
You are a senior full-stack developer. Build a complete WhatsApp AI agent system with the following specifications.

## Overview

Create a WhatsApp AI assistant that can:
- Receive and respond to WhatsApp messages automatically using AI
- Support multiple conversations simultaneously
- Include a web dashboard to view conversations, toggle AI/human mode per chat, and see logs
- Be customizable for any business via a system prompt
- Store all conversations in a local database
- Deploy to production on a VPS via GitHub + EasyPanel

## Tech Stack

- **Node.js** with Express
- **WhatsApp Web** connection via Baileys library (WhatsApp Web emulation — for inbound customer support, not bulk marketing)
- **SQLite** (or better-sqlite3) for local database storage
- **EJS** or simple HTML/CSS/JS for the dashboard frontend
- **Open Router API** for AI model access (any model the user configures)
- Ready for **EasyPanel** deployment (Dockerfile or direct Node)

## Features

### 1. WhatsApp Connection
- QR code authentication (scan with WhatsApp → Linked Devices)
- Auto-reconnect on disconnect
- Handle incoming text messages
- Send AI-generated responses back

### 2. AI Integration (Open Router)
- Configurable model name (default: openai/gpt-4o-mini)
- Configurable API key via environment variable
- System prompt stored in env or config file
- Conversation history included in context window (last N messages)
- Rate limiting and error handling for API calls

### 3. Web Dashboard
- Login page with basic auth (username/password from env vars)
- List of all conversations (showing phone number, last message, timestamp)
- Click into a conversation to see full history
- **AI / Human toggle** per conversation — when in human mode, messages are not auto-replied
- Ability to send a manual reply from the dashboard when in human mode
- Clean, professional UI with responsive design

### 4. Database (SQLite)
- Table: `conversations` — id, phone, last_message, mode (ai/human), created_at, updated_at
- Table: `messages` — id, conversation_id, role (user/assistant/system), content, timestamp
- Table: `logs` — id, level, message, timestamp

### 5. Production Ready
- Environment variables via `.env` file:
  - `OPEN_ROUTER_API_KEY`
  - `AI_MODEL` (default: openai/gpt-4o-mini)
  - `SYSTEM_PROMPT` (the business instructions for the AI)
  - `ADMIN_USERNAME` / `ADMIN_PASSWORD` (dashboard login)
  - `PORT` (default: 3000)
- Persistent volumes for data (conversations + logs) — easy to mount in EasyPanel
- Health check endpoint at `/health`
- Graceful shutdown

## Deployment
- Include a `Dockerfile` for containerized deployment
- Include `easy-panel.json` or deployment instructions for EasyPanel
- The app must store data in `/app/data/` for EasyPanel volume mounts

## What to build

Generate the complete project structure:

```
/
├── index.js              # Main entry point
├── package.json          # Dependencies
├── .env.example          # Example env vars
├── Dockerfile            # For EasyPanel deployment
├── src/
│   ├── whatsapp.js       # Baileys WhatsApp client logic
│   ├── ai.js             # Open Router API integration
│   ├── database.js       # SQLite setup and queries
│   ├── dashboard.js      # Express routes for dashboard
│   └── config.js         # Config loader
├── views/
│   ├── login.ejs         # Login page
│   ├── conversations.ejs # Conversation list
│   └── conversation.ejs  # Single conversation view
└── public/
    └── style.css         # Dashboard styling
```

Make sure every file is complete, working, and well-commented. After creating all files, guide the user through:
1. Setting up their Open Router API key
2. Scanning the WhatsApp QR code
3. Customizing the system prompt for their business
4. Deploying to production

The agent should work immediately after setup with no additional configuration beyond the API key and WhatsApp connection.
```

---

## After the build

1. Claude Code will create the project files and walk you through setup.
2. It will ask for your Open Router API key — get one free at [openrouter.ai](https://openrouter.ai).
3. Scan the QR code with WhatsApp (Settings → Linked Devices → Link a Device).
4. Use `/personaliza` or manually edit the `SYSTEM_PROMPT` env var to train the agent for your business.

## Deploy to production

Follow the steps in [[WhatsApp AI Agent with Claude Code#Phase 3 Production Deploy 24/7]] to push to GitHub → EasyPanel → VPS.
