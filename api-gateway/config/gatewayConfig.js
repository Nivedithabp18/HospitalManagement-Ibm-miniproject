require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  services: {
    user: process.env.USER_SERVICE_URL || "http://localhost:5001",
    patient: process.env.PATIENT_SERVICE_URL || "http://localhost:5002",
    appointment: process.env.APPOINTMENT_SERVICE_URL || "http://localhost:5003",
    notification: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5004",
  },
};
