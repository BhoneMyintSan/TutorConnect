const express = require('express');
const TutorProfile = require('../models/TutorProfile');

const router = express.Router();

// Create a new tutor profile
router.post('/tutors', async (req, res) => {
  const { name, subject } = req.body;
  try {
    const newTutor = new TutorProfile({ name, subject });
    await newTutor.save();
    res.status(201).json(newTutor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tutor profile' });
  }
});

// Get all tutor profiles
router.get('/tutors', async (req, res) => {
  try {
    const tutors = await TutorProfile.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutor profiles' });
  }
});

module.exports = router;
