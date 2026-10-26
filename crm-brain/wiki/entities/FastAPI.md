---
type: entity
sources: ["raw/work_os system designing documents/05_CODE/start.py", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/00_ORIGINALS/start.py", "raw/work_os system designing documents/00_ORIGINALS/config.py"]
updated: 2026-10-22
tags: [web, framework, python, whatsapp, mvp, stub]
summary: "Stub. The Python web framework named for the WhatsApp agent's webhook server and draft-approval API in the work_os design and code."
---
# FastAPI

**Stub.** An entity mentioned in the vault rather than researched here.

In the [[Work OS]] design set, FastAPI is the framework for the [[WhatsApp Agent MVP Setup Guide]] server: it receives Evolution API webhooks and exposes the draft-approval endpoints (`GET /api/drafts`, `PUT /api/drafts/{id}`, `POST /api/drafts/{id}/approve`, `POST /api/drafts/{id}/refine`, `DELETE /api/drafts/{id}`) alongside `/health`. `start.py` checks that `fastapi` and `uvicorn` are importable before the agent starts, and `requirements.md` pins both.

**Not built in the archive.** The FastAPI app itself is not in the code that was saved - only the dependency check, the printed endpoint list, and the config it would read. See [[Health Insurance Sales Agent Python Code]].

Also used in the vault as the alternative to a Streamlit dashboard ([[Streamlit]]) and as the server shape in the 31 January planning sessions ([[Sales_OS_Opencode_Session]]).

Related: [[WhatsApp Agent MVP Setup Guide]], [[Health Insurance Sales Agent Python Code]], [[Evolution API]], [[Streamlit]].
