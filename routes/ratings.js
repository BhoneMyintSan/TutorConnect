const express = require('express');
const Rating = require('../models/Rating');

const router = express.Router();

// Create a new rating
router.post('/ratings', async (req, res) => {
  const { name, email, rating, comment } = req.body;
  try {
    const newRating = new Rating({ name, email, rating, comment });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating' });
  }
});

// Get all ratings
router.get('/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings' });
  }
});

// Delete a rating
router.delete('/ratings/:id', async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rating' });
  }
});

module.exports = router;
