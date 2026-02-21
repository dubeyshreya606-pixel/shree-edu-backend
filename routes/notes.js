const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get Notes for a User
router.get('/notes', async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: "Username required" });

    try {
        const notes = await Note.find({ username }).sort({ createdDate: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes" });
    }
});

// Create Note
router.post('/notes', async (req, res) => {
    const { username, title, content } = req.body;
    if (!username || !content) return res.status(400).json({ message: "Username and Content required" });

    try {
        const newNote = new Note({ username, title, content });
        await newNote.save();
        res.json(newNote);
    } catch (err) {
        res.status(500).json({ message: "Error saving note" });
    }
});

// Delete Note
router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Error deleting note" });
    }
});

// Update Note
router.put('/notes/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } // Return the updated document
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: "Error updating note" });
    }
});

module.exports = router;
