const express = require('express');
const { createAgent, getAgents } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, createAgent);
router.get('/', protect, getAgents);

module.exports = router;