const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
require('dotenv').config();

const router = express.Router();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is defined in your .env file

// User registration route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      enrolledCourses: [], // Initialize enrolled courses as an empty array
    });

    await newUser.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Error registering user' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, firstName: user.firstName },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to authenticate user using JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided, authorization denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });
    req.user = user; // Store user information in request
    next();
  });
};

// Protected route to get user information
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll a user in a course
router.post('/enroll', authenticateToken, async (req, res) => {
  const { courseId, title } = req.body; // Ensure courseId and title are sent in the request body

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already enrolled in the course
    const existingCourse = user.enrolledCourses.find(course => course.courseId === courseId);
    if (existingCourse) {
      return res.status(400).json({ message: 'User already enrolled in this course' });
    }

    // Enroll the user in the course
    user.enrolledCourses.push({ courseId, title });
    await user.save();

    res.json({ message: 'Course enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Unenroll a user from a course
router.post('/unenroll', authenticateToken, async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the course in the user's enrolled courses array
    const courseIndex = user.enrolledCourses.findIndex(course => course.courseId === courseId);

    if (courseIndex === -1) {
      return res.status(400).json({ message: 'User is not enrolled in this course' });
    }

    // Remove the course from the user's enrolled courses array
    user.enrolledCourses.splice(courseIndex, 1);
    await user.save();

    res.json({ message: 'Course unenrolled successfully' });
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
