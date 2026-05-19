const stringSimilarity = require('string-similarity');
const db = require('../config/db');

exports.checkPlagiarism = async (content, userId = null) => {
  try {
    // We want a fully isolated sandbox per user.
    // The engine should ONLY compare the code against the specific user's own previous search history.
    // It should NEVER compare against other users' code in the database.
    let query = 'SELECT content_preview FROM scans WHERE user_id IS NULL ORDER BY created_at DESC LIMIT 100';
    let params = [];
    
    if (userId) {
      query = 'SELECT content_preview FROM scans WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100';
      params = [userId];
    }

    const { rows } = await db.query(query, params);
    
    if (!rows || rows.length === 0) {
      return { 
        score: 0, 
        status: 'Clean (First scan in database)',
        matchFound: false 
      };
    }

    const targets = rows.map(r => r.content_preview);
    
    const searchContent = content.substring(0, 1000);
    const matches = stringSimilarity.findBestMatch(searchContent, targets);

    const score = Math.round(matches.bestMatch.rating * 100);

    return {
      score: score,
      status: score > 40 ? 'Potential Plagiarism Detected' : 'Clean',
      matchedWith: matches.bestMatch.target.substring(0, 100) + '...',
      matchFound: score > 40
    };
  } catch (error) {
    console.error('Plagiarism check error:', error);
    return { score: 0, status: 'Error during check', error: true };
  }
};
