const express = require("express");
const router = express.Router();
const ListItem = require("../models/ListItem");

router.get("/lists/:agentId", async (req, res) => {
  const { agentId } = req.params;
  try {
    const items = await ListItem.find({ agent: agentId });
    res.json(items);
  } catch (err) {
    res.status(500).send("Error fetching list items");
  }
});

module.exports = router;