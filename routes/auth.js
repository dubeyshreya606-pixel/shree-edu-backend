const express = require('express');
const router = express.Router();
const UserLog = require('../models/UserLog');
const User = require('../models/User');

// Admin Credentials
const ADMIN_EMAIL = "dubeyshreya606@gmail.com";
const ADMIN_PASS = "261126";

// Login Endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.password !== password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Log User Login
        const log = new UserLog({ username: username });
        await log.save();

        return res.json({
            success: true,
            role: user.role,
            message: "Login successful"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// Register Endpoint
router.post('/register', async (req, res) => {
    console.log("Register Request Received:", req.body); // Debug Log
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: "Username already taken" });
        }

        let role = 'user';
        if (username === ADMIN_EMAIL) {
            if (password === ADMIN_PASS) {
                role = 'admin';
            } else {
                return res.json({ success: false, message: "Invalid password for Admin account" });
            }
        }

        const newUser = new User({
            username,
            password,
            role: role
        });

        await newUser.save();

        return res.json({ success: true, message: "Registration successful" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
