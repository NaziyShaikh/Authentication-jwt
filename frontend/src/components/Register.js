import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/register`, {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      setMessage('Registration successful! Please login.');
      setFormData({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required 
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
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit" className="form-button">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="auth-links">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}