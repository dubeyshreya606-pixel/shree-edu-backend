const express = require('express');
const router = express.Router();
const UserLog = require('../models/UserLog');

// Get All User Logs (For Admin)
router.get('/users', async (req, res) => {
    try {
        const logs = await UserLog.find().sort({ loginTime: -1 }); // Newest first
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user logs" });
    }
});

module.exports = router;
