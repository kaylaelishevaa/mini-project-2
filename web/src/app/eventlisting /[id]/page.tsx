"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

// Define the Event interface here
interface Event {
  id: number;
  name: string;
  image: string;
  price: number;
  date: string;
  location: string;
  description: string;
  availableSeats: number;
  categories: string[];
  hostedBy: {
    name: string;
    avatar: string;
  };
}

const EventDetail = ({ params }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const id = (await params).id;
        const response = await fetch(
          `http://localhost:8000/api/v1/events/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <section>
      <Navbar />
      <div className="max-w-5xl mx-auto pt-14">
        {/* Back Button */}
        <button className="mb-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <Link href="/eventlisting" className="text-gray-600">
            Back to Listing
          </Link>
        </button>

        {/* Event Header */}
        <div className="relative w-full h-60 mb-6">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Event Title and CTA */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{event.name}</h1>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href={`/payment/${event.id}`} className="text-gray-600">
              <button className="bg-yellow-400 px-6 py-2 text-sm font-bold rounded-lg hover:scale-105 transition">
                Buy Tickets
              </button>
            </Link>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L12 13.5l-5.25-5.25"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Date and Time */}
            <div>
              <h3 className="font-bold text-lg mb-2">Date and Time</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              {/* <p>Time details not available in API</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                + Add to Calendar
              </p> */}
            </div>

            {/* Location */}
            <div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p>{event.location}</p>
              {/* <div className="relative w-full h-60 mt-4">
                <Image
                  src={event.image} // Assuming the image is used for location map
                  alt="Location Map"
                  fill
                  className="object-cover rounded-lg"
                />
              </div> */}
            </div>

            {/* Hosted By */}
            <div>
              <h3 className="font-bold text-lg mb-2">Hosted by</h3>
              <div className="flex items-center gap-4">
                <Image
                  src={event.image}
                  alt="Host Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{event.description}</p>
                  <div className="flex gap-2 mt-1">
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100">
                      Contact
                    </button>
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100">
                      + Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <h3 className="font-bold text-lg mb-2">Event Description</h3>
              <p>{event.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-bold text-lg mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 bg-gray-200 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div>
              <h3 className="font-bold text-lg mb-2">Ticket Information</h3>
              <p>Ticket: Rp. {event.price}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default EventDetail;
