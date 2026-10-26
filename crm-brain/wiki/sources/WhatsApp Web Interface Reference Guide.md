---
type: source
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/whatsapp-reference.md"]
updated: 2026-10-22
tags: [whatsapp, browser, automation, reference]
summary: "A 1,400-line technical reference for automating WhatsApp Web: drawer layout, selectors, ten scripts, twelve agent tips and a virtual-scrolling section."
---
# Source: WhatsApp Web Interface Reference Guide

Original note: [[raw/20_AI-and-Agents/My-Shared-Brain/whatsapp-reference.md|whatsapp-reference.md]] (version 1.0, dated May 2026, about 1,400 lines). The technical reference behind the WhatsApp work in [[My Shared Brain]]; its own related-context links point at the WhatsApp working-rules note and the browser-profile note summarised in [[Sales Context File Set]].

## Structure
Six parts: a page structure map, a field reference, ten ready-to-run harness scripts, twelve agent tips, five example use cases, and a dedicated section on virtual scrolling and lazy loading, closing with debugging tips, common issues, performance notes and a summary.

## Layout
WhatsApp Web is a React app built from drawers under `#app`:
| Container | Contents |
|---|---|
| `drawer-fullscreen` | Modals and full-screen panels |
| `drawer-left` | Sidebar navigation |
| `drawer-middle` | Chat list and main content |
| `drawer-right` | Contact info and details panel |
| `drawer-title-body` | Header and title area |

- **Chat list:** `[data-testid="chat-list"]` holds a virtual-scrolled list; each conversation is a `[role="row"]` with a `list-item-{0-N}` test id. The search container is `[data-testid="chat-list-search-container"]` and the header is `[data-testid="chatlist-header"]`.
- **Chat item structure:** title in `cell-frame-title`, latest-message preview in `cell-frame-primary-detail`, timestamp in `cell-frame-secondary`, delivery status in `last-msg-status` (`status-dblcheck` for sent/read) and the unread badge in `icon-unread-count`.
- **Right drawer:** profile photo and name, online/offline status, last seen, status text and bio, media gallery, common groups and block/report options.
- **Message area and navigation bar** are mapped separately, plus a field reference for conversations, message elements, message type indicators and the input area, with an aria-label quick reference.

## The ten scripts
1. Extract active conversations.
2. Extract messages from a thread, with lazy loading of older messages.
3. Send a message to an existing contact.
4. Search conversations by name.
5. Add an emoji reaction to a message.
6. Reply to a specific message by partial text match.
7. Get the unread message count.
8. Scroll the chat list to find a specific chat.
9. Open the settings menu.
10. Poll for new messages.

## Agent tips (12)
`data-testid` is the reliable anchor; the chat list is virtual-scrolled so off-screen chats do not exist in the DOM; older messages load lazily when scrolling up; reactions and status indicators need their own handling; message sending needs a delivery-status wait; distinguishing your own bubble from the other party's is a separate problem; group chats and direct messages behave differently; contact status indicators and typing indicators need their own checks; search behaves in its own way; and React fragments and keys need extracting when reading lists.

## Virtual scrolling and lazy loading
The longest section: how the chat list virtualises, how to scroll to find a chat that is not rendered, how older messages load when scrolling up, and the rule to always wait after scrolling before querying the DOM. It ends with an infinite-scroll implementation.

## Status and caveats
- Written for the May 2026 WhatsApp Web build; WhatsApp changes its DOM regularly and the guide carries no version marker beyond "1.0, May 2026".
- WhatsApp's own terms restrict automation of the service. The guide is a technical reference, and the owner's own operating rule is that nothing is sent without explicit instruction - see [[Automation guardrails]] and [[Sales Context File Set]].
- The daily notes record the WhatsApp Web tab being opened and unread lists read; they do not record any of these scripts running end to end.
- The reference documents reading and sending; the vault's rules only permit reading and drafting.

Related: [[My Shared Brain]], [[WhatsApp Business]], [[Browser harness]], [[Work browser profile]], [[Virtual scrolling and lazy loading]], [[Page data over screenshots]], [[Gmail Reference Guide for Browser Automation]], [[Automation guardrails]].
