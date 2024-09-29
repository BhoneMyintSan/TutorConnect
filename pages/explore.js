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

export default function Explore() {
  const [message, setMessage] = useState(''); // State to manage messages (success/error)
  const [loading, setLoading] = useState(false); // Loading state
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State to track enrolled courses
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/courses`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enroll`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enroll/${courseId}`, {
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

  return (
    <Layout>
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast container for notifications */}
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Careers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              onEnroll={enrollCourse}
              onUnenroll={unenrollCourse}
              loading={loading}
              isEnrolled={enrolledCourses.includes(course.id)} // Check if the course is enrolled
            />
          ))}
        </div>
      </section>
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
            className="mt-2 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Processing...' : 'Unenroll'}
          </button>
        ) : (
          <button
            onClick={handleEnrollClick} // Open the modal when Enroll is clicked
            className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
        <button
          onClick={closeModal}
          className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
}
