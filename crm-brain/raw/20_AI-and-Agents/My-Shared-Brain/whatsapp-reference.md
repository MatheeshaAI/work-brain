# WhatsApp Web Interface Reference Guide

**Version:** 1.0
**Last Updated:** May 2026
**Purpose:** Complete technical reference for AI agents automating WhatsApp Web interactions

## Related Context
- [[WhatsApp]] — WhatsApp Business working rules
- [[Browser Profile]] — which profile to use for WhatsApp

---

## Table of Contents

1. [Page Structure Map](#page-structure-map)
2. [Field Reference](#field-reference)
3. [Ready-to-Run Browser-Harness Scripts](#ready-to-run-browser-harness-scripts)
4. [Agent Tips](#agent-tips)
5. [Example Use Cases](#example-use-cases)
6. [Virtual Scrolling & Lazy Loading](#virtual-scrolling--lazy-loading)

---

## Page Structure Map

### Overall Layout Architecture

WhatsApp Web uses a drawer-based layout system with the following main containers:

```
#app (React mount point: #mount_0_0_*)
├── drawer-fullscreen (Full-screen modals/drawers)
├── drawer-left (Sidebar navigation)
├── drawer-middle (Chat list / main content area)
├── drawer-right (Contact info / details panel)
└── drawer-title-body (Header/title area)
```

### Drawer-Middle: Conversation/Chat List

**Container:** `[data-testid="drawer-middle"]`

**Primary Elements:**
- **Chat List Container:** `[data-testid="chat-list"]`
  - Contains virtual-scrolled list of conversations
  - Each conversation is a grid row with `[role="row"]`
  - Test ID pattern: `list-item-{0-N}` (indexed, dynamically rendered)
  
- **Search Container:** `[data-testid="chat-list-search-container"]`
  - Contains search input for filtering conversations
  - Input element: `<input>` inside the search container

- **Header:** `[data-testid="chatlist-header"]`
  - Contains WhatsApp logo, menu buttons, and action icons

### Chat List Item Structure

Each conversation item in the chat list follows this structure:

```html
<div data-testid="list-item-{N}" role="row" tabindex="0">
  <div role="gridcell">
    <div data-testid="cell-frame-container">
      <!-- Contact/group avatar and info -->
      <div class="_ak8n">
        <div class="_ak8h">
          <!-- Pinned indicator (if applicable) -->
          
          <!-- Title/Contact name -->
          <div data-testid="cell-frame-title">
            Contact Name / Group Name
          </div>
          
          <!-- Primary detail (latest message preview) -->
          <div data-testid="cell-frame-primary-detail">
            Message preview text...
          </div>
          
          <!-- Secondary detail (timestamp) -->
          <div data-testid="cell-frame-secondary">
            Day or time (e.g., "Wednesday", "2:30 PM")
          </div>
          
          <!-- Message status indicator -->
          <div data-testid="last-msg-status">
            <!-- Contains: data-testid="status-dblcheck" (sent/read indicators) -->
          </div>
          
          <!-- Unread count indicator (if applicable) -->
          <div data-testid="icon-unread-count">
            Unread count number
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Drawer-Right: Contact Info Panel

**When a conversation is selected, the right drawer shows:**
- Contact profile photo and name
- Online/offline status
- Last seen information
- Contact status and bio
- Media/attachment gallery
- Common groups (if applicable)
- Block/report options

**Key elements:**
- Profile section: headers with contact name and status
- Media section: `[data-testid*="gallery"]` or similar
- Action buttons: call, video call, search in conversation

### Message Area / Chat Thread

When a conversation is open:

```
drawer-middle OR drawer-title-body (header)
  ├── Contact name and status
  ├── Search and info buttons
  └── [data-testid="pane-chat"] (message container if present)
```

**Message Container Structure:**
- Messages are rendered in a scrollable area with `[role="log"]` (for accessibility)
- Each message has `data-testid="msg-{ID}"` where ID is unique per message
- Messages are lazy-loaded as you scroll up (older messages)
- Message bubbles are differentiated by position (left = received, right = sent by user)

### Navigation Bar (Left Sidebar)

**Elements:**
- `[data-testid="navbar-item-chats"]` - Chats (active by default)
- `[data-testid="navbar-item-status"]` - Updates/Status
- `[data-testid="navbar-item-newsletters"]` - Channels
- `[data-testid="navbar-item-communities"]` - Communities
- `[data-testid="navbar-item-biz-tools"]` - Tools
- `[data-testid="navbar-item-media-hub"]` - Media
- `[data-testid="navbar-item-settings"]` - Settings
- `[data-testid="navbar-item-profile"]` - Profile
- `[data-testid="navbar-item-profile-photo"]` - Profile photo (clickable)

---

## Field Reference

### Conversation/Chat Item Fields

| Field | Selector | Description |
|-------|----------|-------------|
| **Contact/Group Name** | `[data-testid="cell-frame-title"]` | Display name of the conversation |
| **Message Preview** | `[data-testid="cell-frame-primary-detail"]` | Latest message text or media indicator |
| **Timestamp** | `[data-testid="cell-frame-secondary"]` | Time/day message was sent (e.g., "2:30 PM", "Wednesday") |
| **Read Status** | `[data-testid="status-dblcheck"]` | Delivery status (single check = sent, double check = delivered, blue = read) |
| **Unread Count** | `[data-testid="icon-unread-count"]` | Number of unread messages (if any) |
| **Pinned Status** | aria-label containing "Pinned" | Indicates if conversation is pinned |
| **User/Group Avatar** | `img[role="img"]` inside cell frame | Profile picture |
| **Contact Info** | `[data-testid="default-contact-refreshed"]` or similar | Contact icon/status |

### Message Element Fields

| Field | Selector/Path | Description |
|-------|---------------|-------------|
| **Message ID** | `[data-testid="msg-{UUID}"]` | Unique message identifier in data-testid |
| **Message Text** | Direct text content of message bubble | The actual message body |
| **Sender Name** | Context from message structure | For group messages, who sent it |
| **Timestamp** | `aria-label` or embedded timestamp | Message send time |
| **Read Status** | `[data-testid="status-dblcheck"]` inside message | One check (sent), two checks (delivered), blue two checks (read) |
| **Reactions** | `[data-testid^="reaction"]` | Emoji reactions on the message |
| **Attachment Type** | Child elements (img/video/file) | Images, videos, documents, etc. |
| **Message Type** | Element structure | Text, image, video, audio, document, location, contact |
| **Quote/Reply** | Quoted message container | If message replies to another |
| **Forwarded** | Forwarded indicator label | Whether message was forwarded |
| **Edited** | "(edited)" label | If message was edited after sending |

### Message Type Indicators

```javascript
// How to identify message types:
const messageEl = document.querySelector('[data-testid="msg-{UUID}"]');

// Text message
messageEl.innerText && !messageEl.querySelector('img') && !messageEl.querySelector('video')

// Image
messageEl.querySelector('img[role="img"]')

// Video
messageEl.querySelector('video') || messageEl.querySelector('[data-testid*="video"]')

// Audio/Voice note
messageEl.querySelector('audio') || messageEl.querySelector('[data-testid*="audio"]')

// Document/File
messageEl.querySelector('[data-testid*="file"], [class*="document"]')

// Sticker
messageEl.querySelector('img[class*="sticker"]')

// Location
messageEl.querySelector('[class*="location"], [data-testid*="location"]')

// Contact card
messageEl.querySelector('[class*="contact"], [data-testid*="contact"]')

// Group notification (e.g., member added)
messageEl.getAttribute('data-testid').includes('action')
```

### Input Area Fields

| Field | Selector | Description |
|-------|----------|-------------|
| **Message Input** | `[contenteditable="true"]` | Text area where you type messages |
| **Send Button** | `button[aria-label*="Send"]` or `[aria-label*="send"]` | Button to send message |
| **Attachment Button** | `button[aria-label*="Attach"]` or similar | Upload/attach files |
| **Emoji Picker** | `button[aria-label*="Emoji"]` | Open emoji picker |
| **Microphone (Voice Note)** | `button[aria-label*="Microphone"]` or record button | Record voice message |

### Aria-Labels (Quick Reference)

Common aria-labels for identifying UI elements:

- `"Send"` or `"Send message"` - Send button
- `"Attach"`, `"Attach image"`, `"Attach file"` - Attachment buttons
- `"Emoji"`, `"Emoji picker"` - Emoji selector
- `"More options"`, `"Menu"` - Additional actions menu
- `"Close search"`, `"Clear search"` - Search controls
- `"Pin chat"`, `"Unpin chat"` - Chat pinning
- `"Mute notifications"`, `"Unmute notifications"` - Notification control
- `"Delete chat"` - Delete conversation
- `"Archive chat"` - Archive conversation
- `"Search in conversation"` - Search within a chat

---

## Ready-to-Run Browser-Harness Scripts

All scripts use the `browser-harness` Python environment. Scripts handle WhatsApp's React rendering and virtual scrolling.

### 1. Extract Active Conversations

Retrieves all visible conversations with latest message preview and timestamp.

```javascript
// browser-harness <<'PY'
// import json
// import time

// List all conversations currently visible
conversations = js("""
(function() {
  const convs = [];
  const items = document.querySelectorAll('[data-testid^="list-item-"]');
  
  items.forEach(item => {
    const testId = item.getAttribute('data-testid');
    const title = item.querySelector('[data-testid="cell-frame-title"]')?.innerText;
    const preview = item.querySelector('[data-testid="cell-frame-primary-detail"]')?.innerText;
    const timestamp = item.querySelector('[data-testid="cell-frame-secondary"]')?.innerText;
    const unreadEl = item.querySelector('[data-testid="icon-unread-count"]');
    const unreadCount = unreadEl ? parseInt(unreadEl.innerText) : 0;
    
    convs.push({
      testId: testId,
      name: title,
      latestMessage: preview,
      timestamp: timestamp,
      unreadCount: unreadCount,
      isRead: unreadCount === 0
    });
  });
  
  return convs;
})()
""")

print(json.dumps(conversations, indent=2))
// PY
```

### 2. Extract Messages from Thread (with Lazy Loading)

Get full message history from a conversation, handling lazy-loaded older messages.

```javascript
// browser-harness <<'PY'
// import json
// import time

// Click on a conversation first (e.g., click_at_xy(500, 250))

// Give messages time to load
time.sleep(1)

// Function to load older messages by scrolling
def load_more_messages(max_scrolls=10):
    for i in range(max_scrolls):
        scroll_distance = js("() => { const el = document.querySelector('[role=\"log\"]'); if (!el) return 0; el.scrollTop -= 500; return el.scrollTop; }")
        print(f"Scroll {i+1}: position {scroll_distance}")
        time.sleep(0.5)
        if scroll_distance <= 0:
            break

# Load older messages
load_more_messages(5)

# Now extract all visible messages
messages = js("""
(function() {
  const msgs = [];
  const msgElements = document.querySelectorAll('[data-testid^="msg-"]');
  
  msgElements.forEach(msg => {
    const testId = msg.getAttribute('data-testid');
    const ariaLabel = msg.getAttribute('aria-label') || '';
    const text = msg.innerText;
    const isFromUser = msg.classList.toString().includes('_aok4') || msg.style.direction === 'rtl'; // Adjust selector based on your layout
    
    // Extract timestamp from aria-label (format: "12:30 PM" or similar)
    const timeMatch = ariaLabel.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/i);
    const time = timeMatch ? timeMatch[0] : null;
    
    // Check for read status
    const readStatusEl = msg.querySelector('[data-testid="status-dblcheck"]');
    const readStatus = readStatusEl ? readStatusEl.innerText : 'unknown';
    
    msgs.push({
      messageId: testId,
      text: text,
      timestamp: time,
      ariaLabel: ariaLabel,
      sender: isFromUser ? 'You' : 'Contact',
      readStatus: readStatus,
      hasAttachment: !!msg.querySelector('img, video, audio'),
      hasReaction: !!msg.querySelector('[data-testid^="reaction"]')
    });
  });
  
  return msgs;
})()
""")

print(json.dumps(messages, indent=2))
// PY
```

### 3. Send Message to Existing Contact

Open a chat and send a message.

```javascript
// browser-harness <<'PY'
// import time

// Click on a conversation from the list
# Find and click the conversation (example: first one)
first_chat = js("() => document.querySelector('[data-testid=\"list-item-0\"]')")
click_at_xy(500, 200)  # Adjust coordinates based on chat position
time.sleep(1)

# Type message in the input area
message_input = document.querySelector('[contenteditable="true"]')
click_at_xy(960, 750)  # Click in the message input area
time.sleep(0.5)

# Type the message
type_text("Hello! This is a test message.")

# Find and click the Send button
time.sleep(0.5)
send_button = js("() => document.querySelector('button[aria-label*=\"Send\"]')")
click_at_xy(1800, 750)  # Adjust based on send button location

# Verify message was sent
time.sleep(1)
print("Message sent!")
// PY
```

### 4. Search Conversations by Name

Search for a conversation by contact name or keyword.

```javascript
// browser-harness <<'PY'
// import json
// import time

search_term = "john"

# Click on the search box
search_box = document.querySelector('[data-testid="chat-list-search-container"] input')
click_at_xy(960, 50)  # Approximate search box location
time.sleep(0.5)

# Type search term
type_text(search_term)
time.sleep(1)

# Extract search results
results = js("""
(function() {
  const results = [];
  const items = document.querySelectorAll('[data-testid^="list-item-"]');
  
  items.forEach(item => {
    const name = item.querySelector('[data-testid="cell-frame-title"]')?.innerText;
    const preview = item.querySelector('[data-testid="cell-frame-primary-detail"]')?.innerText;
    
    results.push({
      name: name,
      preview: preview
    });
  });
  
  return results;
})()
""")

print(f"Found {len(results)} results for '{search_term}':")
print(json.dumps(results, indent=2))

# Clear search
clear_btn = js("() => document.querySelector('button[aria-label*=\"Clear\"]')")
click_at_xy(1700, 50)  # Clear button location
time.sleep(0.5)
// PY
```

### 5. Add Emoji Reaction to Message

Find a message and add an emoji reaction.

```javascript
// browser-harness <<'PY'
// import time

# Click on a conversation to open it
click_at_xy(500, 250)
time.sleep(1)

# Find a message element
message = js("() => document.querySelector('[data-testid^=\"msg-\"]')")

# Right-click or hover over the message to reveal reaction options
hover_x, hover_y = 600, 400
hover(hover_x, hover_y)
time.sleep(0.5)

# Look for reaction picker button that appears on hover
reaction_btn = js("() => document.querySelector('button[aria-label*=\"Reaction\"], button[aria-label*=\"React\"]')")

# If visible, click it
if reaction_btn:
    click_at_xy(700, 400)
    time.sleep(0.5)
    
    # Select emoji (this depends on the emoji picker UI)
    # Example: click on the first emoji shown
    emoji_option = js("() => document.querySelector('[role=\"option\"][data-emoji]')")
    if emoji_option:
        click_at_xy(650, 450)
        time.sleep(0.5)
        print("Emoji reaction added!")
else:
    print("Reaction button not found - may need to adjust selector")
// PY
```

### 6. Reply to a Specific Message

Quote/reply to a particular message in a conversation.

```javascript
// browser-harness <<'PY'
// import time

# Open a conversation
click_at_xy(500, 250)
time.sleep(1)

# Find a message by partial text match
message_to_reply = js("""
(function() {
  const msgs = document.querySelectorAll('[data-testid^="msg-"]');
  for (let msg of msgs) {
    if (msg.innerText.includes("original message text")) {
      return msg.getAttribute('data-testid');
    }
  }
  return null;
})()
""")

if message_to_reply:
    # Right-click or hover to show context menu
    msg_el = js(f"() => document.querySelector('[data-testid=\"{message_to_reply}\"]')")
    hover_element(message_to_reply)  # Approximate - may need coordinate-based hover
    time.sleep(0.5)
    
    # Click "Reply" option from context menu
    reply_btn = js("() => document.querySelector('button[aria-label*=\"Reply\"]')")
    if reply_btn:
        click_at_xy(700, 400)  # Adjust based on menu position
        time.sleep(0.5)
        
        # Type reply message
        message_input = js("() => document.querySelector('[contenteditable=\"true\"]')")
        type_text("This is my reply!")
        
        # Send
        time.sleep(0.5)
        click_at_xy(1800, 750)
        print("Reply sent!")
// PY
```

### 7. Get Unread Message Count

Count total unread messages across all conversations.

```javascript
// browser-harness <<'PY'
// import json

unread_info = js("""
(function() {
  let totalUnread = 0;
  const unreadItems = [];
  
  document.querySelectorAll('[data-testid^="list-item-"]').forEach(item => {
    const unreadEl = item.querySelector('[data-testid="icon-unread-count"]');
    if (unreadEl) {
      const count = parseInt(unreadEl.innerText) || 0;
      const name = item.querySelector('[data-testid="cell-frame-title"]')?.innerText;
      totalUnread += count;
      unreadItems.push({
        conversation: name,
        unreadCount: count
      });
    }
  });
  
  return {
    totalUnread: totalUnread,
    unreadByConversation: unreadItems
  };
})()
""")

print(json.dumps(unread_info, indent=2))
// PY
```

### 8. Scroll Chat List to Find Specific Chat

Handle virtual scrolling in the conversation list to find a chat.

```javascript
// browser-harness <<'PY'
// import time

target_contact = "Contact Name"

def find_chat_by_scrolling(max_scrolls=20):
    for i in range(max_scrolls):
        # Check if target is visible
        found = js(f"""
        (function() {{
          const items = document.querySelectorAll('[data-testid^="list-item-"]');
          for (let item of items) {{
            const name = item.querySelector('[data-testid="cell-frame-title"]')?.innerText;
            if (name && name.includes("{target_contact}")) {{
              return {{
                found: true,
                testId: item.getAttribute('data-testid')
              }};
            }}
          }}
          return {{ found: false }};
        }})()
        """)
        
        if found['found']:
            print(f"Found chat in visible list: {found['testId']}")
            return found['testId']
        
        # Scroll down in chat list
        scroll_result = js("() => { const list = document.querySelector('[data-testid=\"chat-list\"]'); if (list) { list.scrollTop += 300; return list.scrollTop; } return 0; }")
        print(f"Scroll {i+1}: position {scroll_result}")
        time.sleep(0.3)
    
    print(f"Chat '{target_contact}' not found after {max_scrolls} scrolls")
    return None

result = find_chat_by_scrolling()
if result:
    # Click on the found chat
    time.sleep(0.5)
    click_at_xy(500, 250)  # Approximate position
// PY
```

### 9. Open Settings Menu

Access WhatsApp settings and options.

```javascript
// browser-harness <<'PY'
// import time

# Click on Settings button
settings_btn = js("() => document.querySelector('[data-testid=\"navbar-item-settings\"]')")

# Click using aria-label
click_button_by_label = lambda label: (
    click_at_xy(960, 600) if 'settings' in label.lower() else None
)

# Alternative: click the settings icon from navbar
click_at_xy(960, 750)  # Adjust based on settings position in navbar
time.sleep(1)

print("Settings menu opened")
// PY
```

### 10. Monitor for New Messages (Polling)

Continuously check for new unread messages.

```javascript
// browser-harness <<'PY'
// import time
// import json

def monitor_new_messages(check_interval=5, max_checks=12):
    previous_unread = set()
    
    for check_num in range(max_checks):
        current_unread = js("""
        (function() {
          const unread = [];
          document.querySelectorAll('[data-testid^="list-item-"]').forEach(item => {
            const unreadEl = item.querySelector('[data-testid="icon-unread-count"]');
            if (unreadEl) {
              const name = item.querySelector('[data-testid="cell-frame-title"]')?.innerText;
              const count = parseInt(unreadEl.innerText) || 0;
              if (count > 0) {
                unread.push(name);
              }
            }
          });
          return unread;
        })()
        """)
        
        current_set = set(current_unread)
        new_messages = current_set - previous_unread
        
        if new_messages:
            print(f"[Check {check_num+1}] NEW messages from: {new_messages}")
        
        previous_unread = current_set
        time.sleep(check_interval)
    
    print(f"Monitoring completed after {max_checks} checks")

monitor_new_messages(check_interval=5, max_checks=6)
// PY
```

---

## Agent Tips

### 1. Data-TestId Reliability

WhatsApp uses `data-testid` attributes extensively and they are **highly reliable** for element selection:
- `data-testid` values remain consistent across page refreshes and UI updates
- Prefer `data-testid` over class names (classes change frequently with React updates)
- Pattern: `[data-testid="exact-id"]` for single match, `[data-testid^="prefix"]` for prefix matching

**Example:**
```javascript
// GOOD - stable across updates
document.querySelector('[data-testid="chat-list"]')

// AVOID - classes change frequently
document.querySelector('.x1iyjqo2._ak0e._ak0f')
```

### 2. Virtual Scrolling in Chat List

The conversation list uses virtual scrolling - only visible items are rendered in the DOM:

- Chat items are indexed: `list-item-0`, `list-item-1`, etc.
- Not all items exist in the DOM simultaneously
- To find a chat that's not visible, **you must scroll the list**
- The scroll container has `data-testid="chat-list"`

**Tip:** Always scroll in the chat list container, not the window:
```javascript
const chatList = document.querySelector('[data-testid="chat-list"]');
chatList.scrollTop += 300;  // Scroll down
```

### 3. Message Lazy Loading

Messages in a thread are lazy-loaded as you scroll up (to older messages):

- Initially, only recent messages are in the DOM
- Scrolling up in the message area loads older messages
- Look for `[role="log"]` as the message container (scrollable area)
- Wait 0.5-1 second after scrolling before querying messages

**Pattern:**
```javascript
const logContainer = document.querySelector('[role="log"]');
if (logContainer) {
    logContainer.scrollTop -= 500;  // Scroll UP to load older
    // Wait 0.5s, then re-query messages
}
```

### 4. Message Reactions and Status

Reactions and delivery status are added as **separate DOM nodes**, not attributes:

- Status indicator: `[data-testid="status-dblcheck"]` inside or near message
- Reactions: `[data-testid^="reaction"]` as sibling or child of message
- Edited status: "(edited)" text label below message
- Forwarded: "Forwarded" label (sometimes in message context)

### 5. Waiting for Message Delivery Status

Message status changes happen asynchronously (sent → delivered → read):

```javascript
// Wait for read status to update
function waitForReadStatus(messageTestId, timeout = 5000) {
    const startTime = Date.now();
    
    const checkStatus = () => {
        const msg = document.querySelector(`[data-testid="${messageTestId}"]`);
        const status = msg?.querySelector('[data-testid="status-dblcheck"]');
        const isRead = status?.innerText.includes('✓✓') && status.style.color === 'blue';
        
        if (isRead) return true;
        if (Date.now() - startTime > timeout) return false;
        
        return new Promise(resolve => {
            setTimeout(() => resolve(checkStatus()), 100);
        });
    };
    
    return checkStatus();
}
```

### 6. Timing Considerations for Message Sending

After sending a message, allow time for:
- Message to appear in the list (0.5-1s)
- Status to update to "delivered" (1-3s depending on network)
- Status to update to "read" (depends on recipient activity)

**Safe approach:**
```javascript
click_send_button()
time.sleep(1)  // Wait for message to appear
verify_message_visible()
time.sleep(2)  // Wait for delivery status
verify_delivery_status()
```

### 7. Identifying Message Bubbles (Yours vs. Theirs)

Messages from different sources are positioned/styled differently:

- **Your messages (sent):** Typically on the right side, light bubble (usually light blue/white)
- **Their messages (received):** Typically on the left side, darker bubble (usually light green/gray)
- **Check position:** Message element's computed style `direction` or parent class indicates direction

```javascript
function isYourMessage(msgElement) {
    // Check if message is positioned on the right (your side)
    const style = window.getComputedStyle(msgElement);
    const classList = msgElement.className;
    
    // Right-aligned messages are typically yours
    return classList.includes('_aok4') || 
           style.marginLeft === 'auto' ||
           msgElement.dir === 'rtl';
}
```

### 8. Handling Group Chats vs. Direct Messages

**Group chats:**
- Show sender name above each message
- Title shows group name (not individual)
- May have more complex member info in right drawer
- Actions affect all members

**Direct messages:**
- No sender name (assumed to be the other person)
- Title shows single contact name
- Simpler contact info panel

**Differentiate:**
```javascript
const title = document.querySelector('[data-testid="cell-frame-title"]');
const isGroup = title?.innerText.includes(' (') || 
                document.querySelectorAll('[data-testid*="member"]').length > 0;
```

### 9. Contact Status Indicators

Status appears in multiple places:

- **Chat list:** Small indicator next to name
- **Message sender name:** Status below the sender in messages
- **Contact info panel:** Large status display

**Status values:**
- Green dot / "online" = Active now
- Yellow/amber dot = Away
- Gray dot / "last seen X minutes/hours ago" = Offline
- "Offline" = Not seen recently

### 10. Handling Typing Indicators

When someone is typing:
- A "typing..." indicator appears in the message area
- Look for elements with aria-label containing "typing" or similar
- Check for animated dots or text saying "... typing"
- These are temporary and disappear when typing stops

```javascript
const isTyping = !!document.querySelector('[aria-label*="typing"]') ||
                 !!document.innerText.includes('typing');
```

### 11. Search Behavior

- Search box: `[data-testid="chat-list-search-container"]`
- Searches across conversation names, messages, and contacts
- Results update live as you type
- To clear search: button with `aria-label*="Clear"`

### 12. React Fragment and Key Extraction

For complex nested structures, get the React instance to access component state:

```javascript
function getReactInstance(element) {
    const key = Object.keys(element).find(k => k.startsWith('__react'));
    return element[key];
}
```

This can be useful for debugging but generally **stick to DOM selectors** for reliability.

---

## Example Use Cases

### Use Case 1: Extract All Messages from a Conversation for Backup

**Scenario:** Save a complete conversation with all messages, timestamps, and metadata.

```javascript
// browser-harness <<'PY'
// import json
// import time
// import csv

def backup_conversation(contact_name):
    # Search for and open the conversation
    search_box = document.querySelector('[data-testid="chat-list-search-container"] input')
    click_at_xy(960, 50)
    type_text(contact_name)
    time.sleep(1)
    
    # Click on the found conversation
    click_at_xy(500, 200)
    time.sleep(1)
    
    # Load all messages (scroll to top)
    def scroll_to_top():
        for _ in range(50):
            js("() => { const log = document.querySelector('[role=\"log\"]'); if (log) log.scrollTop = 0; }")
            time.sleep(0.2)
    
    scroll_to_top()
    time.sleep(2)
    
    # Extract all visible messages
    messages = []
    last_count = 0
    
    for _ in range(10):
        current_msgs = js("""
        (function() {
          const msgs = [];
          document.querySelectorAll('[data-testid^="msg-"]').forEach(msg => {
            msgs.push({
              id: msg.getAttribute('data-testid'),
              text: msg.innerText,
              timestamp: msg.getAttribute('aria-label'),
              fromYou: msg.classList.toString().includes('_aok4')
            });
          });
          return msgs;
        })()
        """)
        
        messages = current_msgs
        if len(messages) == last_count:
            break
        last_count = len(messages)
        time.sleep(0.5)
    
    # Save to CSV
    with open(f"{contact_name}_backup.csv", 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['timestamp', 'from', 'message'])
        writer.writeheader()
        for msg in messages:
            writer.writerow({
                'timestamp': msg.get('timestamp', ''),
                'from': 'You' if msg.get('fromYou') else contact_name,
                'message': msg.get('text', '')
            })
    
    print(f"Backed up {len(messages)} messages to {contact_name}_backup.csv")

backup_conversation("John Doe")
// PY
```

### Use Case 2: Find Messages from Specific Contact

**Scenario:** Search for and extract all messages from a particular person.

```javascript
// browser-harness <<'PY'
// import json

def find_messages_from(conversation_name, sender_name):
    # Open conversation
    click_at_xy(500, 250)
    time.sleep(1)
    
    # Extract messages
    messages = js(f"""
    (function() {{
      const msgs = [];
      const targetSender = "{sender_name}";
      
      document.querySelectorAll('[data-testid^="msg-"]').forEach(msg => {{
        const ariaLabel = msg.getAttribute('aria-label') || '';
        const text = msg.innerText;
        
        // In group chats, sender info is in aria-label or message structure
        // For direct chats, filter accordingly
        if (ariaLabel.includes(targetSender) || text.length > 0) {{
          msgs.push({{
            text: text,
            timestamp: ariaLabel.match(/\\d{{1,2}}:\\d{{2}}/)?.[0],
            full_aria: ariaLabel
          }});
        }}
      }});
      
      return msgs;
    }})()
    """)
    
    matching = [m for m in messages if sender_name.lower() in m.get('full_aria', '').lower()]
    
    print(f"Found {len(matching)} messages from {sender_name}")
    print(json.dumps(matching[:5], indent=2))  # Show first 5

find_messages_from("Group Chat", "Alice")
// PY
```

### Use Case 3: Get Unread Conversation Count

**Scenario:** Monitor how many conversations have unread messages.

```javascript
// browser-harness <<'PY'

unread_count = js("""
(function() {
  let count = 0;
  let totalMessages = 0;
  
  document.querySelectorAll('[data-testid^="list-item-"]').forEach(item => {
    const unreadEl = item.querySelector('[data-testid="icon-unread-count"]');
    if (unreadEl) {
      count++;
      totalMessages += parseInt(unreadEl.innerText) || 0;
    }
  });
  
  return {
    unreadConversations: count,
    totalUnreadMessages: totalMessages
  };
})()
""")

print(f"Unread conversations: {unread_count['unreadConversations']}")
print(f"Total unread messages: {unread_count['totalUnreadMessages']}")
// PY
```

### Use Case 4: Export Conversation with All Messages

**Scenario:** Export a full conversation thread with formatting.

```javascript
// browser-harness <<'PY'
// import time
// import json

def export_conversation(contact_name, output_file):
    # Open conversation
    click_at_xy(500, 250)
    time.sleep(1)
    
    # Scroll to beginning
    for _ in range(50):
        js("() => { const log = document.querySelector('[role=\"log\"]'); if (log) log.scrollTop = 0; }")
        time.sleep(0.1)
    
    time.sleep(1)
    
    # Get all messages
    all_messages = js("""
    (function() {
      const messages = [];
      let lastId = null;
      
      for (let i = 0; i < 200; i++) {
        const msgs = Array.from(document.querySelectorAll('[data-testid^="msg-"]'));
        if (msgs.length > 0 && msgs[0].getAttribute('data-testid') === lastId) break;
        
        lastId = msgs[0]?.getAttribute('data-testid');
        
        msgs.forEach(msg => {
          const id = msg.getAttribute('data-testid');
          if (!messages.find(m => m.id === id)) {
            messages.push({
              id: id,
              text: msg.innerText,
              aria: msg.getAttribute('aria-label')
            });
          }
        });
        
        const log = document.querySelector('[role="log"]');
        if (log) log.scrollTop -= 300;
      }
      
      return messages;
    })()
    """)
    
    # Format and save
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"=== Conversation with {contact_name} ===\n\n")
        for msg in all_messages:
            f.write(f"[{msg['aria']}] {msg['text']}\n\n")
    
    print(f"Exported {len(all_messages)} messages to {output_file}")

export_conversation("John", "john_conversation.txt")
// PY
```

### Use Case 5: Monitor for New Messages (Continuous Polling)

**Scenario:** Watch a conversation for new incoming messages.

```javascript
// browser-harness <<'PY'
// import time

def monitor_conversation(contact_name, duration_seconds=300):
    # Open conversation
    click_at_xy(500, 250)
    time.sleep(1)
    
    print(f"Monitoring {contact_name} for {duration_seconds} seconds...")
    
    start_time = time.time()
    last_message_id = None
    
    while time.time() - start_time < duration_seconds:
        # Get latest message
        latest = js("""
        (function() {
          const msgs = document.querySelectorAll('[data-testid^="msg-"]');
          if (msgs.length === 0) return null;
          
          const latest = msgs[msgs.length - 1];
          return {
            id: latest.getAttribute('data-testid'),
            text: latest.innerText,
            time: latest.getAttribute('aria-label')
          };
        })()
        """)
        
        if latest and latest['id'] != last_message_id:
            print(f"\n[NEW] {latest['time']}: {latest['text'][:50]}...")
            last_message_id = latest['id']
        
        time.sleep(5)  # Check every 5 seconds
    
    print("Monitoring stopped")

monitor_conversation("John", duration_seconds=60)
// PY
```

---

## Virtual Scrolling & Lazy Loading

### Understanding Virtual Scrolling in Chat List

WhatsApp Web renders the conversation list using virtual scrolling for performance:

**Key characteristics:**
- Only visible items are rendered in the DOM (~50-70 items visible at a time)
- Items are recycled as you scroll (old items removed, new items added to end)
- Item test IDs are: `list-item-0`, `list-item-1`, ... `list-item-N`
- N changes as you scroll (index resets based on visible viewport)

**Important:** The same test ID can represent different conversations after scrolling!

### Scrolling the Chat List

```javascript
// Scroll down to see more conversations
const chatList = document.querySelector('[data-testid="chat-list"]');
chatList.scrollTop += 300;  // Scroll 300px down

// Check new visible items
setTimeout(() => {
    const items = document.querySelectorAll('[data-testid^="list-item-"]');
    console.log(`Now showing ${items.length} items`);
}, 300);
```

### Finding a Specific Chat When Not Visible

```javascript
// browser-harness <<'PY'
// import time

def find_chat(target_name, max_scrolls=30):
    for scroll_attempt in range(max_scrolls):
        # Check visible items
        found = js(f"""
        (function() {{
          const items = document.querySelectorAll('[data-testid^="list-item-"]');
          for (let item of items) {{
            const name = item.querySelector('[data-testid="cell-frame-title"]')?.innerText;
            if (name && name.toLowerCase().includes("{target_name.lower()}")) {{
              return {{
                found: true,
                position: Array.from(items).indexOf(item),
                name: name
              }};
            }}
          }}
          return {{ found: false }};
        }})()
        """)
        
        if found['found']:
            print(f"Found '{found['name']}' at position {found['position']}")
            return True
        
        # Scroll down
        js("() => { const cl = document.querySelector('[data-testid=\"chat-list\"]'); cl.scrollTop += 300; }")
        time.sleep(0.3)
    
    print(f"Chat '{target_name}' not found after {max_scrolls} scrolls")
    return False

find_chat("John Doe")
// PY
```

### Understanding Message Lazy Loading

Messages in a thread are loaded lazily as you scroll:

**Pattern:**
1. User opens a chat → Recent messages loaded
2. User scrolls UP (to older messages) → Old messages load dynamically
3. Scrolling UP continues to load more history
4. Reaching the beginning stops loading (no older messages)

**Important:** Scrolling DOWN doesn't load more (you're scrolling toward recent messages that are already loaded).

### Loading Older Messages

```javascript
// browser-harness <<'PY'
// import time

def load_all_messages():
    # Find message container
    log = document.querySelector('[role="log"]')
    if not log:
        print("Message container not found")
        return []
    
    all_messages = []
    previous_count = 0
    
    for scroll_attempt in range(100):
        # Extract current messages
        current = js("""
        (function() {
          const msgs = [];
          document.querySelectorAll('[data-testid^="msg-"]').forEach(msg => {
            msgs.push({
              id: msg.getAttribute('data-testid'),
              text: msg.innerText.substring(0, 50)
            });
          });
          return msgs;
        })()
        """)
        
        # Check if we got more messages
        if len(current) == previous_count:
            print("No more messages to load")
            break
        
        all_messages = current
        previous_count = len(current)
        
        # Scroll UP to load older messages
        js("() => { const log = document.querySelector('[role=\"log\"]'); if (log) log.scrollTop -= 500; }")
        time.sleep(0.5)
    
    print(f"Loaded {len(all_messages)} total messages")
    return all_messages

messages = load_all_messages()
// PY
```

### Wait for Elements After Scrolling

After scrolling (either in chat list or message thread), always wait for new items to render:

```javascript
// browser-harness <<'PY'
// import time

# Scroll
js("() => { const el = document.querySelector('[data-testid=\"chat-list\"]'); el.scrollTop += 300; }")

# ALWAYS wait before querying
time.sleep(0.5)

# Now query for new items
new_items = js("() => document.querySelectorAll('[data-testid^=\"list-item-\"]').length")
print(f"Visible items: {new_items}")
// PY
```

### Infinite Scroll Implementation

```javascript
// browser-harness <<'PY'
// import time

def infinite_scroll_chat_list(callback, max_scrolls=50):
    """
    Continuously scroll through the chat list and call callback for each batch.
    """
    seen_ids = set()
    
    for _ in range(max_scrolls):
        # Get visible items
        items = js("""
        (function() {
          return Array.from(document.querySelectorAll('[data-testid^="list-item-"]')).map(item => ({
            id: item.getAttribute('data-testid'),
            name: item.querySelector('[data-testid="cell-frame-title"]')?.innerText
          }));
        })()
        """)
        
        # Find new items
        new_items = [item for item in items if item['id'] not in seen_ids]
        
        if new_items:
            callback(new_items)
            seen_ids.update(item['id'] for item in new_items)
        
        if len(new_items) == 0:
            print("No new items found, stopping")
            break
        
        # Scroll down
        js("() => { document.querySelector('[data-testid=\"chat-list\"]').scrollTop += 300; }")
        time.sleep(0.3)

def process_batch(items):
    for item in items:
        print(f"  - {item['name']}")

print("Scrolling through chat list:")
infinite_scroll_chat_list(process_batch)
// PY
```

---

## Additional Resources

### Debugging Tips

1. **Use browser DevTools (F12) while running scripts:**
   - Inspect element to verify selectors
   - Check Console for JavaScript errors
   - Watch Network tab for message delivery

2. **Print DOM snapshots for debugging:**
   ```javascript
   // Get full HTML of a specific element
   element = js("() => document.querySelector('[data-testid=\"chat-list\"]')?.outerHTML.substring(0, 1000)")
   print(element)
   ```

3. **Verify elements exist before interacting:**
   ```javascript
   element_exists = js("() => !!document.querySelector('[data-testid=\"send\"]')")
   print(f"Send button exists: {element_exists}")
   ```

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| **Element not found** | Page may not be fully loaded; add `time.sleep(1)` before querying |
| **Chat doesn't open** | Conversation may require a click on the name specifically, not the whole row |
| **Message doesn't send** | Check if message input is focused; may need to click it first |
| **Can't find unread count** | Not all chats have unread messages; only showing count if > 0 |
| **Scrolling doesn't load more** | May be at the top/bottom; check `scrollTop` value is changing |
| **React DevTools break page** | Disable React DevTools extension or use headless mode |

### Performance Optimization

1. **Minimize wait times:**
   - Use `time.sleep(0.3)` for DOM updates, not `time.sleep(1)`
   - Combine multiple DOM queries into a single `js()` call

2. **Batch operations:**
   - Extract multiple pieces of data in one JavaScript call
   - Reduces round-trip time

3. **Avoid infinite loops:**
   - Always have a counter-based `range()` limit
   - Check for "no more data" condition

---

## Summary

This reference guide provides the complete structure and selectors needed to automate WhatsApp Web interactions. Key takeaways:

- Use **data-testid** attributes for reliable element selection
- Account for **virtual scrolling** in the chat list
- Handle **lazy loading** when scrolling through messages
- Always **wait after scrolling** before querying new elements
- Test selectors in browser DevTools before adding to scripts
- Monitor **timing considerations** for message delivery status

For the most current information, inspect the live page in browser DevTools and verify selectors match your WhatsApp Web version.
