import jwt from 'jsonwebtoken';
import User from '../models/User';
import connectDB from '../lib/mongodb';

export default async function handler(req, res) {
  await connectDB();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(decoded.userId);
        res.status(200).json(user.enrolledCourses);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { courseId } = req.query;
        const user = await User.findById(decoded.userId);
        user.enrolledCourses = user.enrolledCourses.filter(
          course => course.courseId !== courseId
        );
        await user.save();
        res.status(200).json({ message: 'Enrollment removed successfully' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}