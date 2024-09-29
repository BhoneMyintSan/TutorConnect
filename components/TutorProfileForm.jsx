// components/TutorProfileForm.js

const TutorProfileForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your logic to submit the form data to your backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create/Update Your Tutor Profile</h3>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="subject">Subject:</label>
      <input type="text" id="subject" name="subject" required />

      <label htmlFor="bio">Biography:</label>
      <textarea id="bio" name="bio" required></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TutorProfileForm;
