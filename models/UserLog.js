var mongoose = require('mongoose');

var userLogSchema = new mongoose.Schema({
    username: String,
    loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserLog', userLogSchema);
