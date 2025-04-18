import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <div className="nav-links">
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            {token && (
              <button onClick={logout}>Logout</button>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/protected" 
            element={token ? <Protected /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;