# Sync work-brain with GitHub: pull everyone's changes, push new inbox notes.
# Run every 15 minutes from Windows Task Scheduler or by hand.
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
$machine = if ($env:BRAIN_MACHINE) { $env:BRAIN_MACHINE } else { $env:COMPUTERNAME }
$inboxes = @('crm-brain/raw/Inbox - To sort', 'insurance-brain/raw/Inbox - To sort')

git pull --rebase --autostash -q origin main
if ($LASTEXITCODE -ne 0) { exit 1 }
git add -- $inboxes
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) { exit 0 }
$count = (git diff --cached --name-only | Measure-Object).Count
git commit -q -m "inbox: $count note(s) from $machine"
git push -q origin HEAD:main
if ($LASTEXITCODE -ne 0) {
    # one retry if another machine pushed in between
    git pull --rebase -q origin main
    git push -q origin HEAD:main
}
