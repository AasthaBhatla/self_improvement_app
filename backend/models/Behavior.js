const mongoose = require('mongoose');

const BehaviorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:{ type: String , required: true},
  todos: [{ type: String }]
});

module.exports = mongoose.model('Behavior', BehaviorSchema);
