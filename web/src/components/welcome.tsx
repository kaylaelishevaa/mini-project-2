"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Define the AllEvent interface here
interface AllEvent {
  id: number;
  name: string;
  image: string;
  price: number;
  date: string;
  location: string;
  description: string;
  availableSeats: number;
  categories: string[];
  isFree: boolean;
}

export default function BlogPage() {
  const [events, setEvents] = useState<AllEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/v1/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
    );
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  const currentEvent = events[currentIndex];

  // Check if the image URL is valid
  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.error("Error validating image URL:", error);
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-red-900 text-4xl font-bold mb-4 text-center">
        See Best Event in the World
      </h1>
      <p className="mb-10 text-center">
        I hope this message finds you well! I am thrilled to share an exciting
        opportunity that you won't want to miss. We are hosting an extraordinary
        event that promises to be both engaging and memorable, and we would love
        for you to be a part of it!
      </p>
      <div className="relative w-full">
        {events.length > 0 && (
          <div className=" rounded-lg p-6 mx-6 flex flex-col items-center">
            <div className="relative w-full h-96">
              {isValidImageUrl(currentEvent.image) ? (
                <Link href={`/eventlisting/${currentEvent.id}`}>
                  <Image
                    src={currentEvent.image}
                    alt={currentEvent.name}
                    fill
                    className="rounded-lg mb-4 object-cover"
                  />
                </Link>
              ) : (
                <div className="rounded-lg mb-4 object-cover bg-gray-300 h-full w-full flex items-center justify-center">
                  <p className="text-gray-500">Invalid Image URL</p>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {currentEvent.name}
              </h3>
              <p className="text-gray-700 text-center">
                {currentEvent.excerpt}
              </p>
            </div>

            <div className="flex space-x-2 mt-4"></div>
          </div>
        )}
        {events.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
            >
              &lt;
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
            >
              &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
}
