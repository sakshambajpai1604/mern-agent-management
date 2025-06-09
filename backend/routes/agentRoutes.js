const express = require('express');
const {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent
} = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// All agent CRUD endpoints under "/"
router.post('/', protect, createAgent);         // Create agent
router.get('/', protect, getAgents);            // Get all agents
router.get('/:id', protect, getAgentById);      // Get single agent by ID
router.put('/:id', protect, updateAgent);       // Update agent by ID
router.delete('/:id', protect, deleteAgent);    // Delete agent by ID

module.exports = router;