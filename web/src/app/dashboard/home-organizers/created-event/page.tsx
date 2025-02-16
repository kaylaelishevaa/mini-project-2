"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AttendedEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvents(params) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/events/created",
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        // Check if responseData has a 'data' property
        if (responseData && responseData.data) {
          setEvents(responseData.data);
        } else {
          setEvents([]);
          console.warn("API response does not contain a 'data' property.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          event yang telah engkah buat
        </h1>
        <p className="text-gray-600 text-center">lorem ipsum</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen mt-11">
        {events.map((event) => {
          return (
            <div key={event.id}>
              <Link
                href={`/dashboard/home-organizers/voucher-event/${event.id}`}
              >
                <div className="bg-white rounded-lg shadow-md relative overflow-hidden h-64 flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0"
                  />
                  <div className="z-10">
                    <h2 className="text-3xl font-semibold text-center text-white z-10 bg-black bg-opacity-30 p-1 rounded">
                      {event.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
