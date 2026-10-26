const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'whatsapp-mcp/whatsapp-bridge/store/messages.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
});

const query = `
    SELECT m.timestamp, c.name, m.sender, m.content, m.is_from_me, m.media_type
    FROM messages m
    JOIN chats c ON m.chat_jid = c.jid
    ORDER BY m.timestamp DESC
    LIMIT 20
`;

db.all(query, [], (err, rows) => {
    if (err) {
        console.error('Error executing query:', err.message);
        db.close();
        process.exit(1);
    }

    console.log(JSON.stringify(rows, null, 2));
    db.close();
});
