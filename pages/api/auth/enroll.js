import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectDB from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectDB();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided, authorization denied' });

  if (req.method === 'POST') {
    const { courseId, title } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ message: 'Course ID and title are required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

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
  } else if (req.method === 'DELETE') {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.enrolledCourses = user.enrolledCourses.filter(course => course.courseId !== courseId);
      await user.save();

      res.json({ message: 'Unenrolled successfully' });
    } catch (error) {
      console.error('Error unenrolling:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}