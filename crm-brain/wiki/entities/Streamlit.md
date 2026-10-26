---
type: entity
sources: ["raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py", "raw/work_os system designing documents/00_ORIGINALS/config.py", "raw/work_os system designing documents/00_ORIGINALS/main.py"]
updated: 2026-10-22
tags: [dashboard, python, ui, sales-agent, stub]
summary: "Stub. The Python dashboard framework chosen for the sales agent's pipeline and client views; configured but never launched in the saved code."
---
# Streamlit

**Stub.** An entity mentioned in the vault rather than researched here.

Streamlit is the dashboard framework in the [[Work OS]] design: `config.py` holds `DASHBOARD_HOST` (localhost) and `DASHBOARD_PORT` (8501) for it, and the console menu in `main.py` has a "View Client Dashboard" option that prints "Dashboard coming soon in Phase 4". The plan describes a pipeline overview (leads per stage, stuck leads, lost analysis, conversion metrics) plus a per-client view with chat history, stage and AI suggestions. See [[Health Insurance Sales Agent Python Code]] and [[Health Insurance Sales Agent Plan (Jan 2026)]].

Status: **not started.** The saved code never imports Streamlit, and the work_os build-status table lists the dashboard as not started ([[Work OS Master Index]]).

In the planning sessions Streamlit was one of two options for the UI, the other being FastAPI with React ([[Sales_OS_Opencode_Session]]); the FastAPI route won for the approval MVP ([[FastAPI]]).

Related: [[Health Insurance Sales Agent Python Code]], [[Health Insurance Sales Agent Plan (Jan 2026)]], [[FastAPI]], [[Insurance Dashboard]].
