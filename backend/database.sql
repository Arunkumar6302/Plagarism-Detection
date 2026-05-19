CREATE TABLE scans (
  id SERIAL PRIMARY KEY,
  content_type VARCHAR(50),
  content_preview TEXT,
  plagiarism_score INT,
  ai_score INT,
  file_path TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
