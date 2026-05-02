import { useEffect, useState } from "react";
import { getAppointments, createAppointment, deleteAppointment, updateAppointment } from "../services/api";

const empty = { patientName: "", doctorName: "", date: "", time: "", reason: "", status: "Scheduled" };

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(empty);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () => getAppointments().then(r => setAppointments(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await createAppointment(form);
      setSuccess("Appointment scheduled");
      setForm(empty);
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    await deleteAppointment(id);
    load();
  };

  const handleStatus = async (id, status) => {
    await updateAppointment(id, { status });
    load();
  };

  const statusBadge = (s) => {
    if (s === "Scheduled") return "badge-blue";
    if (s === "Completed") return "badge-green";
    return "badge-red";
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Appointments</h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Schedule</button>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: "center", color: "#718096", padding: "20px" }}>No appointments found</td></tr>
                )}
                {appointments.map(a => (
                  <tr key={a._id}>
                    <td>{a.patientName}</td>
                    <td>{a.doctorName}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.reason || "-"}</td>
                    <td><span className={`badge ${statusBadge(a.status)}`}>{a.status}</span></td>
                    <td style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {a.status === "Scheduled" && (
                        <button className="btn btn-success btn-sm" onClick={() => handleStatus(a._id, "Completed")}>Done</button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Schedule Appointment</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input required value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Doctor Name</label>
                  <input required value={form.doctorName} onChange={e => setForm({ ...form, doctorName: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Reason</label>
                <input value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Optional" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" style={{ background: "#e2e8f0" }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
