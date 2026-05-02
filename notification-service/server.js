require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sendNotification } = require("./services/notificationService");

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "Notification Service running" }));

app.post("/api/notifications/send", (req, res) => {
  const { type, message, recipient } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required" });
  const log = sendNotification({ type: type || "INFO", message, recipient: recipient || "system" });
  res.status(201).json({ success: true, notification: log });
});

app.get("/api/notifications", (req, res) => {
  res.json({ message: "Notification Service is active. Logs are printed to console." });
});

app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
