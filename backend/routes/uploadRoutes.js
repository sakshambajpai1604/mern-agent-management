const express = require('express');
const multer = require('multer');
const {
  uploadAndDistribute,
  getDistributedList,
} = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /csv|xlsx|xls/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('Only CSV, XLSX, and XLS files are allowed!'));
  },
});

router.post('/upload', protect, upload.single('file'), uploadAndDistribute);
router.get('/agent/:agentId', protect, getDistributedList);

module.exports = router;