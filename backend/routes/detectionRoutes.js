const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const detectionController = require('../controllers/detectionController');
const fs = require('fs');

const auth = require('../middleware/auth');
const authOptional = require('../middleware/authOptional');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/scan-text', authOptional, detectionController.scanText);
router.post('/upload-file', authOptional, upload.single('file'), detectionController.scanFile);
router.get('/history', auth, detectionController.getHistory);

router.delete('/all', auth, detectionController.clearAllHistory); 
router.delete('/:id', auth, detectionController.deleteScan);

module.exports = router;
