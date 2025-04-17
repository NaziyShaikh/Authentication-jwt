import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const Login = ({ setToken }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!identifier || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Attempting login with identifier:', identifier);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        identifier,
        password
      });
      
      console.log('Login response:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      
      // Redirect to protected route
      window.location.href = '/protected';
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      console.log('Error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name or Email:</label>
          <input 
            type="text" 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            required 
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="form-links">
        <p>Don't have an account? <a href="/register">Register here</a></p>
        <p>Forgot password? <a href="/forgot-password">Reset here</a></p>
      </div>
    </div>
  );
};

export default Login;