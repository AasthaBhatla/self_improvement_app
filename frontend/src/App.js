import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './COMPONENTS/Login';
import Register from './COMPONENTS/Register';
import Home from './COMPONENTS/Home';
import BehaviorDetail from './COMPONENTS/BehaviorDetail';
import Navbar from './COMPONENTS/Navbar'; // Import your new Navbar
import './App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = !darkMode ? 'dark-mode' : 'light-mode';
  };

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} darkMode={darkMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/home" /> : (
              <Login setToken={(t) => {
                localStorage.setItem('token', t);
                setToken(t);
              }} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={token ? <Home token={token} /> : <Navigate to="/" />} />
        <Route path="/behavior/:id" element={token ? <BehaviorDetail token={token} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
