"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AttendedEventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/events/attended",
          { credentials: "include" }
        );
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.error(error);
      }
    }

    getEvents();
  }, []);

  console.log(events);

  return (
    <section className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Events that you have attended!
        </h1>
        <p className="text-gray-600 text-center">
          When individuals attend an event, they contribute to a vibrant
          atmosphere filled with energy and enthusiasm. Each participant brings
          their unique perspective, enriching discussions and interactions. For
          instance, at a recent technology conference, the diverse backgrounds
          of attendees led to innovative ideas and collaborations that might not
          have emerged in a more homogeneous setting.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen mt-11">
        {events.data?.map(
          (
            event: { name: string; id: number; image: string },
            index: number
          ) => {
            return (
              <div key={index}>
                <Link
                  href={`/dashboard/home-customers/eventreview/${event.id}`}
                >
                  <div className="bg-white rounded-lg shadow-md relative overflow-hidden h-64 flex items-center justify-center transition-all duration-300 hover:scale-105">
                    <Image
                      src={event.image}
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
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
          }
        )}
      </div>
    </section>

    // <section className="p-6 bg-gray-100 min-h-screen">
    //   <h2 className="text-2xl font-bold mb-6">Attended Events</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {events.data?.map(
    //       (event: { name: string; id: number }, index: number) => {
    //         return (
    //           <article
    //             key={index}
    //             className="bg-white p-6 rounded-lg shadow-md"
    //           >
    //             <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
    //             <p>{event.location}</p>
    //             <p>{event.excerpt}</p>
    //             <Image
    //               src={event.image}
    //               alt={event.name}
    //               width={200}
    //               height={200}
    //             />
    //             <Link
    //               href={`/dashboard/home-customers/eventreview/${event.id}`}
    //               className="text-blue-500 hover:text-blue-700 font-semibold"
    //             >
    //               Review
    //             </Link>
    //           </article>
    //         );
    //       }
    //     )}
    //   </div>
    // </section>
  );
}
