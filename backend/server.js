const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const detectionRoutes = require('./routes/detectionRoutes');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database table if it doesn't exist
const initDb = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS scans (
        id SERIAL PRIMARY KEY,
        content_type VARCHAR(50),
        content_preview TEXT,
        plagiarism_score INT,
        ai_score INT,
        file_path TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
};
initDb();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/detection', detectionRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
