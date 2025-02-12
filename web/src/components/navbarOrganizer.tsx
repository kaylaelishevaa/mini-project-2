"use client";

import React from "react";
import Link from "next/link";

const NavbarOrganizer: React.FC = () => {
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
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/organizer/createEvent"
            className="text-white hover:text-gray-300"
          >
            Create Event
          </Link>
          <Link
            href="/dashboard/organizer"
            className="text-white hover:text-gray-300"
          >
            Dashboard
          </Link>
          <Link href="/logout" className="text-white hover:text-gray-300">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOrganizer;
