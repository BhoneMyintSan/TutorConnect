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
  const [loading, setLoading] = useState(true); // State to manage loading

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

  // Fetch user data and enrolled courses
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setLoading(false);
        return; // If no token, do nothing
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
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

    fetchUserData();
  }, []);

  return (
    <Layout>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 font-weight-bold mb-4">
            {user ? `Welcome back, ${user.firstName}!` : 'Launch Your New Career'}
          </h1>
          <p className="lead mb-4">Professional Certificates offer flexible, online training designed to get you job-ready for high-growth fields.</p>
          <Link href="/explore">
            <button className="btn btn-lg btn-success">Explore Careers</button>
          </Link>
        </div>
      </section>

      {/* Show enrolled courses if user is logged in */}
      {user && (
        <section className="py-5">
          <div className="container">
            <h2 className="h2 text-center mb-5">Your Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="row">
                {enrolledCourses.map((course, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-4">
                    <CourseCard course={courses.find(c => c.id === course.courseId)} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">You are not enrolled in any courses yet. Explore and enroll now!</p>
            )}
          </div>
        </section>
      )}

      {/* Available Courses Section */}
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
              1024: { slidesPerView: 3, spaceBetween: 30 },
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
    </Layout>
  );
}

function CourseCard({ course }) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle course details

  return (
    <div className="card h-full shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <Image
        src={course.image}
        alt={course.title}
        width={320}
        height={200}
        className="w-full"
        style={{ objectFit: 'cover' }} // Ensure proper image scaling
        unoptimized={course.image.endsWith('.gif')} // Add unoptimized property for GIFs
      />
      <div className="p-4">
        <h5 className="card-title">{course.title}</h5>
        <p className={`card-text ${isOpen ? '' : 'line-clamp-3'}`}>{course.description}</p>
        <button onClick={() => setIsOpen(!isOpen)} className="text-blue-500 hover:text-blue-700 text-sm mt-2">
          {isOpen ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
}
