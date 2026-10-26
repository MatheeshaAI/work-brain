const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, 'wa-store');
const DB_PATH = path.join(DB_DIR, 'messages.db');

// Ensure directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database open error:', err);
  } else {
    initDb();
  }
});

db.configure('busyTimeout', 5000);

function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        jid TEXT NOT NULL,
        from_jid TEXT,
        from_me INTEGER DEFAULT 0,
        timestamp INTEGER,
        message_type TEXT,
        text TEXT,
        caption TEXT,
        filename TEXT,
        mimetype TEXT,
        media_path TEXT,
        chat_name TEXT,
        is_group INTEGER DEFAULT 0,
        raw_json TEXT,
        created_at INTEGER
      )
    `);

    db.run(`CREATE INDEX IF NOT EXISTS idx_messages_jid ON messages(jid)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_messages_text ON messages(text)`);

    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        jid TEXT PRIMARY KEY,
        name TEXT,
        notify TEXT,
        phone TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS chats (
        jid TEXT PRIMARY KEY,
        name TEXT,
        last_message_time INTEGER
      )
    `);
  });
}

function saveMessage(msg) {
  db.run(
    `INSERT OR REPLACE INTO messages (
      id, jid, from_jid, from_me, timestamp, message_type,
      text, caption, filename, mimetype, media_path, chat_name,
      is_group, raw_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      msg.id,
      msg.jid,
      msg.from_jid,
      msg.from_me ? 1 : 0,
      msg.timestamp || Math.floor(Date.now() / 1000),
      msg.message_type || 'text',
      msg.text || null,
      msg.caption || null,
      msg.filename || null,
      msg.mimetype || null,
      msg.media_path || null,
      msg.chat_name || null,
      msg.is_group ? 1 : 0,
      msg.raw_json ? JSON.stringify(msg.raw_json) : null,
      Math.floor(Date.now() / 1000),
    ],
    (err) => {
      if (err) {
        console.error('Error saving message:', err);
      }
    }
  );
}

function saveBulkMessages(messages) {
  db.serialize(() => {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO messages (
        id, jid, from_jid, from_me, timestamp, message_type,
        text, caption, filename, mimetype, media_path, chat_name,
        is_group, raw_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    messages.forEach((msg) => {
      stmt.run([
        msg.id,
        msg.jid,
        msg.from_jid || null,
        msg.from_me ? 1 : 0,
        msg.timestamp || Math.floor(Date.now() / 1000),
        msg.message_type || 'text',
        msg.text || null,
        msg.caption || null,
        msg.filename || null,
        msg.mimetype || null,
        msg.media_path || null,
        msg.chat_name || null,
        msg.is_group ? 1 : 0,
        msg.raw_json ? JSON.stringify(msg.raw_json) : null,
        Math.floor(Date.now() / 1000),
      ]);
    });

    stmt.finalize();
  });
}

function saveContact(jid, contact) {
  db.run(
    `INSERT OR REPLACE INTO contacts (jid, name, notify, phone)
    VALUES (?, ?, ?, ?)`,
    [jid, contact.name || null, contact.notify || null, contact.phone || null],
    (err) => {
      if (err) console.error('Error saving contact:', err);
    }
  );
}

function saveChat(jid, chat) {
  db.run(
    `INSERT OR REPLACE INTO chats (jid, name, last_message_time)
    VALUES (?, ?, ?)`,
    [jid, chat.name || null, chat.last_message_time || Math.floor(Date.now() / 1000)],
    (err) => {
      if (err) console.error('Error saving chat:', err);
    }
  );
}

function searchMessages(query) {
  return new Promise((resolve, reject) => {
    const searchTerm = `%${query}%`;
    db.all(
      `SELECT * FROM messages
       WHERE text LIKE ? OR chat_name LIKE ? OR jid LIKE ?
       ORDER BY timestamp DESC
       LIMIT 100`,
      [searchTerm, searchTerm, searchTerm],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
}

function getMessagesByJid(jid, limit = 1000) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM messages
       WHERE jid = ?
       ORDER BY timestamp ASC
       LIMIT ?`,
      [jid, limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
}

function getContact(jid) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM contacts WHERE jid = ?', [jid], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function getAllChats() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM chats ORDER BY last_message_time DESC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

function closeDb() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
  });
}

module.exports = {
  db,
  saveMessage,
  saveBulkMessages,
  saveContact,
  saveChat,
  searchMessages,
  getMessagesByJid,
  getContact,
  getAllChats,
  closeDb,
  DB_PATH,
};
