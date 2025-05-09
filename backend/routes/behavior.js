const express = require('express');
const router = express.Router();
const Behavior = require('../models/behavior');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const getUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(' ')[1]; // Extract the actual token after 'Bearer'

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message); // Optional: log for debug
    res.sendStatus(403);
  }
};


// ➕ Create behavior
router.post('/', getUser, async (req, res) => {
  const { name } = req.body;
  const behavior = new Behavior({ userId: req.user.id, name, todos: [] });
  await behavior.save();
  res.json(behavior);
});

// 📋 Get top 5 behaviors (by todo count)
router.get('/', getUser, async (req, res) => {
  const behaviors = await Behavior.find({ userId: req.user.id });
  const sorted = behaviors.sort((a, b) => b.todos.length - a.todos.length).slice(0, 5);
  res.json(sorted);
});

// 🗂 Get all todos for one behavior
router.get('/:id', getUser, async (req, res) => {
  const behavior = await Behavior.findOne({ _id: req.params.id, userId: req.user.id });
  if (!behavior) return res.sendStatus(404);
  res.json(behavior);
});

// ➕ Add todo
router.post('/:id/todo', getUser, async (req, res) => {
  const { text } = req.body;
  const behavior = await Behavior.findOne({ _id: req.params.id, userId: req.user.id });
  if (!behavior) return res.sendStatus(404);
  behavior.todos.push({ text });
  await behavior.save();
  res.json(behavior);
});

// 📝 Edit todo
router.put('/:id/todo/:todoId', getUser, async (req, res) => {
  const { text } = req.body;
  const behavior = await Behavior.findOne({ _id: req.params.id, userId: req.user.id });
  if (!behavior) return res.sendStatus(404);

  const todo = behavior.todos.id(req.params.todoId);
  if (!todo) return res.sendStatus(404);

  todo.text = text;
  await behavior.save();
  res.json(behavior);
});

// ❌ Delete todo
router.delete('/:id/todo/:todoId', getUser, async (req, res) => {
  const behavior = await Behavior.findOne({ _id: req.params.id, userId: req.user.id });
  if (!behavior) return res.sendStatus(404);

  behavior.todos = behavior.todos.filter(t => t._id.toString() !== req.params.todoId);
  await behavior.save();
  res.json(behavior);
});

// ❌ Delete behavior
router.delete('/:id', getUser, async (req, res) => {
  const result = await Behavior.deleteOne({ _id: req.params.id, userId: req.user.id });
  if (result.deletedCount === 0) return res.sendStatus(404);
  res.json({ msg: 'Behavior deleted' });
});

module.exports = router;
