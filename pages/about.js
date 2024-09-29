// pages/about.js
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const About = () => {
  const [profiles, setProfiles] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    setLoading(true);
    setTimeout(() => { // Simulate an API call
      setProfiles([...profiles, data]);
      reset(); // Reset form after submission
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="about-container max-w-7xl mx-auto p-6 bg-gradient-to-r from-blue-100 to-white text-gray-800">
        <section className="hero text-center">
          <h1 className="text-4xl font-bold text-blue-900">Empowering Your Educational Journey Through Expert Guidance</h1>
        </section>

        <section className="mission mt-6">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p>At Tutor Connect, we are dedicated to bridging the gap between students and professional tutors...</p>
          <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Show Less' : 'Show More'}
          </button>
          {showDetails && <p>More detailed text about the mission...</p>}
        </section>

        <section className="vision mt-6">
          <h2 className="text-3xl font-semibold">Our Vision</h2>
          <p>To become the leading online platform for quality education by fostering a community...</p>
        </section>

        <section className="features mt-6">
          <h2 className="text-3xl font-semibold">Features and Services</h2>
          <ul className="list-disc list-inside">
            <li>Explore a wide range of subjects with tutors who are experts in their fields.</li>
          </ul>
        </section>

        <section className="form-section mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <h3 className="text-xl font-semibold">Create Tutor Profile</h3>
            <input {...register("name")} placeholder="Name" className="input-field" />
            <input {...register("subject")} placeholder="Subject" className="input-field" />
            <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Creating...' : 'Create Profile'}</button>
          </form>
          <div>
            {loading ? <div className="loading-spinner"></div> : profiles.map((profile, index) => (
              <div key={index} className="profile-card">
                <p>Name: {profile.name}</p>
                <p>Subject: {profile.subject}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer with Go Back to Home Page link */}
        <footer className="text-center py-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700 text-lg font-semibold">Go Back to Home Page</Link>
        </footer>

        <style jsx>{`
          .about-container h1, h2 {
            transition: color 0.3s;
          }
          .about-container h1:hover, h2:hover {
            color: #0070f3;
          }
          .input-field, .submit-button {
            display: block;
            margin-top: 8px;
            width: 100%;
            padding: 8px;
          }
          .submit-button {
            background-color: #0070f3;
            color: white;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
          }
          .submit-button:hover, .submit-button:disabled {
            background-color: #0056b3;
            transform: scale(1.05);
          }
          .submit-button:disabled {
            cursor: default;
            opacity: 0.5;
          }
          .profile-card {
            border: 1px solid #ccc;
            padding: 8px;
            margin-top: 8px;
          }
          .loading-spinner {
            border: 4px solid #f3f3f3; /* Light grey */
            border-top: 4px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default About;
