import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Protected.css';

const Protected = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userName = userData?.name || 'Unknown User';

  return (
    <div className="protected-container">
      <div className="protected-header">
        <h1>Welcome to Protected Area</h1>
        <div className="user-info">
          <div className="avatar">
            <span>{userName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h2>{userName}</h2>
            <p>Authenticated User</p>
          </div>
        </div>
      </div>

      <div className="protected-content">
        <div className="protected-message">
          <p>You have successfully accessed the protected area!</p>
          <p>Your session is active and secure.</p>
        </div>
        
        <div className="centered-actions">
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Protected;