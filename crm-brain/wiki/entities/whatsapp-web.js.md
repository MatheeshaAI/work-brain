---
type: entity
sources: ["raw/work_os system designing documents/04_AUTOMATION/WhatsApp_Notion_Integration.md", "raw/work_os system designing documents/04_AUTOMATION/whatsapp_mvp_Based_on_Mark.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/REBUILD_PROMPT.md"]
updated: 2026-10-22
tags: [tool, whatsapp, puppeteer, library, stub]
summary: "**Stub.** A Node.js library that controls a WhatsApp Web session through Puppeteer (a headless Chromium); log in once by"
---
# whatsapp-web.js

**Stub.** A Node.js library that controls a WhatsApp Web session through Puppeteer (a headless Chromium); log in once by scanning a QR code, the session persists in a local auth folder. In the owner's early-2026 plan it is the WhatsApp leg of the Node stack ([[Work OS Full System Documentation]]), used for the per-number auto-reply MVP ([[WhatsApp MVP and Notion Integration]]) and for ClaudeClaw's `wa-daemon` ([[ClaudeClaw Rebuild Prompt]]). It automates a normal personal account and is not an official WhatsApp API ([[WhatsApp Business]]). It was later superseded in the owner's own stacks by [[Baileys]] and then whatsapp-mcp ([[WhatsApp automation stack]]). No dedicated source for the library itself.
