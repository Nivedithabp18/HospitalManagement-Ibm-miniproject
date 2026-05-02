import axios from "axios";

const USER_API = "http://localhost:5001/api";
const PATIENT_API = "http://localhost:5002/api";
const APPOINTMENT_API = "http://localhost:5003/api";
const NOTIFICATION_API = "http://localhost:5004/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth
export const registerUser = (data) => axios.post(`${USER_API}/users/register`, data);
export const loginUser = (data) => axios.post(`${USER_API}/users/login`, data);

// Patients
export const getPatients = () => axios.get(`${PATIENT_API}/patients`, { headers: getAuthHeader() });
export const createPatient = (data) => axios.post(`${PATIENT_API}/patients`, data, { headers: getAuthHeader() });
export const updatePatient = (id, data) => axios.put(`${PATIENT_API}/patients/${id}`, data, { headers: getAuthHeader() });
export const deletePatient = (id) => axios.delete(`${PATIENT_API}/patients/${id}`, { headers: getAuthHeader() });

// Appointments
export const getAppointments = () => axios.get(`${APPOINTMENT_API}/appointments`, { headers: getAuthHeader() });
export const createAppointment = (data) => axios.post(`${APPOINTMENT_API}/appointments`, data, { headers: getAuthHeader() });
export const updateAppointment = (id, data) => axios.put(`${APPOINTMENT_API}/appointments/${id}`, data, { headers: getAuthHeader() });
export const deleteAppointment = (id) => axios.delete(`${APPOINTMENT_API}/appointments/${id}`, { headers: getAuthHeader() });

// Notifications
export const sendNotification = (data) => axios.post(`${NOTIFICATION_API}/notifications/send`, data);