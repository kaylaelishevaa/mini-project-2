"use client";
import React from "react";
import Link from "next/link";

interface ErrorDisplayProps {
  statusCode: number;
  message: string;
}


export default function ErrorDisplay({ statusCode, message }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.29 3.86L1.82 12.32a4 4 0 005.66 5.66l8.47-8.47a4 4 0 00-5.66-5.66z"
            />
          </svg>
        </div>

        {/* Status code */}
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Error {statusCode}
        </h1>

        {/* Error message */}
        <p className="text-gray-700 mb-6">
          {message || "Something went wrong."}
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
