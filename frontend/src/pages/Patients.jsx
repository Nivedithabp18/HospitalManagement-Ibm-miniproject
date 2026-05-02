import { useEffect, useState } from "react";
import { getPatients, createPatient, deletePatient } from "../services/api";

const empty = { name: "", age: "", gender: "Male", phone: "", address: "", bloodGroup: "", diagnosis: "" };

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(empty);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () => getPatients().then(r => setPatients(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await createPatient(form);
      setSuccess("Patient added successfully");
      setForm(empty);
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add patient");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    await deletePatient(id);
    load();
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Patients</h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Patient</button>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Blood Group</th><th>Diagnosis</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: "center", color: "#718096", padding: "20px" }}>No patients found</td></tr>
                )}
                {patients.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.phone}</td>
                    <td>{p.bloodGroup || "-"}</td>
                    <td>{p.diagnosis || "-"}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
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
            <h3 className="modal-title">Add New Patient</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" required value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <input value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })} placeholder="e.g. A+" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Diagnosis</label>
                <input value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" style={{ background: "#e2e8f0" }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
