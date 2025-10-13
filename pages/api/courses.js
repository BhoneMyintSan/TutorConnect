import Course from '../../models/Course';
import connectDB from '../../lib/mongodb';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses' });
    }
  } else if (req.method === 'POST') {
    const { id, title, description, image } = req.body;
    try {
      const newCourse = new Course({ id, title, description, image });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: 'Error creating course' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}