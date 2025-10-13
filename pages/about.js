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
      <div className="about-container min-h-screen p-6 pb-8 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="hero text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Empowering Your Educational Journey
              <span className="block text-indigo-700">Through Expert Guidance</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Connect with expert tutors and transform your learning experience
            </p>
          </section>

          <section className="mission bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-800 leading-relaxed">At Tutor Connect, we are dedicated to bridging the gap between students and professional tutors...</p>
            <button 
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Show Less' : 'Show More'}
              <svg className={`w-4 h-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDetails && (
              <p className="mt-4 text-gray-800 animate-fadeIn">More detailed text about the mission...</p>
            )}
          </section>

          <section className="vision mt-6 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
            <p className="text-gray-800">To become the leading online platform for quality education by fostering a community...</p>
          </section>

          <section className="features mt-6 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800">Features and Services</h2>
            <ul className="list-disc list-inside text-gray-800">
              <li>Explore a wide range of subjects with tutors who are experts in their fields.</li>
            </ul>
          </section>

          <section className="form-section bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Create Tutor Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input 
                  {...register("name")} 
                  placeholder="Name" 
                  className="input-field" 
                />
              </div>
              <div>
                <input 
                  {...register("subject")} 
                  placeholder="Subject" 
                  className="input-field" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </span>
                ) : 'Create Profile'}
              </button>
            </form>
            
            <div className="mt-8 space-y-4">
              {profiles.map((profile, index) => (
                <div key={index} className="profile-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{profile.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                      <p className="text-gray-600">{profile.subject}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="text-center py-8">
            <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </footer>

          <style jsx>{`
            .input-field {
              @apply w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-800 placeholder-gray-500;
            }
            .submit-button {
              @apply w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
            }
            .profile-card {
              @apply bg-white p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      </div>
    </Layout>
  );
};

export default About;
