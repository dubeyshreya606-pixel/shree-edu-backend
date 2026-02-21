var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  username: String,
  title: String,
  content: String,
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
