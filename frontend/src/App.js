import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './COMPONENTS/Login';
import Home from './COMPONENTS/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login setToken={(t) => {
          localStorage.setItem('token', t);
          setToken(t);
        }} />} />
        <Route exact path="/home" element={<Home token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
