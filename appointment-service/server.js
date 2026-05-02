require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const PORT = process.env.PORT || 5003;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "Appointment Service running" }));
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => console.log(`Appointment Service running on port ${PORT}`));
