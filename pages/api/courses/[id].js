import Course from '../../../models/Course';
import connectDB from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const course = await Course.findOne({ id });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching course' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}