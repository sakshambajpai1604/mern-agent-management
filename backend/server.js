const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const agentRoutes = require("./routes/agentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const listRoutes = require("./routes/listRoutes");

app.use("/api", authRoutes);
app.use("/api", agentRoutes);
app.use("/api", uploadRoutes);
app.use("/api", listRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));