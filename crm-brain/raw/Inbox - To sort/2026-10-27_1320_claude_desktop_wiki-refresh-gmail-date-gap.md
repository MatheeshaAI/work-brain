---
date: 2026-10-27 13:20
agent: claude
machine: desktop
brain: crm
tags: [refresh, gmail, imcrm, pipeline]
---
# Full wiki refresh, Gmail search results lack dates

Ran the full insurance-wiki refresh (IMCRM + Gmail + WhatsApp). 9 new/changed leads pulled, 33 Gmail and 188 WhatsApp messages ingested, 3 new drafts (42-44), 1 superseded (41).

## Worth remembering
- The Gmail `search_threads` output here came back without `date` or `snippet`, but `tools/inbox_ingest.py` needs `date` per message. Workaround: `get_thread` with `messageFormat: MINIMAL` per thread gives dates, then write the JSON to a scratch file and ingest. Automated senders (reports, Takaful renewal notices) were skipped because they are not leads.
- WhatsApp `list_messages` returns exactly 200 on busy days; page with `before` = oldest timestamp and the old `after`, because the ingest script advances `last_fetch` after the first page.
- IMCRM export returned only 9 changed records out of 136 listed; status moves to Followed Up on 25-27 Oct leave "1st Call Follow-up" activities overdue on 5 health leads.

## Next steps
- Consider making the ingest script tolerate a missing `date` (or fetch it) so Gmail pulls need no per-thread step.
