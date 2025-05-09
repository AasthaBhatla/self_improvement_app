import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMoon, FaSun } from 'react-icons/fa';
import '../App';

function Home({ token }) {
  const [behaviors, setBehaviors] = useState([]);
  const [newBehavior, setNewBehavior] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchBehaviors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/behaviors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBehaviors(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch behaviors.');
    }
  };

  const addBehavior = async () => {
    try {
      await axios.post('http://localhost:5000/api/behaviors', {
        name: newBehavior
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewBehavior('');
      fetchBehaviors();
    } catch (err) {
      alert('Could not add behavior.');
    }
  };

  const deleteBehavior = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/behaviors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBehaviors();
    } catch (err) {
      alert('Failed to delete behavior.');
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = !darkMode ? 'dark-mode' : 'light-mode';
  };

  useEffect(() => {
    fetchBehaviors();
    // Set initial theme
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <div className="page-container">
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button className="red-button" onClick={toggleTheme}>
          {darkMode ? <><FaSun /> Light Mode</> : <><FaMoon /> Dark Mode</>}
        </button>
      </div>

      <h2>Your Top 5 Behaviors</h2>
      <div className="grid-container">
        {behaviors.map((b) => (
          <div key={b._id} className="behavior-card">
            <Link to={`/behavior/${b._id}`}>{b.name}</Link>
            <p>{b.todos.length} items</p>
            <button className="red-button" onClick={() => deleteBehavior(b._id)}>
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>

      <h3>Add New Behavior</h3>
      <input
        className="input-field"
        type="text"
        value={newBehavior}
        onChange={(e) => setNewBehavior(e.target.value)}
        placeholder="Behavior name"
      />
      <button className="red-button" onClick={addBehavior}>
        <FaPlus /> Add
      </button>
    </div>
  );
}

export default Home;

