import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Protected() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:3001/api/protected', config);
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch protected data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

return (
  <div className="protected-container">
    <h2>Protected Route</h2>
    {userData ? (
      <div>
        <p>Welcome, {userData.user.username}!</p>
        <p>{userData.message}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
    <button
      className="logout-button"
      onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}
    >
      Log Out
    </button>
  </div>
);
}