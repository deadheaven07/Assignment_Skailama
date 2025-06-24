import React, { useState } from "react";

const CreateProjectModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      setError("Project Name Can't be empty");
      return;
    }
    onCreate(name);
    setName("");
    setError("");
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(60,0,120,0.15)",
        padding: "2.5rem 2.5rem 2rem 2.5rem",
        minWidth: 420,
        maxWidth: "90vw",
        width: 500,
        position: "relative"
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 18 }}>Create Project</h2>
        <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Enter Project Name:</div>
        <input
          value={name}
          onChange={e => { setName(e.target.value); setError(""); }}
          placeholder="Type here"
          style={{
            width: "100%",
            padding: "16px 14px",
            borderRadius: 10,
            border: "1.5px solid #e5e7eb",
            fontSize: 18,
            marginBottom: 8,
            background: '#fafaff',
            outline: 'none',
            boxSizing: 'border-box',
            fontWeight: 400
          }}
        />
        {error && <div style={{ color: "#e11d48", fontSize: 15, marginBottom: 8 }}>{error}</div>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 18 }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              color: "#e11d48",
              border: "none",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              padding: "10px 18px",
              borderRadius: 8
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            style={{
              background: "#8F2FFF",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              padding: "10px 28px",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(143,47,255,0.08)"
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
