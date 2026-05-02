require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "Patient Service running" }));
app.use("/api/patients", patientRoutes);

app.listen(PORT, () => console.log(`Patient Service running on port ${PORT}`));
