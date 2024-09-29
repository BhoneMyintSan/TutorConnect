// pages/contact.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

// Star Rating Component
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Contact = () => {
  const [ratings, setRatings] = useState([]); // State to manage ratings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0); // Changed to a number type for star rating
  const [comment, setComment] = useState('');

  // Load ratings from local storage when the component mounts
  useEffect(() => {
    const storedRatings = localStorage.getItem('ratings');
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  // Save ratings to local storage whenever the ratings state changes
  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && rating && comment) {
      const newRating = { id: Date.now(), name, email, rating, comment };
      setRatings([...ratings, newRating]); // Add new rating
      setName(''); setEmail(''); setRating(0); setComment(''); // Reset form fields
    }
  };

  // Function to handle deleting a rating
  const handleDelete = (id) => {
    const updatedRatings = ratings.filter((rating) => rating.id !== id);
    setRatings(updatedRatings);
    localStorage.setItem('ratings', JSON.stringify(updatedRatings)); // Update local storage
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* Contact Information Section */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">For any inquiries or support, please reach out to us:</p>
          <p className="mt-2">
            <strong>Email:</strong> support@tutorconnect.com
          </p>
          <p className="mt-1">
            <strong>Phone:</strong> +123-456-7890
          </p>
        </section>

        {/* Rating Form Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Rate Our Services</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                list="suggested-names" // Suggestion list for names
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <datalist id="suggested-names">
                <option value="John Doe" />
                <option value="Jane Smith" />
                <option value="Chris Johnson" />
              </datalist>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                list="suggested-emails" // Suggestion list for emails
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <datalist id="suggested-emails">
                <option value="example@domain.com" />
                <option value="user@domain.com" />
                <option value="admin@domain.com" />
              </datalist>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Rating</label>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Comment</label>
              <textarea
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Submit Rating
            </button>
          </form>
        </section>

        {/* Ratings Dashboard Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Ratings Dashboard</h2>
          {ratings.length === 0 ? (
            <p className="text-gray-600">No ratings yet. Be the first to rate our services!</p>
          ) : (
            <div className="space-y-4">
              {ratings.map((rating) => (
                <div key={rating.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{rating.name}</h3>
                    <p className="text-sm text-gray-700"><strong>Email:</strong> {rating.email}</p>
                    <p className="text-sm text-gray-700">
                      <strong>Rating:</strong> {Array(rating.rating).fill('★').join('')} {/* Display stars based on rating */}
                    </p>
                    <p className="text-sm text-gray-700"><strong>Comment:</strong> {rating.comment}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(rating.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
