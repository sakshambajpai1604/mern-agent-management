const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create agent
exports.createAgent = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new User({ name, email, password: hashedPassword, role: 'agent', mobile });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' }).select('-password');
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update agent by ID
exports.updateAgent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const agent = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'agent' },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete agent by ID
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await User.findOneAndDelete({ _id: req.params.id, role: 'agent' });
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json({ message: 'Agent deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};