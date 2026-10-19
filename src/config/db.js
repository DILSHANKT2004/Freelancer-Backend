const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const databaseName = process.env.DB_NAME;

if (!databaseName) {
    throw new Error('DB_NAME is required');
}

const escapeIdentifier = (identifier) => `\`${identifier.replace(/`/g, '``')}\``;

const initializeDatabase = async () => {
    const adminConnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try {
        await adminConnection.query(
            `CREATE DATABASE IF NOT EXISTS ${escapeIdentifier(databaseName)}`
        );
    } finally {
        await adminConnection.end();
    }

    await pool.query(`
        CREATE TABLE IF NOT EXISTS income_records (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            month VARCHAR(20) NOT NULL,
            platform VARCHAR(100) NOT NULL,
            income DECIMAL(12, 2) NOT NULL,
            deductions DECIMAL(12, 2) NOT NULL DEFAULT 0,
            record_total DECIMAL(12, 2) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )
    `);
};

module.exports = { pool, initializeDatabase };
