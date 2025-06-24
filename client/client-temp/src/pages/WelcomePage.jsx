import React, { useState } from "react";
import api from "../api/axios";
import Wave1 from '../images/wave1.png';
import LeftLogo from '../images/leftSide_Logo.svg';
import RightLogo from '../images/right_sideLogo.svg';
import GoogleLogo from '../images/google_Logo.svg';

const WelcomePage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email });
      onLogin(res.data.user);
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* Global style to remove scroll and fit page, and set background color */}
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #fafaff;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
      `}</style>
      <div style={{ display: "flex", height: "100vh", width: "100vw", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
        {/* Left: Purple background, logo, tagline, illustration */}
        <div style={{
          flex: 1,
          position: 'relative',
          background: "linear-gradient(135deg, #C37EFF 0%, #3A0B63 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: 120,
          paddingTop: 60,
          minWidth: 0,
          overflow: 'hidden'
        }}>
          {/* Wave background image */}
          <img
            src={Wave1}
            alt="wave background"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              pointerEvents: 'none',
              userSelect: 'none',
              opacity: 0.95,
              mixBlendMode: 'lighten',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 600, marginTop: 40 }}>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 56, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12, marginLeft: 4 }}>
              <img src={LeftLogo} alt="Ques.AI Logo" style={{ height: 40 }} />
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 32, lineHeight: 1.1, letterSpacing: 0.5, marginLeft: 4 }}>
              Your podcast<br />will no longer<br />be just a hobby.
            </h1>
            <p style={{ fontSize: 20, marginBottom: 0, maxWidth: 420, fontWeight: 400, marginLeft: 4 }}>
              Supercharge Your Distribution<br />using our AI assistant!
            </p>
          </div>
        </div>
        {/* Right: Login form */}
        <div style={{
          flex: 1,
          background: "#fafaff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(60,0,120,0.10)",
            padding: "48px 40px 40px 40px",
            minWidth: 360,
            maxWidth: 492.54,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            position: 'relative',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <img src={RightLogo} alt="Ques.AI Logo" style={{ height: 56, marginBottom: 12 }} />
              <div style={{ fontWeight: 400, fontSize: 24, color: "#7E22CE", marginBottom: 4 }}>Welcome to</div>
              <div style={{ fontWeight: 700, fontSize: 28, color: "#7E22CE" }}>Ques.AI</div>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "18px 16px",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  marginBottom: 18,
                  fontSize: 18,
                  fontWeight: 400,
                  background: '#fafaff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  width: "100%",
                  padding: "18px 16px",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  marginBottom: 18,
                  fontSize: 18,
                  fontWeight: 400,
                  background: '#fafaff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                disabled
              />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, width: '100%' }}>
                <input type="checkbox" style={{ marginRight: 8 }} disabled />
                <span style={{ fontSize: 15, color: '#888' }}>Remember me</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 15, color: '#7E22CE', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
              </div>
              {error && <div style={{ color: "#e11d48", marginBottom: 12 }}>{error}</div>}
              <button
                type="submit"
                style={{
                  width: '100%',
                  maxWidth: 492.54,
                  height: 66.7,
                  background: "#7E22CE",
                  color: "#fff",
                  border: "none",
                  borderRadius: 7.7,
                  padding: 0,
                  fontWeight: 700,
                  fontSize: 24,
                  marginBottom: 28,
                  cursor: "pointer",
                  boxShadow: '0 2px 8px rgba(60,0,120,0.08)',
                  letterSpacing: 0.5
                }}
              >
                Login
              </button>
            </form>
            <div style={{ width: '100%', height: 1, background: '#e5e7eb', margin: '12px 0 18px 0' }} />
            <button
              style={{
                width: "100%",
                background: "#fff",
                color: "#222",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: "14px 0",
                fontWeight: 500,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: 18,
                cursor: "pointer"
              }}
              disabled
            >
              <img src={GoogleLogo} alt="Google" style={{ width: 22, height: 22 }} />
              Continue with Google
            </button>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 15, color: '#222' }}>
              Don't have an account? <span style={{ color: "#7E22CE", cursor: "pointer", fontWeight: 500 }}>Create Account</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage; 