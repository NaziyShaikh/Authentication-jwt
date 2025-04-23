// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';


export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: formData.username,
        password: formData.password
      });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/protected';
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
      {message && <p className="message error-message">{message}</p>}
      <div className="auth-links">
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
}