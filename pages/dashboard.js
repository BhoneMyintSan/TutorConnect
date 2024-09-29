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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
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
        <div className="container mx-auto p-6 text-center">
          <p>Loading user data...</p>
        </div>
      ) : error ? (
        <div className="container mx-auto p-6 text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : userData ? (
        <>
          {/* Personalized greeting */}
          <section className="bg-primary text-white text-center py-5">
            <div className="container">
              <h1 className="display-4 font-weight-bold mb-4">Welcome, {userData.firstName}!</h1>
              <p className="lead mb-4">We are glad to have you back, {userData.firstName}. Explore your personalized dashboard and courses.</p>
              <Link href="/explore">
                <button className="btn btn-lg btn-success me-3">Explore Careers</button>
              </Link>
              <button className="btn btn-lg btn-danger" onClick={handleLogout}>Sign Out</button>
            </div>
          </section>

          {/* Enrolled Courses */}
          <section className="py-5">
            <div className="container">
              <h2 className="h2 text-center mb-5">Your Enrolled Courses</h2>
              {userData.enrolledCourses.length > 0 ? (
                <div className="row">
                  {userData.enrolledCourses.map((course, index) => {
                    const courseDetails = courses.find(c => c.id === course.courseId);
                    return courseDetails ? (
                      <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <CourseCard course={courseDetails} />
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-center">You are not enrolled in any courses yet. Explore and enroll now!</p>
              )}
            </div>
          </section>

          {/* Available Courses */}
          <section className="py-5">
            <div className="container">
              <h2 className="h2 text-center mb-5">Available Courses</h2>
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  1024: { slidesPerView: 3, spaceBetween: 30 }
                }}
              >
                {courses.map((course, index) => (
                  <SwiperSlide key={index}>
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </>
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enroll`, {
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
