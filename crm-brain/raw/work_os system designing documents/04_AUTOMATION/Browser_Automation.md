# Browser Automation for CRM, Email & More

Because your CRM is a custom web application with no API and you also want to
handle Gmail (and potentially other browser‑only systems) from the same
workspace, you’ll need to add browser automation to the architecture we’ve
been building. This note explains the patterns and tools you can use to make
"everything in one place" work.

---

## 1. Why automation \> API

Web applications without public APIs are very common. The only way to make
other software interact with them is to drive the browser just as a human
would: click buttons, fill forms, read text. That’s the job of browser
automation.

For your use‑case you can automate:

* Logging into the CRM, searching leads, updating stages, reading notes.
* Opening Gmail (or Outlook Web) to read/compose emails and trigger sends.
* Any other intranet tools you currently open manually.

Because the automation will run in the same Node process as the WhatsApp
bridge, Notion integration and Claude logic, you can chain them: read a
Notion row, fetch the matching CRM record via automation, generate a reply with
Claude, then drive the CRM form to enter a note or click "send email".

---

## 2. Choosing an automation library

Two sensible options:

* **Playwright / Puppeteer** – low‑level control of Chromium/Firefox/WebKit.
  You write the steps yourself. Good for simple, one‑off scripts.
* **agent-browser (OpenClaw)** – a higher‑level wrapper that treats the page
  like a collection of elements you can `click`, `type`, `scrape` etc. The
  syntax is very readable and you can even ask Claude Code to generate the
  commands for you.

Because you already pulled in Puppeteer via `whatsapp-web.js`, adding a
few functions that navigate your CRM is straightforward. If you prefer an
assistant‑friendly DSL, install the `agent-browser` skill in your Claude Code
config and use its `browser` tool in prompts.

Example using raw Puppeteer:

```js
const puppeteer = require('puppeteer');
// reuse the browser instance that whatsapp-web.js is already running?  easiest
// is to spawn a fresh browser so the session has its own profile.

async function withBrowser(fn) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    return await fn(page);
  } finally {
    await browser.close();
  }
}

async function lookupLead(number) {
  return withBrowser(async page => {
    await page.goto('https://crm.example.com/login');
    await page.type('#user', process.env.CRM_USER);
    await page.type('#pass', process.env.CRM_PASS);
    await page.click('button[type=submit]');
    await page.waitForNavigation();

    await page.goto(`https://crm.example.com/search?phone=${encodeURIComponent(number)}`);
    await page.waitForSelector('.result');
    const data = await page.evaluate(() => {
      const r = document.querySelector('.result');
      return {
        name: r.querySelector('.name').innerText,
        stage: r.querySelector('.stage').innerText,
        notes: r.querySelector('.notes').innerText,
      };
    });
    return data;
  });
}
```

You can do the same thing for Gmail by navigating to
`https://mail.google.com` and using selectors to read/write messages, though
Google sometimes blocks automated logins; using an App Password and the
`--user-data-dir` option to preserve a logged‑in profile is recommended.

### agent-browser example

If you install the skill with `npx skills add rivet-dev/skills -s browser` and
then use the `browser.open`, `browser.click`, `browser.write` tools from
Claude prompts, you can outsource the selector work to the model:

```text
Human: open crm.example.com and login with credentials from .env. search for
the phone number 971501234567 and copy the "stage" field.

<assistant uses browser.open>https://crm.example.com/login</assistant>
<assistant uses browser.write>input[name=user]=${process.env.CRM_USER}</assistant>
...
```

The advantage is you can just describe the task in English and let Claude
figure out the clicks; the code is shorter and easier to adapt when the site
changes.

---

## 3. Integrating with the existing workflow

Here’s how the pieces tie together:

1. **Incoming WhatsApp message** triggers the existing `msg` handler.
   - Store the text in SQLite (already done) and also optionally push it to
     Notion / CRM via automation.
2. **CRM lookup** – when you need context for a follow‑up, call
   `lookupLead(number)` (or the agent-browser equivalent) to fetch the current
   state of the lead record.
3. **Compose reply** – build a prompt for Claude containing the WhatsApp
   conversation, the CRM notes/stage, and any Notion pipeline information.
   Use `runAgent()` to get a draft message.
4. **Approval step** – write the draft back to Notion or display it in the CLI.
   You could even open a browser window and paste the text into a CRM note to
   review it manually.
5. **Send follow‑up** – once approved, use the CRM automation functions to
   update the record (stage, last‑contacted, add note) and call
   `client.sendMessage()` to dispatch the WhatsApp or generate an email via
   Gmail automation.
6. **Email** – driving Gmail is similar: navigate to Google mail, click
   compose, fill recipient/subject/body, click send. Alternatively you can use
   the official Gmail API with OAuth if you prefer an API instead of UI. Web
   automation keeps everything in the same browser session as your CRM,
   which is handy if your company blocks external API access.

You could even go fully headless and implement the entire "CRM + WhatsApp +
Email" pipeline as a single Puppeteer script that runs on a schedule or in
response to Notion webhooks.

---

## 4. Considerations & tips

* **Session persistence** – for both CRM and Gmail, you don’t want to log in
  on every request. Use a persistent user data directory (`--user-data-dir`)
  or supply credentials programmatically and store cookies.
* **Selectors** – keep them in a central file so you can update if the UI
  changes. Agent-browser can help by regenerating selectors automatically when
  you give it a fresh prompt.
* **Error handling** – wrap all automation code in `try/catch`; if the page
  structure changes your code should log the failure and fall back gracefully.
* **Concurrency** – many browser sessions at once will eat memory. If you
  expect multiple simultaneous tasks, consider a pool of Chromium instances or
  reuse a single headless browser with multiple pages.
* **Privacy** – everything the script sees (messages, CRM data, emails) is now
  stored on your server. Make sure the VPS/desktop is secure and encrypted.

---

## 5. Putting it all together

The final architecture might look like this:

```
   WhatsApp <-> whatsapp-web.js  + Chromium
          ↕
         SQLite  <─
          ↕       │
 Notion Webhooks   │
          ↕       │
      Node service (runAgent, CRM automation, Notion helpers)
          ↕
     Browser automation (Puppeteer/agent-browser)
          ↕
    CRM Web UI  &  Gmail Web UI
```

When a Notion follow‑up is requested, the Node service:

1. loads recent WhatsApp messages from SQLite
2. runs a CRM lookup via browser automation
3. prompts Claude to draft a reply
4. writes the draft back to Notion for approval
5. after approval, updates CRM via automation and sends the message via
   WhatsApp or Gmail

All of the web automation occurs in headless Chromium instances controlled by
the same Node process that handles WhatsApp and Notion.

---

### Next steps for you

1. Decide whether to use raw Puppeteer or the higher‑level `agent-browser`
   skill.  If you want English‑driven automation, go with agent-browser.
2. Install the necessary packages (`puppeteer`, `@notionhq/client`,
   optionally `@notionhq/client`, `agent-browser` skill, etc.).
3. Write a few simple utility functions to log in to your CRM and fetch a
   record by phone number.
4. Extend `index.js` (or later, the full ClaudeClaw project) with a new
   handler that calls these functions when a follow‑up is required.
5. Test running the automations manually in the terminal before hooking them
   into the full loop.

With this in place, you’ll truly be able to **work from one place**: send and
receive WhatsApp, update your CRM, compose Gmail messages, and let AI draft
content – all from a single Node service that you control.

Good luck building it out, and let me know if you need help writing any of
those page‑navigation or prompt‑generation functions!