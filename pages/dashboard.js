// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('You need to be logged in to access the dashboard');
        router.push('/signin');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            alert('Your session has expired. Please log in again.');
            localStorage.removeItem('token');
            router.push('/signin');
          }
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xl font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      ) : userData ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 pb-8">
          {/* Welcome Section */}
          <section className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-12 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome back, {userData.firstName}!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Continue your learning journey with our personalized courses
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/explore">
                  <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg">
                    Explore Careers
                  </button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-8 py-3 bg-destructive text-destructive-foreground font-semibold rounded-lg hover:bg-destructive/90 focus:ring-4 focus:ring-destructive/20 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </section>

          {/* Enrolled Courses */}
          <section className="py-12 px-6">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Your Enrolled Courses
              </h2>
              {userData.enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userData.enrolledCourses.map((course, index) => {
                    const courseDetails = courses.find(c => c.id === course.courseId);
                    return courseDetails ? (
                      <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48">
                          <Image
                            src={courseDetails.image}
                            alt={courseDetails.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 hover:scale-105"
                            unoptimized={courseDetails.image.endsWith('.gif')}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {courseDetails.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {courseDetails.description}
                          </p>
                          <button className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="text-center bg-white rounded-2xl shadow-md p-8">
                  <p className="text-gray-600 text-lg">
                    You are not enrolled in any courses yet. Explore and enroll now!
                  </p>
                  <Link href="/explore">
                    <button className="mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg">
                      Browse Courses
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Available Courses */}
          <section className="py-12 px-6 bg-white">
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
                  1024: { slidesPerView: 3, spaceBetween: 30 }
                }}
                className="pb-12"
              >
                {courses.map((course, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
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
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <button 
                          onClick={() => handleEnroll(course)}
                          className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </div>
      ) : null}
    </Layout>
  );
}

function CourseCard({ course }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to enroll in a course.');
      router.push('/signin');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course.id, title: course.title }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.reload(); // Reload to update enrolled courses
      } else {
        alert(data.message || 'Failed to enroll in course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Error enrolling in course. Please try again later.');
    }
  };

  return (
    <div className="card h-full shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <Image
        src={course.image}
        alt={course.title}
        width={320}
        height={200}
        className="w-full"
        style={{ objectFit: 'cover' }}
      />
      <div className="p-4">
        <h5 className="card-title">{course.title}</h5>
        <p className={`card-text ${isOpen ? '' : 'line-clamp-3'}`}>{course.description}</p>
        <button onClick={() => setIsOpen(!isOpen)} className="text-blue-500 hover:text-blue-700 text-sm mt-2">
          {isOpen ? 'Show Less' : 'Read More'}
        </button>
        <button onClick={handleEnroll} className="btn btn-primary w-full mt-2">
          Enroll
        </button>
      </div>
    </div>
  );
}
