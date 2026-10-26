---
type: entity
sources: []
updated: 2026-10-22
tags: [crm, authentication, service, contains-credentials]
summary: "Small VPS service that stores the CRM's session cookies so agents can call the cookie-authenticated CRM without logging in."
---
# Cookie Keeper service

Built March 2026: a PM2-managed service on port 4500 that holds the [[IMCRM]] session cookie and XSRF token uploaded from a logged-in browser. Five endpoints: cookies (returns session, token, upload time and age in minutes), n8n-format cookies, health, and upload. Protected only by a static API key (in the source; not copied).

Flow: agent fetches fresh cookies, sends them as a Cookie header plus `X-XSRF-TOKEN`; 419 or 302 means expired, so refresh ([[Henry - TOOLS and TOOLS_CONFIG]]).

Caveats: a plain-HTTP service exposing live session cookies is high risk; the CRM itself needs two-step verification so cookies must be re-uploaded by a human when they expire. Related: [[Linked device authentication]], [[Getting client data from the CRM]], [[OpenClaw Henry agent workspace]].

## Cross-vault note

Citation(s) moved out during the 2026-10-25 vault split; the source files live in the sibling vault (Brain-Personal):

- `Openclaw/Henry/ARCHIVE.md`
- `Openclaw/Henry/TOOLS_CONFIG.md`

## Cross-vault note

Citation(s) moved out during the 2026-10-25 vault split; the source files live in the sibling vault (Brain-Personal):

- `Openclaw/Henry/TOOLS_CONFIG.md`
