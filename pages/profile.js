import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setEnrolledCourses(userData.enrolledCourses || []);
        } else {
          localStorage.removeItem('token');
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, [router]);

  const handleUnenroll = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enrollments?courseId=${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEnrolledCourses(prev => prev.filter(course => course.courseId !== courseId));
      } else {
        setError('Failed to unenroll');
      }
    } catch (error) {
      console.error('Error unenrolling:', error);
      setError('Error unenrolling');
    }
  };

  if (!user) {
    return <Layout><div className="p-6">Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 pb-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.courseId} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <button
                    onClick={() => handleUnenroll(course.courseId)}
                    className="bg-destructive text-white px-4 py-2 rounded hover:bg-destructive/90"
                  >
                    Unenroll
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You are not enrolled in any courses yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
} 