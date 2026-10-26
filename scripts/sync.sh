#!/usr/bin/env bash
# Sync work-brain with GitHub: pull everyone's changes, push new inbox notes.
# Run every 15 minutes from cron (VPS) or by hand.
set -euo pipefail
cd "$(dirname "$0")/.."
MACHINE="${BRAIN_MACHINE:-$(hostname)}"
INBOXES=("crm-brain/raw/Inbox - To sort" "insurance-brain/raw/Inbox - To sort")

git pull --rebase --autostash -q origin main
git add -- "${INBOXES[@]}"
if git diff --cached --quiet; then exit 0; fi
git commit -q -m "inbox: $(git diff --cached --name-only | wc -l | tr -d ' ') note(s) from $MACHINE"
# one retry if another machine pushed in between
git push -q origin HEAD:main || { git pull --rebase -q origin main && git push -q origin HEAD:main; }
