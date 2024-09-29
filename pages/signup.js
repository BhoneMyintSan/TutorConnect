import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';  // Assuming you have a Layout component for common layout

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Reset error message before submitting
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            // Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    throw new Error(data.message || "Failed to register");
                } else {
                    const errorText = await response.text(); // Read the response as plain text
                    throw new Error(`Failed to register: ${errorText}`);
                }
            }

            const data = await response.json();
            console.log(data);  // Handle success
            alert('Registration successful! You can now login.');
            window.location.href = '/signin'; // Redirect to sign-in page

        } catch (error) {
            console.error('Failed to register:', error);
            setErrorMessage(error.message); // Display error message to the user
        }
    };

    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/tutorconnect-logo.png" // Ensure this path is correct for your logo
                            alt="TutorConnect Logo"
                            width={100}
                            height={100}
                            priority
                        />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
                            Create Your Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 text-center">
                            Start learning with TutorConnect today
                        </p>
                    </div>
                    {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>} {/* Show error message */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input
                            id="first-name"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            id="last-name"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="flex justify-between mt-6">
                        <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </Link>
                        <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Go back to homepage
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
