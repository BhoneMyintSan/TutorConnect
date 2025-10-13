// pages/index.js
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles

export default function Home() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch user data and enrolled courses
  useEffect(() => {
    const fetchData = async () => {
      // Fetch courses
      try {
        const coursesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`);
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }

      // Fetch user data
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setLoading(false);
        return; // If no token, do nothing
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user data from API response
          setEnrolledCourses(data.enrolledCourses || []); // Set enrolled courses
        } else {
          localStorage.removeItem('token'); // Remove invalid token
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {user ? `Welcome back, ${user.firstName}!` : 'Launch Your New Career'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Professional Certificates offer flexible, online training designed to get you job-ready for high-growth fields.
          </p>
          <Link href="/explore">
            <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
              Explore Careers
            </button>
          </Link>
        </div>
      </section>

      {/* Enrolled Courses Section */}
      {user && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Your Enrolled Courses
            </h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course, index) => {
                  const courseDetails = courses.find(c => c.id === course.courseId);
                  return courseDetails && (
                    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <CourseCard course={courseDetails} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center bg-white rounded-2xl shadow-md p-8">
                <p className="text-gray-600 text-lg mb-4">
                  You are not enrolled in any courses yet. Explore and enroll now!
                </p>
                <Link href="/explore">
                  <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg">
                    Browse Courses
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Available Courses Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Available Courses
          </h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-12"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Layout>
  );
}

function CourseCard({ course }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
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
        <p className={`text-gray-600 ${isOpen ? '' : 'line-clamp-3'}`}>
          {course.description}
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 flex items-center gap-1"
        >
          {isOpen ? 'Show Less' : 'Read More'}
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
