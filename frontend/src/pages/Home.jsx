import { useEffect, useState } from "react";
import { getPatients, getAppointments } from "../services/api";

export default function Home({ user }) {
  const [patientCount, setPatientCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [scheduled, setScheduled] = useState(0);

  useEffect(() => {
    getPatients().then(r => setPatientCount(r.data.length)).catch(() => {});
    getAppointments().then(r => {
      setAppointmentCount(r.data.length);
      setScheduled(r.data.filter(a => a.status === "Scheduled").length);
    }).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Dashboard</h1>
        <p style={{ color: "#718096", marginBottom: "24px" }}>Welcome, {user?.name} ({user?.role})</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{patientCount}</div>
            <div className="stat-label">Total Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{appointmentCount}</div>
            <div className="stat-label">Total Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{scheduled}</div>
            <div className="stat-label">Scheduled Today</div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px", color: "#2d3748" }}>System Services</h2>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Port</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "API Gateway", port: 5000, role: "Routes all requests" },
                { name: "User Service", port: 5001, role: "Auth & user management" },
                { name: "Patient Service", port: 5002, role: "Patient records" },
                { name: "Appointment Service", port: 5003, role: "Scheduling" },
                { name: "Notification Service", port: 5004, role: "Alerts & logs" },
              ].map(s => (
                <tr key={s.port}>
                  <td>{s.name}</td>
                  <td><span className="badge badge-blue">{s.port}</span></td>
                  <td>{s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
