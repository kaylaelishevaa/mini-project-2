"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-900 rounded-sm shadow-md mt-8">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Information */}
        <div className="text-white mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Happenings Hub. All rights reserved.
        </div>

        {/* Contact Information */}
        <div className="text-white mb-4 md:mb-0">
          <p>Email: contact@happeningshub.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
