---
type: concept
sources: ["raw/Health-Insurance/Memory/IMCRM_Extension_Server.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/Memory/IMCRM_Extension_How_to_Use.md"]
updated: 2026-10-22
tags: [architecture, extension, server, files]
summary: "The small local Node.js server that lets a browser extension write files - the extension extracts, the server writes."
---
# Local file writing sidecar

A browser extension cannot write files, so the IMCRM extension does not try. It extracts data in the page and posts it to a **small local Node.js server** that owns every file write.

## The split
| Component | Responsibility |
|---|---|
| The extension (in the page) | read the DOM, build the payload, copy it to the clipboard |
| The extension's "Create Lead File" button | post the payload to the local server |
| **The sidecar server** | create the lead file, create the document folder, add the pipeline row |

Server: `node Scripts/lead-file-server.js`, listening on a local port (3000 in the note). It runs in the **foreground** - the terminal must stay open while the extension is used to create leads.

Sources: [[IMCRM extension server memory note]], [[IMCRM extension memory note]], [[IMCRM extension how-to memory note]].

## Why this shape
- **One auditable writer.** Every file write goes through one small process whose console shows exactly what it created. That is easier to trust than a browser extension silently touching the filesystem, and it is easy to stop.
- **The extension stays a pure extractor.** Reading the page needs no privileges beyond `activeTab` and `scripting`; the write path is a plain HTTP call to localhost.
- **It works while the page is still open.** The extension has the payload in hand; the server has the filesystem.

## What it creates
- `Workspace/Leads/[REF_ID]-[Name].md`
- `Workspace/Documents/[REF_ID]-[Name]/`
- a row in `PIPELINE.md`

So the sidecar is one of the four writers to the markdown store - see [[Markdown-backed lead store]].

## Failure modes the note names
- **"Failed to fetch"** in the extension popup - the server is not running or has crashed. Read the terminal for the real error.
- **"EADDRINUSE"** - another process holds the port; kill the running Node processes and start again.

## Caveats
- **No authentication.** The server listens on a local port and accepts writes from anything that can reach it. Fine on a single-user desktop; a footgun if the port is exposed.
- **It is a foreground process.** Closing the terminal silently disables the extension's create-lead button, and the error the user sees is "Could not create lead. Make sure the local server is running".
- The folder path in the note is an old machine path, so the script path is the reliable part. See [[Workspace and infrastructure separation]].

Related: [[IMCRM Data Extractor]], [[Markdown-backed lead store]], [[Insurance Dashboard]], [[Workspace and infrastructure separation]].
