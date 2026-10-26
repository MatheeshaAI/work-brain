# Setting up a machine

Work Brain goes on the personal laptop, the office laptop and the VPS. The personal brain (`PKM-Personal`) goes on the personal laptop only.

## 1. Clone once
Windows (PowerShell):
```powershell
git clone https://github.com/MatheeshaAI/work-brain.git $HOME\work-brain
```
VPS:
```bash
git clone https://github.com/MatheeshaAI/work-brain.git ~/work-brain
```
Git asks you to sign in to GitHub the first time (Git Credential Manager on Windows; a personal access token or SSH key on the VPS).

## 2. Name the machine
So notes and commits say where they came from. Use `personal`, `office` or `vps`.

Windows: `setx BRAIN_MACHINE office`  
VPS: `echo 'export BRAIN_MACHINE=vps' >> ~/.bashrc`

## 3. Sync every 15 minutes
The sync script pulls everyone's changes and pushes **only** new inbox notes.

Windows (run once in PowerShell):
```powershell
schtasks /Create /TN "Work Brain Sync" /SC MINUTE /MO 15 /TR "powershell -NoProfile -ExecutionPolicy Bypass -File $HOME\work-brain\scripts\sync.ps1"
```
VPS (`crontab -e`, add one line):
```
*/15 * * * * BRAIN_MACHINE=vps $HOME/work-brain/scripts/sync.sh >> $HOME/work-brain-sync.log 2>&1
```

## 4. Tell every agent about the brain
Agents read `AGENTS.md` only when they work inside this folder. To make them take notes from **any** project, paste this into each agent's global instructions file, with the path changed to this machine's clone:

```
## Work Brain
At the end of any work task worth remembering (lead or client worked, plan or price found,
rule learned, SOP changed, tool built or fixed, decision made), write one inbox note into
C:\Users\mathe\work-brain  (or ~/work-brain on the VPS)
following the rules in its AGENTS.md. Only add new files to an "Inbox - To sort" folder.
Never put passwords, keys or personal-life topics in a note.
```

| Agent | Global instructions file |
|---|---|
| Claude Code | `~/.claude/CLAUDE.md` |
| Codex | `~/.codex/AGENTS.md` |
| OpenCode | `~/.config/opencode/AGENTS.md` |
| Hermes | `~/.hermes/SOUL.md` (its global persona file) |
| Others | whatever "custom instructions" or system-prompt file the agent offers |

**Claude Desktop (chat, not the Code tab):** chat cannot write files by itself. In Claude Desktop go to Settings → Extensions, install **Filesystem**, and allow only the `work-brain` folder. Then paste the snippet above into Settings → Profile → custom instructions. The Code tab uses `~/.claude/CLAUDE.md` like Claude Code.

## 5. Phone
Open a Claude Code session in the Claude app with `work-brain` attached and say "add this to the inbox: ...". Claude writes the note following `AGENTS.md` and pushes it.

## 6. Daily filing
A Claude cloud routine runs every night at 22:39 Dubai time. It files new inbox notes into each brain's wiki, moves them to `raw/60_Daily-Notes/YYYY-MM/`, and pushes to `main`.

## 7. Check it works
Ask an agent to write a test note, run the sync script once by hand, and confirm the note shows up on GitHub under `crm-brain/raw/Inbox - To sort/`.
