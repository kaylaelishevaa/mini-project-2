"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const EventSortedByCategory = ({ params }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const id = (await params).id;
        const response = await fetch(
          `http://localhost:8000/api/v1/categories/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!events || events.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">SORTED EVENTS</h1>
        <p className="text-gray-600 text-center mb-11">
          In our latest compilation, we have meticulously sorted a variety of
          events into distinct categories to enhance your experience and
          facilitate easier navigation. Each category represents a unique theme,
          allowing participants to find events that resonate with their
          interests. Below is a detailed breakdown of the events sorted by
          category:
        </p>
      </div>
      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div key={index}>
            <Link href={`/eventlisting/${event.Event.id}`}>
              <div className="bg-white rounded-lg shadow-md relative overflow-hidden h-64 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <Image
                  src={event.Event.image}
                  alt={event.Event.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
                <div className="z-10">
                  <h2 className="text-3xl font-semibold text-center text-white z-10 bg-black bg-opacity-30 p-1 rounded">
                    {event.Event.name}
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSortedByCategory;
