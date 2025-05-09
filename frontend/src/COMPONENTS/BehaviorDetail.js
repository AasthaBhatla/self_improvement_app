import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BehaviorDetail({ token }) {
  const { id } = useParams();
  const [behavior, setBehavior] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [editText, setEditText] = useState({});
  
  const fetchBehavior = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/behaviors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBehavior(res.data);
    } catch (err) {
      alert('Could not fetch behavior');
    }
  };

  const addTodo = async () => {
    try {
      await axios.post(`http://localhost:5000/api/behaviors/${id}/todo`, { text: newTodo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTodo('');
      fetchBehavior();
    } catch (err) {
      alert('Failed to add todo');
    }
  };

  const updateTodo = async (todoId) => {
    try {
      await axios.put(`http://localhost:5000/api/behaviors/${id}/todo/${todoId}`, {
        text: editText[todoId] || ''
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditText({ ...editText, [todoId]: '' });
      fetchBehavior();
    } catch (err) {
      alert('Update failed');
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/behaviors/${id}/todo/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBehavior();
    } catch (err) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchBehavior();
  }, [id]);

  if (!behavior) return <div>Loading...</div>;

  return (
    <div>
      <h2>{behavior.name}</h2>
      <ul>
        {behavior.todos.map(todo => (
          <li key={todo._id}>
            <input
              type="text"
              value={editText[todo._id] || todo.text}
              onChange={(e) => setEditText({ ...editText, [todo._id]: e.target.value })}
            />
            <button onClick={() => updateTodo(todo._id)}>Update</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Improvement Item</h3>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default BehaviorDetail;
