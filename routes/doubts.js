const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubt');

// Get All Doubts
router.get('/doubts', async (req, res) => {
    try {
        const doubts = await Doubt.find().sort({ createdDate: -1 });
        res.json(doubts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching doubts" });
    }
});

// Create Doubt
router.post('/doubts', async (req, res) => {
    const { username, question } = req.body;
    try {
        const newDoubt = new Doubt({ username, question });
        await newDoubt.save();
        res.json(newDoubt);
    } catch (err) {
        res.status(500).json({ message: "Error creating doubt" });
    }
});

// Resolve Doubt (Admin)
router.put('/doubts/:id/resolve', async (req, res) => {
    const { adminResponse } = req.body;
    try {
        const updatedDoubt = await Doubt.findByIdAndUpdate(
            req.params.id,
            { adminResponse, isResolved: true },
            { new: true }
        );
        res.json(updatedDoubt);
    } catch (err) {
        res.status(500).json({ message: "Error resolving doubt" });
    }
});

module.exports = router;
