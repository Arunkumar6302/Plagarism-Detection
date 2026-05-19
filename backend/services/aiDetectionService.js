const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '../datasets/ai_patterns.json');
let dataset;
try {
  dataset = JSON.parse(fs.readFileSync(patternsPath, 'utf8'));
} catch (err) {
  dataset = { aiComments: [], humanComments: [], aiStructure: [], humanStructure: [], humanVariables: [] };
}

function calculateTextStats(content) {
  const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  if (lines.length === 0) return { stdDev: 0, vocabRichness: 0, totalLines: 0 };

  const lineLengths = lines.map(l => l.length);
  const avgLength = lineLengths.reduce((a, b) => a + b, 0) / lineLengths.length;
  const variance = lineLengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lineLengths.length;
  const stdDev = Math.sqrt(variance);

  const words = content.match(/\b\w+\b/g) || [];
  const uniqueWords = new Set(words);
  const vocabRichness = words.length > 0 ? (uniqueWords.size / words.length) : 0;

  return { stdDev, vocabRichness, totalLines: lines.length };
}

exports.checkAIContent = async (content) => {
  if (!content || content.length < 20) {
    return { score: 0, label: 'Too short to determine', confidence: 'Low' };
  }

  let aiScore = 0;
  let humanScore = 0;

  const evaluatePatterns = (patterns, isAi) => {
    if (!patterns) return;
    patterns.forEach(item => {
      try {
        const regex = new RegExp(item.pattern, item.flags);
        const matches = content.match(regex);
        if (matches) {
          const scoreToAdd = Math.min(item.weight * matches.length, item.weight * 5);
          if (isAi) aiScore += scoreToAdd;
          else humanScore += scoreToAdd;
        }
      } catch (e) {}
    });
  };

  evaluatePatterns(dataset.aiComments, true);
  evaluatePatterns(dataset.humanComments, false);
  evaluatePatterns(dataset.aiStructure, true);
  evaluatePatterns(dataset.humanStructure, false);
  evaluatePatterns(dataset.humanVariables, false);

  const stats = calculateTextStats(content);
  
  if (stats.totalLines > 5) {
    if (stats.stdDev < 15) aiScore += 15; 
    if (stats.stdDev > 35) humanScore += 15; 
  }

  if (stats.vocabRichness > 0.6) humanScore += 20; 
  if (stats.vocabRichness < 0.3) aiScore += 20;

  let finalScore = 40 + aiScore - humanScore;
  
  const minimumFloor = Math.floor(Math.random() * 8) + 4; 
  finalScore = Math.max(minimumFloor, Math.min(100, finalScore));

  let label = 'Neutral / Mixed';
  if (finalScore >= 80) label = 'Highly Likely AI Generated';
  else if (finalScore >= 60) label = 'Likely AI Generated';
  else if (finalScore <= 20) label = 'Highly Likely Human Written';
  else if (finalScore <= 40) label = 'Likely Human Written';

  return {
    score: Math.round(finalScore),
    label: label,
    confidence: stats.totalLines > 10 ? 'High' : 'Medium'
  };
};
