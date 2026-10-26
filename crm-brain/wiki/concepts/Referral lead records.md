---
type: concept
sources: ["raw/Health-Insurance/Workspace/Leads/Referral Leads/Referral_Leads_Tracker.md", "raw/Health-Insurance/Workspace/REFERRALS.md", "raw/Health-Insurance/Workspace/Sales Reports/April_2026_Leads.md", "raw/Health-Insurance/Workspace/SOPs/WhatsApp_Welcome_Message_Template.md"]
updated: 2026-10-22
tags: [insurance, referrals, leads, tracker, pipeline]
privacy: aggregate only - referrer and client identities are not reproduced
summary: "How a referred lead is recorded before it becomes a CRM lead - the tracker, its six-step conversion, and the two boards it feeds."
---
# Referral lead records

A referral lead is a person who has been introduced to the desk but **does not exist in the CRM yet**. The workspace keeps those people in a tracker until they respond, because a referral that is not written down is a referral that is lost.

## Two trackers, two files, two states
The workspace has **two referral trackers**, and they are not the same file:

| File | Rows | Status vocabulary |
|---|---|---|
| `Leads/Referral Leads/Referral_Leads_Tracker.md` | **3**, all pending | `Message Sent` -> awaiting response; detail blocks still empty |
| `Workspace/REFERRALS.md` | **2** | four sections: Awaiting Response / Responded - Ready to Onboard / No Response - Follow Up Needed / Onboarded |

Both trackers record the same fields - contact, **referrer**, date contacted, notes - and both start from the same premise: *a referral lead is not yet a lead*.

**Concentration:** all 3 tracker rows come from a single referrer, and the same referrer is the only one named in the second tracker as well. The April CRM export carries 23 leads with the sub-source **Advisor's own referral** against 100 with no sub-source recorded, so the referral channel is real but the attribution field is only filled in sometimes. See [[April 2026 leads report]].

## The conversion process
The tracker file records the six steps that turn a referral into a live lead:

1. collect the full details - name, customer type, family members, email;
2. **enter it in the CRM, which generates the reference id**;
3. create the lead markdown file in the main leads folder;
4. create the documents folder;
5. move it into the pipeline sections;
6. remove it from the tracker, or mark it **Converted**.

Step 2 is the hinge: **the CRM is where the lead gets its primary key**, and every downstream artifact - the dossier, the document folder, the pipeline row, the task - hangs off that key. See [[Lead reference IDs]] and [[Dossier structure]].

## The detail block
Each tracker row has a **detail block beneath the table** holding what is known before onboarding: contact number, referrer, lead type (medical or health), status ("awaiting name & details") and a details field that is still a placeholder. The pattern is deliberate - **capture the contact and the referrer first, the identity later** - because a referred person who has not replied has no name to record.

## The rules around a referral
- **A referral welcome message is an adapted intro, not the standard one.** The workspace keeps a separate memory rule for it. See [[Standard intro message]] and [[Batch intro messaging]].
- **The referrer is credited in the CRM**, which is why the April export has a dedicated IMCRM Sub-Source column.
- **Referral tagging in the chat title is a different mechanism** - the WhatsApp chat title carries the referrer's name, so a referral is visible in a chat list without opening the chat. See [[Referral sources]].

## The gap
The two trackers disagree in shape and neither is reconciled with the CRM: one tracker has 3 pending rows, the other has 2, and there is no record anywhere of a referral lead that was converted and then dropped. A referral is counted at intake and never counted again.

## Related
- [[Referral sources]]
- [[Referral leads board]]
- [[Client dossiers]]
- [[Dossier structure]]
- [[Standard intro message]]
- [[Lead reference IDs]]
- [[April 2026 leads report]]
- [[Sales reporting]]
- [[CRM hygiene]]
