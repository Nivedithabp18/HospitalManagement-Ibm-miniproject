import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<PrivateRoute user={user}><Home user={user} /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute user={user}><Patients /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute user={user}><Appointments /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {user && <Footer />}
    </BrowserRouter>
  );
}
