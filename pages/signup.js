import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
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
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 pb-8">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Image
                                    src="/tutorconnect-logo.png"
                                    alt="TutorConnect Logo"
                                    width={80}
                                    height={80}
                                    priority
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
                            <CardDescription className="text-lg">
                                Join TutorConnect today
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {errorMessage && (
                                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                    <p className="text-red-700">{errorMessage}</p>
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="first-name" className="text-sm font-medium">
                                        First Name
                                    </Label>
                                    <Input
                                        id="first-name"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="last-name" className="text-sm font-medium">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="last-name"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email-address" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Create Account
                                </Button>

                                <div className="flex items-center justify-between mt-6 space-x-4 text-sm">
                                    <Link
                                        href="/signin"
                                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        Already have an account? Sign in
                                    </Link>
                                    <Link
                                        href="/"
                                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        Back to homepage
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
