const express = require('express');
const { createAgent, getAgents } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/agents', protect, createAgent);
router.get('/agents', protect, getAgents);

module.exports = router;