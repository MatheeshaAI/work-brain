# WhatsApp AI Agent with Claude Code

> Build, train, and deploy a professional WhatsApp AI agent — all from inside VS Code using Claude Code (Claude Code). No coding required.

## Big Picture

This video walks through creating a **fully functional WhatsApp AI assistant** using [[Claude Code]], [[Open Router]] for AI models (free options available), and deploying it on a VPS so it runs 24/7. The agent can be trained for any business — customer support, lead qualification, sales — and includes a web dashboard to manage conversations.

The creator breaks it into **3 phases**:

---

## Phase 1: Development (Local Setup)

1. **Get the project prompt** — a ~7,000-word prompt that tells Claude Code to build the entire WhatsApp agent project from scratch.
2. **Paste it into Claude Code** in VS Code (use Ultra mode + Bypass Permission).
3. Claude Code generates the full project — backend, dashboard, WhatsApp integration, database.
4. **Create accounts:**
   - [[Open Router]] — free signup at openrouter.ai, get an API key (this is the "brain" of the agent).
   - A WhatsApp account to connect the agent to.
5. Claude Code asks for the Open Router API key, you paste it in chat.
6. A QR code appears — **scan it with WhatsApp** (Settings → Linked Devices → Link a Device) to connect the agent to your WhatsApp number.

✅ After this phase, the agent works **locally** on your computer. It responds to messages but only while your PC is on.

---

## Phase 2: Training (Customization)

Use the `/personaliza` command in Claude Code to train the agent for a specific business:

- Business name & what it does
- Who it sells to
- When a lead is qualified (or not)
- Personality & tone

Claude Code builds a **System Prompt** from your answers and injects it into the agent. You can also connect:

- **Databases** (Supabase, vector databases for memory)
- **Google Calendar** (for booking)
- **Email** (for follow-ups)
- **Custom branding** on the dashboard (logo, colors)

### Key Feature: AI / Human Toggle

The dashboard has a toggle per conversation — switch between **AI mode** (agent responds) and **Human mode** (you respond manually). Useful for handovers.

---

## Phase 3: Production (Deploy 24/7)

To keep the agent running without your PC on:

1. **Push the project to GitHub** — Claude Code does this automatically if you're signed in.
2. **Buy a VPS** — recommended: [Hostinger VPS](https://hostinger.com) (KVM2 plan, 12-24 months, code `JUANP` for discount). Choose **OS with Panel → EasyPanel**.
3. **Connect EasyPanel to GitHub** — generate a GitHub token (Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens) with read-only access to the repo, paste it into EasyPanel.
4. **Set up the app in EasyPanel:**
   - Select your GitHub repo, branch `main`, build path `/`
   - Add environment variables: `OPEN_ROUTER_API_KEY` and model name (e.g., `openai/gpt-4o-mini`)
   - Add persistent storage volumes for conversations and login data
5. **Deploy** — EasyPanel builds and deploys the app. You get a free domain or can add a custom one.
6. **Add basic auth** in EasyPanel Security to protect your dashboard.
7. **Scan the QR code again** via the live dashboard URL to reconnect WhatsApp to the production instance.

✅ **Done.** The agent now runs 24/7 on the VPS. Close your laptop — it keeps working.

---

## Glossary

| Term | Meaning |
|------|---------|
| **Claude Code** | An AI coding assistant inside VS Code that can build entire projects from prompts |
| **Open Router** | A service that gives you access to many LLMs (GPT, Claude, etc.) via one API key — some models are free |
| **VPS** | Virtual Private Server — a remote computer that stays on 24/7 |
| **EasyPanel** | A hosting control panel that makes deploying web apps easy |
| **Baileys** | A library that mimics WhatsApp Web to let the agent send/receive messages (for customer support, not bulk marketing) |
| **System Prompt** | The instructions that define the agent's personality, knowledge, and behavior |

## Important Disclaimer

This setup uses **Baileys** (WhatsApp Web emulation). It's great for **customer support & reception** — responding to inbound messages. Do **not** use it for bulk marketing or mass messaging; Meta will ban the account. Use official Meta templates for marketing.

## Related

- [[Claude Free Setups]]
- [[How to Learn Claude Code]]
