import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import secrets from "./config/secrets.js";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(secrets.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to Electrodz Backend API");
});

app.listen(secrets.PORT, () => {
  console.log(`🚀 Server running on port ${secrets.PORT}`);
});