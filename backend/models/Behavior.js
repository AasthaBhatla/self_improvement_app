const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, { _id: true });

const BehaviorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  todos: [TodoSchema]
});

module.exports = mongoose.model('Behavior', BehaviorSchema);
