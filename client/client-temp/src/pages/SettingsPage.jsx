import React from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const SettingsPage = ({ setUser }) => {
  // Placeholder user data (should be passed as prop or from context in real app)
  const user = {
    email: "user@example.com",
  };

  const handleLogout = async () => {
    // Call backend to clear cookie (if you have a logout endpoint)
    try {
      await api.post("/auth/logout"); // Optional: implement this in backend if needed
    } catch (err) {}
    setUser(null); // This will show the login popup
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 240, width: "100%", padding: "2rem" }}>
        <h2 style={{ color: "#7c3aed", fontWeight: 700, fontSize: "2rem", marginBottom: 24 }}>Settings</h2>
        <div style={{ background: "#fff", borderRadius: 12, padding: "2rem", maxWidth: 400, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", color: "#888", marginBottom: 8 }}>Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #eee", background: "#f8f8fa" }}
            />
          </div>
          <button
            onClick={handleLogout}
            style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, padding: "0.75rem 2rem", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}
          >
            Logout
          </button>
          <div style={{ marginTop: 32, color: "#aaa", fontSize: "0.9rem" }}>
            More settings coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 