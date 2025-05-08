const express = require('express');
const router = express.Router();
const Behavior = require('./models/Behavior');
const jwt = require('jsonwebtoken');

// Middleware to get user
const getUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

// Add behavior
router.post('/', getUser, async (req, res) => {
  const { name } = req.body;
  const behavior = new Behavior({ userId: req.user.id, name, todos: [] });
  await behavior.save();
  res.json(behavior);
});

// Get top 5 behaviors
router.get('/', getUser, async (req, res) => {
  const behaviors = await Behavior.find({ userId: req.user.id });
  const sorted = behaviors.sort((a, b) => b.todos.length - a.todos.length).slice(0, 5);
  res.json(sorted);
});

// Add todo
router.post('/:id/todo', getUser, async (req, res) => {
  const { text } = req.body;
  const behavior = await Behavior.findOne({ _id: req.params.id, userId: req.user.id });
  behavior.todos.push({ text });
  await behavior.save();
  res.json(behavior);
});

// Delete todo
router.delete('/:id/todo/:todoId', getUser, async (req, res) => {
  const behavior = await Behavior.findOne({ _id: req.params.id, userId: req.user.id });
  behavior.todos = behavior.todos.filter(t => t._id.toString() !== req.params.todoId);
  await behavior.save();
  res.json(behavior);
});

module.exports = router;
