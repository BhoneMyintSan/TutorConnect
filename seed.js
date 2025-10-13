const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const courses = [
  { id: "course1", title: "Business Management", description: "Learn essential business management techniques that will propel your career forward.", image: "/images/business.jpg" },
  { id: "course2", title: "Digital Marketing", description: "Master digital marketing strategies to enhance your business visibility and engagement.", image: "/images/marketing.jpeg" },
  { id: "course3", title: "Computer Science", description: "Explore foundational and advanced computer science topics to build and enhance your programming skills.", image: "/images/compsci.jpeg" },
  { id: "course4", title: "Graphic Design", description: "Develop your artistic and technical design skills with modern graphic design tools and concepts.", image: "/images/design.jpg" },
  { id: "course5", title: "Data Science", description: "Dive into data analysis, machine learning, and statistical modeling to become a data science expert.", image: "/images/datascience.jpg" },
  { id: "course6", title: "Finance", description: "Understand financial principles and practices to excel in personal and corporate finance.", image: "/images/finance.gif" },
  { id: "course7", title: "Project Management", description: "Learn how to efficiently manage projects across various industries to ensure successful outcomes.", image: "/images/projectmgmt.jpg" },
  { id: "course8", title: "Cyber Security", description: "Secure digital assets and learn about the latest in cyber security measures and threats.", image: "/images/cybersecurity.jpeg" },
  { id: "course9", title: "Web Development", description: "Develop skills to build dynamic and responsive websites using current web technologies.", image: "/images/webdev.gif" },
  { id: "course10", title: "Artificial Intelligence", description: "Engage with AI concepts, from machine learning algorithms to neural networks, to innovate and implement AI solutions.", image: "/images/ai.gif" }
];

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Course.deleteMany(); // Clear existing courses
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedCourses();