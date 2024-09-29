// components/Sidebar.jsx
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle sidebar toggle
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Sidebar Handle */}
      <div
        className="sidebar-handle" // The handle that triggers the sidebar
        onMouseEnter={toggleSidebar} // Open sidebar on mouse enter
      ></div>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? "open" : ""}`} // Apply 'open' class if isOpen is true
        onMouseLeave={toggleSidebar} // Close sidebar on mouse leave
      >
        <div className="flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 p-4 focus:outline-none"
          >
            {isOpen ? "Close" : ""}
          </button>
        </div>
        <div className="p-4">
          <Image
            src="/tutorconnect-logo.png" // Ensure this path is correct for your TutorConnect logo
            alt="TutorConnect Logo"
            width={180}
            height={100} // Adjusted to the probable size of your logo
            priority
          />
          <div className="mt-8">
            <Link href="/" legacyBehavior>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Home
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                About
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
