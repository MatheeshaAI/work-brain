---
date: 2026-10-27 12:00
agent: claude
machine: laptop
brain: unsure
tags: [tools, openbot, vps]
---
# OpenBot: run 24/7 on the VPS instead of the laptop

OpenBot (openbot.run) agents stop when the laptop sleeps (lid closed). Planned move: install OpenBot's official self-hosted server on the VPS so agents stay up all the time. Steps given to the owner to run over SSH; not yet confirmed done.

## Worth remembering
- Self-hosted server needs Ubuntu 24.04/26.04 (Debian 12/13 partly tested), systemd, x86_64 or arm64.
- Install/upgrade: `curl -fsSL https://raw.githubusercontent.com/nightly-labs/openbot/main/scripts/install-server.sh | sudo bash`, then `sudo openbot login --name <name>` with the same email as the laptop app.
- Runs as `openbot.service`; opens no ports. Laptop/phone apps see it as a "Remote host" in the account.
- Claude/Codex are connected from the app; sign-in finishes on the laptop (code copy / device code).
- Commands: `openbot status`, `openbot logs -f`, `sudo openbot restart|update|uninstall`, `sudo openbot mobile-connect` (phone QR, 2 min).
- Agents must be created on the VPS host; ones on the laptop host still stop when it sleeps.

## Next steps
- Owner runs install on VPS, connects provider, moves agents, tests with lid closed.
