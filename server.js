const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shree_edu';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');
const doubtRoutes = require('./routes/doubts');

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Shree Edu Backend is running 🚀",
        status: "success"
    });
});

// Use Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', noteRoutes);
app.use('/api', doubtRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
