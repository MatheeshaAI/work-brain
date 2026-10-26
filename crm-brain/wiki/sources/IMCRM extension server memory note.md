---
type: source
sources: ["raw/Health-Insurance/Memory/IMCRM_Extension_Server.md"]
updated: 2026-10-22
tags: [imcrm, extension, server, memory, sidecar]
summary: "Persistent memory: the local Node.js server the extension needs before it can create lead files."
---
# Source: IMCRM extension server memory note

Original file: [[raw/Health-Insurance/Memory/IMCRM_Extension_Server.md|IMCRM_Extension_Server.md]]. A persistent memory about the small local server that the browser extension writes through. **The note contains no credentials**; it only points at a local script.

## What the server does
It receives extracted lead data from the extension and writes to the workspace:
- creates `Workspace/Leads/[REF_ID]-[Name].md`
- creates `Workspace/Documents/[REF_ID]-[Name]/`
- adds a row to `PIPELINE.md`

It is **required only for the "Create Lead File" button**; reading and copying data from the popup does not need it.

## How to run it
- Command: `node Scripts/lead-file-server.js`.
- The note's own example `cd` path points at an older location (`C:\Users\mathe\Desktop\PKM_System\Health-Insurance`); the script path itself is the reliable part. Path drift between notes is a known artefact - see [[Workspace reorganization]].
- It runs in the **foreground**: the terminal must stay open for as long as the extension is being used to create leads. Stop with `Ctrl+C`.
- It prints a "Server running on http://localhost:3000" line (the port may differ - read the console).

## Errors it names
- **"Failed to fetch"** - the server is not running or has crashed; restart it and read the terminal for the real error.
- **"EADDRINUSE: address already in use"** - another process holds the port; kill the running Node processes and start again.

## Why it matters
- It is the smallest possible example of a **sidecar that writes files on behalf of a browser extension**: the extension stays a pure extractor, and all file creation happens in one auditable local process. Concept page: [[Local file writing sidecar]].
- It is also the one place where the extension writes to the pipeline file - the same file the [[Insurance Dashboard]] reads. Both tools therefore share a single source of truth: [[Markdown-backed lead store]].

Related: [[IMCRM Data Extractor]], [[IMCRM extension memory note]], [[Local file writing sidecar]], [[Markdown-backed lead store]].
