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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <div className="container mx-auto p-6 pb-8 max-w-4xl">
          {/* Contact Information Section */}
          <section className="mb-10 bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">For any inquiries or support, please reach out to us:</p>
              <div className="flex items-center space-x-2 text-gray-700">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">support@tutorconnect.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">+123-456-7890</span>
              </div>
            </div>
          </section>

          {/* Rating Form Section */}
          <section className="mb-10 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-6">Rate Our Services</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 text-foreground placeholder-muted-foreground"
                  list="suggested-names"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 text-foreground placeholder-muted-foreground"
                  list="suggested-emails"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Rating</label>
                <StarRating rating={rating} setRating={setRating} />
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-2">Comment</label>
                <textarea
                  className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 min-h-[100px] text-foreground placeholder-muted-foreground"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-ring transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Submit Rating
              </button>
            </form>
          </section>

          {/* Ratings Dashboard Section */}
          <section className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ratings Dashboard</h2>
            {ratings.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No ratings yet. Be the first to rate our services!</p>
            ) : (
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-800">{rating.name}</h3>
                        <p className="text-gray-600"><strong>Email:</strong> {rating.email}</p>
                        <p className="text-gray-600">
                          <strong>Rating:</strong> 
                          <span className="text-yellow-500 ml-2">
                            {Array(rating.rating).fill('★').join('')}
                          </span>
                        </p>
                        <p className="text-gray-700"><strong>Comment:</strong> {rating.comment}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(rating.id)}
                        className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
