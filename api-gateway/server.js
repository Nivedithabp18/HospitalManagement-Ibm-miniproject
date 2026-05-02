const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/gatewayConfig");
const registerRoutes = require("./routes/gatewayRoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());
app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running", port: config.port });
});

// Register proxy routes
registerRoutes(app);

app.listen(config.port, () => {
  console.log(`API Gateway running on port ${config.port}`);
});