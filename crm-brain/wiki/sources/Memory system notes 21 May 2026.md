---
type: source
sources: ["raw/Health-Insurance/Memory/21-05-2026.md"]
updated: 2026-10-22
tags: [memory, agents, process]
summary: "Session note recording the memory-system rules: dated session notes vs persistent memory files in Memory/."
---
# Source: Memory system notes, 21 May 2026

Original file: [[raw/Health-Insurance/Memory/21-05-2026.md|21-05-2026.md]]. A dated session note. It records a decision, not a system: what the memory workflow should be and what state the memory was in that day.

## The memory model it records
Two kinds of file, with different rules:
- **Session files** - dated, like this one. Daily working notes: findings, decisions and context are added as the work proceeds. They are a log, not a memory.
- **Persistent memory files** - separate, named by topic. Created only when the user explicitly says "remember this" or "save this". They carry frontmatter and are indexed so later conversations can find them.
- **Location:** the `Memory/` folder at the vault root - explicitly **not** inside a tool's `.claude` directory.

## State recorded on 2026-05-21
- 2 persistent memories were indexed in the index file: one about Notion onboarding, one about a Notion leads pipeline database. (The index file itself is not in this scope.)
- The project instruction file gained a "Memory System" section so that all agents can read the rules, and a subagent instruction file was created with subagent-specific guidance.
- The stated goal: the memory system is "documented and enforceable across all subagents", with the path corrected in both instruction files.

## Why it matters
- It is the origin of the rule that decides what belongs in this wiki's memory layer and what is just a log: concept page [[Agent memory]].
- It explains the naming pattern of the neighbouring files in the same folder: dated files for sessions, topic files with frontmatter for persistent memory. See [[IMCRM extension memory note]] for an example of the persistent kind.
- The workflow is the same shape as the folder-as-architecture idea in [[Context engineering]]: a rule stated once, on disk, that every agent reads.

## Caveats
- The note describes intent ("all agents now understand"); it does not measure whether agents comply.
- The two memories it names are Notion-related and are not in this scope.

Related: [[Agent memory]], [[IMCRM extension memory note]], [[Agent memory rules]], [[Context engineering]].
