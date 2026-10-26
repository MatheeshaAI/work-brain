# WhatsApp MVP & Notion Integration Summary

This document serves as a reference for the WhatsApp prototype (MVP) and the
process of connecting it to Notion for lead management and automated replies.
It collects the key points, code snippets and workflows discussed during the
session.

---

## 1. WhatsApp MVP Overview

The MVP is a minimal Node.js script that uses `whatsapp-web.js` to control a
WhatsApp Web session via Puppeteer. It demonstrates core capabilities:

1. Scan a QR code once to log into your WhatsApp account.
2. Listen for incoming messages and log them to the console.
3. Enable or disable automatic replies per phone number.
4. Send messages programmatically using `client.sendMessage()`.

### Key files

- `index.js` – main script.
- Dependencies: `whatsapp-web.js`, `qrcode-terminal`.

### Important utility functions

```js
function normalizeNumber(num) {
  // strip non-digits; WhatsApp message.from gives digits without +
  return num.replace(/\D/g, '');
}
```

### CLI Commands (via readline)

- `enable <number>` – allow automation for that number
- `disable <number>` – turn automation off
- `list` – show all enabled numbers

Numbers are normalised before comparison so `+97150xxx` or
`97150xxx` both work.

### Message handler snippet

```js
client.on('message', async msg => {
  const number = normalizeNumber(msg.from.split('@')[0]);
  const text = msg.body;
  console.log(`msg from ${number}: ${text}`);
  if (!autoReplyEnabled.has(number)) return;
  // keyword rules and default reply...
});
```

Replies use `msg.from` to ensure the correct chat ID is passed. Send calls
are wrapped in `try/catch` to prevent crashes.

### Contact information

You can fetch contact metadata:

```js
const contact = await msg.getContact();
console.log(contact.id.user);   // phone digits
console.log(contact.name);      // your saved name, if any
console.log(contact.pushname);  // their public nickname
console.log(contact.isMyContact);
```

**Note:** only numbers saved in your WhatsApp account will have a `name`.
Un-saved numbers show digits only. The other party cannot see whether you’ve
saved their name.

### Loading older messages

The library mirrors WhatsApp Web’s behaviour. To fetch history:

```js
const chat = await client.getChatById('46832977731753@c.us');
await chat.fetchMessages({ limit: 100 });
while (await chat.loadEarlierMsgs()) { /* repeat */ }
```

Those messages may be stored in a local SQLite table if needed.

---

## 2. Integrating with Notion

The goal is to tie WhatsApp communication to a Notion database that contains
your sales pipeline and follow-up tasks. You can push incoming messages into
Notion, and trigger outgoing messages from Notion rows.

### Authentication & Setup

1. Create a Notion integration (Settings → My integrations).
2. Grant it necessary scopes (`pages:read`,`pages:write`,`databases:read`,
   `databases:write`).
3. Copy the internal integration token and store it in an environment variable
   `NOTION_TOKEN` in the MVP directory.
4. Share the relevant Notion page or database with the integration.

```bash
npm install @notionhq/client
```

### Example Notion helper module

```js
// notion.js
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function addMessageToNotion(number, text, direction = 'in') {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB },
    properties: {
      Number: { rich_text: [{ text: { content: number } }] },
      Text: { rich_text: [{ text: { content: text } }] },
      Direction: { select: { name: direction } },
      Date: { date: { start: new Date().toISOString() } }
    }
  });
}

async function checkForOutgoingNotionMessages() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DB,
    filter: { property: 'Sent', checkbox: { equals: false } }
  });
  for (const row of res.results) {
    const number = row.properties.Number.rich_text[0].text.content;
    const text   = row.properties.Text.rich_text[0].text.content;
    await client.sendMessage(number + '@c.us', text);
    await notion.pages.update({
      page_id: row.id,
      properties: { Sent: { checkbox: true } }
    });
  }
}

module.exports = { addMessageToNotion, checkForOutgoingNotionMessages };
```

Integration code in `index.js` should call `addMessageToNotion()` from the
message handler and run `checkForOutgoingNotionMessages()` on a timer
(e.g. every 30 s).

### Webhook vs Polling

- **Webhooks**: Notion can POST events when a page in a database changes. Use
  an Express server to receive them (`/notion-hook`). Register the webhook
  via the Notion API, or a third‑party tool (Make/IFTTT) if you can’t expose a
  public URL. Services like `ngrok` let you develop locally.

- **Polling**: Periodically query the database for rows needing action. Works
  if your environment cannot accept incoming connections.

Both methods feed into a central handler that looks up the changed page and
decides what to do next.

### Follow‑up workflow example

1. Notion row gets `NeedsFollowup = true`.
2. Webhook/poll calls `handleNotionChange(pageId)`.
3. Handler fetches the page, retrieves the WhatsApp chat history from local
   SQLite (last 10 messages), and constructs an LLM prompt:
   
   ```text
You are a sales assistant. Here is the last conversation with the client:
Client: …
You: …

The CRM says: {Notes}

Craft a polite follow-up message that:
- picks up where the conversation left off,
- asks if they need anything else,
- mentions the quoted plan if you can infer it.

Respond with just the message text.
```

4. Run that prompt through Claude (or another model) via `runAgent()`.
5. Save the draft back into Notion (property `DraftMessage`) for review.
6. When you tick an `Approved` checkbox (or manually send), the handler
   notices and sends the draft to WhatsApp and updates `Sent`, `NeedsFollowup`,
   etc.

This gives you a full cycle: Notion triggers → Node fetches context → AI
drafts message → you approve → WhatsApp sends.

### Additional ideas

* Store sentiment scores, response latency, and pipeline stage in Notion.
* Have a single unique ID field linking WhatsApp, email, and CRM entries.
* Use Notion views or filters to see "clients who want a callback".
* Use OpenAI/Groq/Claude to analyse entire chat logs stored in Notion for
  trends or training templates.

---

## 3. Extending to the full ClaudeClaw project

Once the MVP proves the approach you can migrate the code back into the full
`PKM_System` repo. The larger project already provides
* a database schema (`wa_messages`, `wa_outbox`, etc.)
* scheduled tasks and memory context helpers
* bot logic (Telegram/Discord) if you want external notifications

The Notion integration would live alongside the main bot code and use the
`runAgent()` function already defined there. The migration is mostly a matter of
converting the small MVP snippets into TypeScript and hooking them into the
existing workflow.

---

## 4. Reference and next steps

* Run `node index.js` in the `whatsapp-mvp` folder to start the MVP.
* Scan the QR code with your phone once; session persists in
  `./.wwebjs_auth_mvp`.
* Enable/disable numbers, and observe log output and automated replies.
* Add Notion token and database ID to `.env` and install `@notionhq/client` to
  enable CRM integration.
* Choose webhook or polling strategy for Notion events.
* Write handlers as shown above to draft and send follow-up messages based on
  conversation history.

You are now equipped to automate WhatsApp interactions, synchronise them
with your Notion sales pipeline, and use AI to generate context-aware
responses. This architecture is flexible, extensible, and can be expanded to
include email, CRM, sentiment analysis, scheduled reports, and more.

---

Keep this file for future reference or to onboard collaborators.