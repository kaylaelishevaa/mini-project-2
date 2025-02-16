"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 rounded-sm shadow-lg mt-8">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Information */}
        <div className="text-gray-600 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Happenings Hub. All rights reserved.
        </div>

        {/* Contact Information */}
        <div className="text-gray-600 mb-4 md:mb-0">
          <p>Email: contact@happeningshub.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
