import React, { useState } from "react";

const CourseForm = ({ onSave }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", courseName);
    formData.append("description", courseDescription);
    if (courseImage) {
      formData.append("image", courseImage);
    }
    onSave(formData);
  };

  const handleImageChange = (event) => {
    setCourseImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="courseName">Course Name:</label>
        <input
          id="courseName"
          name="courseName"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="courseDescription">Course Description:</label>
        <textarea
          id="courseDescription"
          name="courseDescription"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="courseImage">Course Image:</label>
        <input
          type="file"
          id="courseImage"
          name="courseImage"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <button type="submit">Save Course</button>
    </form>
  );
};

export default CourseForm;
