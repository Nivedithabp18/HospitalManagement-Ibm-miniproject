const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/gatewayConfig");

module.exports = (app) => {
  app.use("/api/users", createProxyMiddleware({
    target: config.services.user,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: "User service unavailable" });
      }
    }
  }));

  app.use("/api/patients", createProxyMiddleware({
    target: config.services.patient,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: "Patient service unavailable" });
      }
    }
  }));

  app.use("/api/appointments", createProxyMiddleware({
    target: config.services.appointment,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: "Appointment service unavailable" });
      }
    }
  }));

  app.use("/api/notifications", createProxyMiddleware({
    target: config.services.notification,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: "Notification service unavailable" });
      }
    }
  }));
};