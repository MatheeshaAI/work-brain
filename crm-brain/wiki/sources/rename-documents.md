---
type: source
sources: ["raw/20_AI-and-Agents/rename-documents.md"]
updated: 2026-10-22
tags: [workflow, documents, slash-command, antigravity]
summary: "A slash-command workflow that reads scanned documents in a folder and renames them to 'First Last - Document Type'."
---
# rename-documents

A workflow definition (frontmatter `description`, then steps) for a `/rename-documents` command, written in the style of an IDE agent that uses a `view_file` tool. See [[Document renaming workflow]].

## Steps
1. List files in the target directory.
2. Open each PDF or image with `view_file`.
3. Extract first name, last name and document type (Emirates ID, passport, residence visa, bill, certificate).
4. Rename to `[First Name] [Last Name] - [Document Type].[extension]`, for example `Jane Smith - Passport.png`.

## Notes
- Fits the paperwork half of a sale described in [[Document request handling]] and [[Policy submission documents]]: clients send photos with names like `IMG_5678.png`.
- The files processed are identity documents, so the renamed folder holds client personal data; keep it out of the wiki and out of cloud tools you do not trust. No script is attached; the agent does the reading. No duplicates or missing-name handling is specified.
