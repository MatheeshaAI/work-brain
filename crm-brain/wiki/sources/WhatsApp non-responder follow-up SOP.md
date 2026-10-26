---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/WhatsApp_FollowUp_NonResponders.md"]
updated: 2026-10-22
tags: [insurance, sop, whatsapp, follow-up, reporting]
privacy: aggregate only - the procedure produces a report of named chats and phone numbers; no names or numbers are reproduced here
summary: "The weekly non-responder routine - analyse the WhatsApp archive for silence, write a dated report, then send tiered follow-ups with approval between tiers."
---
# Source: WhatsApp non-responder follow-up SOP

`raw/Health-Insurance/Workspace/SOPs/WhatsApp_FollowUp_NonResponders.md` - the SOP for finding leads who have not replied and sending them personalised follow-ups.

**Purpose:** identify leads who haven't replied to WhatsApp messages and send personalised follow-ups.
**When to run:** weekly (every Monday morning recommended) or after a batch of new leads.
**Time required:** about 10 minutes.

## Step 1 - run the analysis
The SOP is written as a prompt to an agent: "check WhatsApp conversations from [date] to today - which clients have not responded back to the welcome message?"

The agent then:
1. queries the WhatsApp SQLite message archive at the bridge's `store/messages.db`,
2. finds chats where a message was sent outbound since the given date,
3. finds those chats with **no inbound reply after the first message**,
4. cross-references phone numbers against the lead files in `Workspace/Leads/`,
5. splits the result into **welcome-message non-responders** and **follow-up/quote non-responders**.

## Step 2 - review the report
The output is a dated file at `Workspace/Reports/WhatsApp-No-Response-Report-DD-MMM-YYYY.md`, containing summary stats (total chats, reply rate), **priority tiers by days silent**, a personalised suggested message per client (using name, gender and visa category), unknown contacts (messaged but with no matching lead file) and other non-replies.

The SOP's instruction is to **review and edit any messages before sending** - the agent drafts, the human approves.

## Step 3 - send tier by tier
Another prompt: "send follow-up messages to them - go with Option B (tier by tier)". The agent starts with the oldest/highest priority tier, sends and confirms each one, **pauses and shows results for approval before moving to the next tier**, and sends within a tier in parallel. The transport is the Node.js REST API of the WhatsApp bridge on `localhost:8080`, with a health check (`/api/health` returning `connected: true`) as the prerequisite; if the bridge is down it is started with a Go command from the bridge directory.

## Message personalisation rules
| Profile detail | How it is used |
|---|---|
| Gender | title - Mr. / Mrs. / Ms. |
| Member category | domestic worker, golden visa, dependent spouse, investor or partner, salary band, senior (60+), family plan - each gets a different angle |

**Tone by tier:** 10+ days silent gets a warmer re-introduction that acknowledges the time passed and invites re-engagement; 6-7 days a friendly check-in asking for requirements; 3-5 days a light nudge with an easy call to action.

## Triage flags
Four flags that change what is sent: a DOB recorded incorrectly in the system (add a DOB confirmation request), an uncertain last digit in the phone number (verify before sending), a bridge that was down at lead creation (treat as first contact, not follow-up), and no lead-file match for a number (identify manually, then follow up).

## After sending
Check for replies within a few hours, **update the lead status in the lead file and in `PIPELINE.md`** for anyone who responds, and if there is still no reply after two follow-ups, **move to "call" - do not message a third time**.

## Frequency guide
| Scenario | Action |
|---|---|
| Lead created today | welcome message only, no follow-up yet |
| 3-5 days no reply | first follow-up |
| 6-7 days no reply | second follow-up |
| 10+ days no reply | final WhatsApp follow-up plus a phone call |
| 2 follow-ups sent, still no reply | mark as cold, stop messaging |

## Caveats
- **The rule that matters is the two-strike limit.** The escalation to a phone call is what stops the desk from messaging a silent lead for ever.
- **The bridge is a hard dependency.** If the Go bridge is not running, nothing in this SOP can be sent, and the SOP's own health check is the gate. The legacy Baileys stack in `recovered files/Scripts/baileys-archive/` is the archived version of the same job - see [[Baileys migration notes]].
- **Privacy**: the report this SOP produces names clients and lists phone numbers, so it is summarised as counts only in the wiki - see [[WhatsApp non-response report]] and [[Client privacy]]. The report file itself holds the detail.
- The tier boundaries (3-5 / 6-7 / 10+ days) and the two-strike limit are the desk's own convention, not a system setting.

## Related
- [[WhatsApp non-responder follow-up]]
- [[SOP WhatsApp Follow-Up Non-Responders]]
- [[WhatsApp lead follow-up statuses]]
- [[WhatsApp follow-up gaps]]
- [[Standard intro message]]
- [[WhatsApp non-response report]]
- [[Sales reporting]]
- [[Lead pipeline stages]]
