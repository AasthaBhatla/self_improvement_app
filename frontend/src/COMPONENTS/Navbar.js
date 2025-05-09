import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ token, setToken, darkMode, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-brand">Self Improve</Link>
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        {token ? (
          <button className="navbar-link" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="navbar-link" to="/">Login</Link>
            <Link className="navbar-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
