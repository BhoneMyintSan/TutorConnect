// components/Navbar.jsx
import Link from "next/link";
import Image from "next/image"; // Import Image component for optimized image handling

const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and home link */}
        <Link href="/" legacyBehavior>
          <a className="flex items-center text-xl font-bold">
            <Image
              src="/tutorconnect-logo.png" // Make sure this path correctly points to your logo image
              alt="TutorConnect Logo"
              width={40}
              height={40}
              priority // Use priority to load the logo faster
            />
            TutorConnect
          </a>
        </Link>
        {/* Navigation links */}
        <div className="flex items-center">
          <Link href="/about" legacyBehavior>
            <a className="px-4 py-2 hover:bg-blue-700 rounded">About</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="px-4 py-2 hover:bg-blue-700 rounded">Contact</a>
          </Link>
          <Link href="/signin" legacyBehavior>
            <a className="px-4 py-2 hover:bg-blue-700 rounded">Sign In</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-600 rounded">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
