const db = require('./config/db');

async function setup() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Users table checked/created.');

    // Add user_id to scans if it doesn't exist
    await db.query(`
      ALTER TABLE scans
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
    `);
    console.log('user_id column checked/created in scans table.');
  } catch (error) {
    console.error('Error setting up DB:', error);
  } finally {
    process.exit();
  }
}

setup();
