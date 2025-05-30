const csvParser = require('csv-parser');
const Agent = require('../models/Agent');
const DistributedList = require('../models/DistributedList');
const XLSX = require('xlsx');

exports.uploadAndDistribute = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const ext = req.file.originalname.split('.').pop();

    let records = [];

    if (ext === 'csv') {
      const data = fileBuffer.toString('utf8');
      const rows = data.split('\n');
      const headers = rows[0].split(',').map(h => h.trim());
      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(',').map(col => col.trim());
        if (cols.length === headers.length) {
          const item = {
            firstName: cols[0],
            phone: cols[1],
            notes: cols[2] || '',
          };
          records.push(item);
        }
      }
    } else {
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      records = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    const agents = await Agent.find();
    if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });

    // Distribute records
    const distribution = {};
    let idx = 0;
    for (let i = 0; i < records.length; i++) {
      const agent = agents[idx];
      if (!distribution[agent._id]) distribution[agent._id] = [];
      distribution[agent._id].push(records[i]);
      idx = (idx + 1) % agents.length;
    }

    // Save in DB
    await DistributedList.deleteMany(); // clear previous
    const saved = [];
    for (const agentId in distribution) {
      const dist = new DistributedList({
        agent: agentId,
        list: distribution[agentId],
      });
      await dist.save();
      saved.push(dist);
    }

    res.json({ message: 'File uploaded and tasks distributed.', data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDistributedList = async (req, res) => {
  const agentId = req.params.agentId;
  try {
    const result = await DistributedList.findOne({ agent: agentId });
    if (!result) return res.status(404).json({ message: 'No list found for agent' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};