const fs = require('fs');
const path = require('path');
const plagiarismService = require('../services/plagiarismService');
const aiDetectionService = require('../services/aiDetectionService');
const db = require('../config/db');

exports.scanText = async (req, res) => {
  try {
    const { content, type } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const userId = req.user ? req.user.id : null;
    const plagiarismResult = await plagiarismService.checkPlagiarism(content, userId);
    const aiResult = await aiDetectionService.checkAIContent(content);

    const query = `
      INSERT INTO scans (content_type, content_preview, plagiarism_score, ai_score, user_id, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;

    const values = [type || 'text', content.substring(0, 2000), plagiarismResult.score, aiResult.score, userId];
    const { rows } = await db.query(query, values);

    res.json({
      scanId: rows[0].id,
      content: content,
      plagiarism: plagiarismResult,
      aiDetection: aiResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.scanFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, 'utf8');

    const userId = req.user ? req.user.id : null;
    const plagiarismResult = await plagiarismService.checkPlagiarism(content, userId);
    const aiResult = await aiDetectionService.checkAIContent(content);

    const query = `
      INSERT INTO scans (content_type, content_preview, plagiarism_score, ai_score, file_path, user_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `;

    const values = ['file', content.substring(0, 2000), plagiarismResult.score, aiResult.score, filePath, userId];
    const { rows } = await db.query(query, values);

    res.json({
      scanId: rows[0].id,
      fileName: req.file.originalname,
      content: content,
      plagiarism: plagiarismResult,
      aiDetection: aiResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM scans WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteScan = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting scan with ID:', id, 'for user:', req.user.id);
    await db.query('DELETE FROM scans WHERE id = $1 AND user_id = $2', [parseInt(id), req.user.id]);
    res.json({ success: true, message: 'Scan deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.clearAllHistory = async (req, res) => {
  try {
    await db.query('DELETE FROM scans WHERE user_id = $1', [req.user.id]);
    res.json({ success: true, message: 'All history cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
