const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
const authRoutes = require("./routes/authRoutes");
const sharkRoutes = require("./routes/sharkRoutes");
const pitcherRoutes = require("./routes/pitcherRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/shark", sharkRoutes);
app.use("/api/pitcher", pitcherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));