const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [
    {
      courseId: { type: String, required: true }, // ID of the course
      title: { type: String, required: true }, // Title of the course
      enrolledAt: { type: Date, default: Date.now }, // Date when the user enrolled
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
