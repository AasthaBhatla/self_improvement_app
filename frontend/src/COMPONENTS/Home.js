import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home({ token }) {
  const [behaviors, setBehaviors] = useState([]);

  useEffect(() => {
    const fetchBehaviors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/behaviors', {
            headers: { Authorization: `Bearer ${token}` }
          });          
        setBehaviors(res.data);
      } catch (err) {
        console.error('Error fetching behaviors:', err);
      }
    };

    fetchBehaviors();
  }, [token]);

  return (
    <div>
      <h2>Top 5 Behaviors</h2>
      <ul>
        {behaviors.map((b) => (
          <li key={b._id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
