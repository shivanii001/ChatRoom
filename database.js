const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./chat.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            message TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

function saveMessage(user, message) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO messages (user, message) VALUES (?, ?)', [user, message], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

module.exports = { db, saveMessage };