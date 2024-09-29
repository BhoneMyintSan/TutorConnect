import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(''); // State to manage login error messages
  const [loading, setLoading] = useState(false); // State to manage loading state
  const router = useRouter();  // Next.js hook to handle routing

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !email.includes('@')) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);  // Start loading
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Login successful:', data);
          localStorage.setItem('token', data.token); // Store token in localStorage
          router.push('/dashboard'); // Redirect to dashboard
        } else {
          setLoginError(data.message || "Authentication failed"); // Set error message
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginError('Server error. Please try again later.');
      } finally {
        setLoading(false);  // Stop loading
      }
    }
  };

  return (
    <Layout>
      <main className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="w-100 max-w-md p-5 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-4">
            <Image
              src="/tutorconnect-logo.png"
              alt="TutorConnect Logo"
              width={100}
              height={100}
              priority
            />
            <h2 className="h3 mt-3 fw-bold">Welcome Back to TutorConnect</h2>
            <p className="text-muted">Please sign in to your account</p>
          </div>
          {loginError && <div className="alert alert-danger">{loginError}</div>} {/* Show error message if any */}
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email-address" className="form-label">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email Address"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginRight: "10px" }}
                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="d-flex justify-content-between mt-4">
            <Link href="/signup" className="text-primary">Do not have an account? Sign Up</Link>
            <Link href="/" className="text-primary">Go back to homepage</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
