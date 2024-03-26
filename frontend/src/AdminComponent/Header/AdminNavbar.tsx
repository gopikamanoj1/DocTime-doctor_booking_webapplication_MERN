import React from 'react';
import { Link } from 'react-router-dom';




const AdminNavbar = () => {
  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-white text-lg font-bold uppercase">
              Admin Panel
            </a>
          </div>

          {/* Navigation links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link to='' className="text-white hover:text-gray-300">
                  Logout
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
