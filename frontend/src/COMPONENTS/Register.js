// src/COMPONENTS/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; // Ensure your styles are imported

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      const msg =
       err.response?.data?.error || // show backend error message
        err.response?.data?.msg ||   // fallback to generic msg
        'Registration failed. Please try again.';
        alert(msg);
      }
    };

  return (
    <>
      <div className="header">REGISTER</div>
      <div className="page-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button className="red-button" type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </>
  );
}

export default Register;
