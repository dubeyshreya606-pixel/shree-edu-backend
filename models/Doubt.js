var mongoose = require('mongoose');

var doubtSchema = new mongoose.Schema({
    username: String,
    question: String,
    adminResponse: String,
    isResolved: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doubt', doubtSchema);
