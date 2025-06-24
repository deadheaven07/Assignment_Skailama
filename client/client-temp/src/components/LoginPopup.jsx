import React, { useState } from 'react';
import api from '../api/axios';

/**
 * LoginPopup Component
 * A simple email-based login popup that triggers JWT login.
 * Props:
 *   - onLogin: function to update user state on successful login
 */
function LoginPopup({ onLogin }) {
  const [email, setEmail] = useState('');

  /**
   * Handles the login form submission.
   * Sends a POST request to the backend to initiate login and sets the user state.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', { email });
      onLogin(res.data.user); // Call parent state updater
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      border: '1px solid #ccc',
      maxWidth: '400px',
      margin: '5rem auto',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>Login to Ques.AI</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '100%' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPopup;
