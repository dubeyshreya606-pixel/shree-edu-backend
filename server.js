const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// Note: Ensure MongoDB is running locally. Use 'localhost' or '127.0.0.1'
mongoose.connect('mongodb://127.0.0.1:27017/shree_edu').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');
const doubtRoutes = require('./routes/doubts');

// Use Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', noteRoutes);
app.use('/api', doubtRoutes);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Verify connectivity from other devices using your IP: http://10.245.185.118:${PORT}`);
});
