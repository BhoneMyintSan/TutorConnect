// pages/explore.js
import Layout from '../components/Layout';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
import Modal from 'react-modal'; // For modal dialogs

// Example array of courses
const courses = [
  { id: "course1", title: "Business Management", description: "Learn essential business management techniques that will propel your career forward.", image: "/images/business.jpg", averageSalary: "$85,000 - $120,000", requiredSkills: "Leadership, Strategic Planning, Financial Analysis" },
  { id: "course2", title: "Digital Marketing", description: "Master digital marketing strategies to enhance your business visibility and engagement.", image: "/images/marketing.jpeg", averageSalary: "$65,000 - $95,000", requiredSkills: "SEO, Social Media Marketing, Analytics" },
  { id: "course3", title: "Computer Science", description: "Explore foundational and advanced computer science topics to build and enhance your programming skills.", image: "/images/compsci.jpeg", averageSalary: "$90,000 - $140,000", requiredSkills: "Programming, Algorithms, Data Structures" },
  { id: "course4", title: "Graphic Design", description: "Develop your artistic and technical design skills with modern graphic design tools and concepts.", image: "/images/design.jpg", averageSalary: "$55,000 - $80,000", requiredSkills: "Adobe Creative Suite, Typography, Color Theory" },
  { id: "course5", title: "Data Science", description: "Dive into data analysis, machine learning, and statistical modeling to become a data science expert.", image: "/images/datascience.jpg", averageSalary: "$95,000 - $130,000", requiredSkills: "Python, R, Machine Learning, Statistics" },
  { id: "course6", title: "Finance", description: "Understand financial principles and practices to excel in personal and corporate finance.", image: "/images/finance.gif", averageSalary: "$70,000 - $110,000", requiredSkills: "Financial Analysis, Risk Management, Accounting" },
  { id: "course7", title: "Project Management", description: "Learn how to efficiently manage projects across various industries to ensure successful outcomes.", image: "/images/projectmgmt.jpg", averageSalary: "$75,000 - $105,000", requiredSkills: "Agile, Scrum, Risk Assessment, Communication" },
  { id: "course8", title: "Cyber Security", description: "Secure digital assets and learn about the latest in cyber security measures and threats.", image: "/images/cybersecurity.jpeg", averageSalary: "$90,000 - $125,000", requiredSkills: "Network Security, Ethical Hacking, Cryptography" },
  { id: "course9", title: "Web Development", description: "Develop skills to build dynamic and responsive websites using current web technologies.", image: "/images/webdev.gif", averageSalary: "$75,000 - $105,000", requiredSkills: "HTML, CSS, JavaScript, React, Node.js" },
  { id: "course10", title: "Artificial Intelligence", description: "Engage with AI concepts, from machine learning algorithms to neural networks, to innovate and implement AI solutions.", image: "/images/ai.gif", averageSalary: "$100,000 - $150,000", requiredSkills: "Machine Learning, Deep Learning, Python, TensorFlow" }
];

export default function Explore() {
  const [message, setMessage] = useState(''); // State to manage messages (success/error)
  const [loading, setLoading] = useState(false); // Loading state
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State to track enrolled courses
  const [searchQuery, setSearchQuery] = useState(''); // Add this line for search functionality
  const [selectedCareer, setSelectedCareer] = useState(null);
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch enrolled courses.');

        const data = await response.json();
        setEnrolledCourses(data.enrolledCourses.map(course => course.courseId));
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const enrollCourse = async (courseId, title) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please log in to enroll in a course.'); // Use toast for notifications
      router.push('/signin'); // Redirect to sign-in page
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId, title }) // Send title in the request body
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Successfully enrolled in ${title}`); // Show success message
        setEnrolledCourses(prev => [...prev, courseId]); // Update enrolled courses
      } else {
        toast.error(data.message || 'Failed to enroll in course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Error enrolling in course.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  const unenrollCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please log in to unenroll from a course.');
      router.push('/signin');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/enroll?courseId=${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully unenrolled from the course.');
        setEnrolledCourses(prev => prev.filter(id => id !== courseId)); // Update enrolled courses
      } else {
        toast.error(data.message || 'Failed to unenroll from course.');
      }
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      toast.error('Error unenrolling from course.');
    } finally {
      setLoading(false);
    }
  };

  const handleLearnMore = (course) => {
    setSelectedCareer(course);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 pb-8">
        {/* Hero Section */}
        <section className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Explore Career Opportunities
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover various career paths and find the perfect mentor to guide you through your journey
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search careers or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                />
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Career Categories */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Popular Career Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                      unoptimized={course.image.endsWith('.gif')}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Average Salary: {course.averageSalary}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Required Skills: {course.requiredSkills}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLearnMore(course)}
                      className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Details Modal */}
        {selectedCareer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedCareer.title}
                  </h3>
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="prose prose-indigo max-w-none text-gray-600">
                  <p>{selectedCareer.description}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">Required Skills</h4>
                  <p>{selectedCareer.requiredSkills}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">Average Salary</h4>
                  <p>{selectedCareer.averageSalary}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function CourseCard({ course, onEnroll, onUnenroll, loading, isEnrolled }) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle course details
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Handle modal open
  const handleEnrollClick = () => {
    setShowModal(true);
  };

  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <Image
        src={course.image}
        alt={course.title}
        width={320}
        height={200}
        className="w-full"
        unoptimized={course.image.endsWith('.gif')} // Add unoptimized property for GIFs
        style={{ objectFit: 'cover' }} // Ensure image is properly scaled
      />
      <div className="p-4">
        <h5 className="text-xl font-semibold">{course.title}</h5>
        <p className={`text-gray-600 ${isOpen ? 'block' : 'line-clamp-3'}`}>{course.description}</p>
        <div className="mt-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
          >
            {isOpen ? 'Less Details' : 'More Details'}
          </button>
        </div>
        {isEnrolled ? (
          <button
            onClick={() => onUnenroll(course.id)} // Unenroll button for enrolled courses
            className="mt-2 w-full bg-destructive hover:bg-destructive/90 text-white font-bold py-2 px-4 rounded"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Processing...' : 'Unenroll'}
          </button>
        ) : (
          <button
            onClick={handleEnrollClick} // Open the modal when Enroll is clicked
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Processing...' : 'Enroll'}
          </button>
        )}
      </div>

      {/* Modal for enrollment confirmation */}
      <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Enroll Confirmation">
        <h2 className="text-2xl font-bold">Confirm Enrollment</h2>
        <p>Are you sure you want to enroll in {course.title}?</p>
        <button
          onClick={() => { onEnroll(course.id, course.title); closeModal(); }} // Enroll and close modal
          className="mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
        <button
          onClick={closeModal}
          className="mt-4 ml-4 bg-muted hover:bg-muted/90 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
}
