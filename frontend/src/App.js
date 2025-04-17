import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <div className="nav-links">
            
          </div>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route 
            path="/login" 
            element={
              token ? (
                <Navigate to="/protected" />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />
          <Route 
            path="/protected" 
            element={
              token ? (
                <Protected token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;