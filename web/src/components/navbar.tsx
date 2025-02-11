"use client";

import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-red-900 rounded-sm shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="font-bold text-xl text-white">
            <Link href="/" className="text-white">
              Happenings Hub
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search events"
            className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div> */}

        {/* Location */}
        {/* <div className="flex items-center">
          <svg
            className="h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="ml-2 text-white">Jakarta</span>
        </div> */}

        <div className="hidden md:flex space-x-4">
          <Link href="/eventlisting" className="text-white hover:text-blue-500">
            Find Events
          </Link>{" "}
          <Link href="/categories" className="text-white hover:text-blue-500">
            Categories
          </Link>
          <Link href="/helpcenter" className="text-white hover:text-blue-500">
            Help Center
          </Link>
          <Link href="/login" className="text-white hover:text-blue-500">
            Log In
          </Link>
          <Link href="/signup" className="text-white hover:text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
