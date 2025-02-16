"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface AllEvent {
  id: number;
  name: string;
  image: string;
  price: number;
  date: string;
  location: string;
  description: string;
  availableSeats: number;
  slug: string;
  excerpt: string;
  categories: string[];
}

const EVENTS_PER_PAGE = 6;

interface EventCardProps {
  event: AllEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <div className="relative h-48 overflow-hidden rounded-t">
      <Image
        src={event.image}
        alt={event.name}
        fill
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-2">{event.excerpt}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {event.categories.map((category, index) => (
          <span
            key={index}
            className="bg-red-900 text-white rounded-full px-3 py-1 text-sm"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="flex space-x-2">
        <Link
          href={`/payment/${event.id}`}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-black transition-colors duration-300"
        >
          Buy Tickets
        </Link>
        <Link
          href={`/eventlisting/${event.id}`}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-black transition-colors duration-300"
        >
          Detail Event
        </Link>
      </div>
    </div>
  </div>
);

const EventListing: React.FC = () => {
  const [events, setEvents] = useState<AllEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AllEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/events");
        const data = await response.json();
        setEvents(data.data);
        setFilteredEvents(data.data);

        // Extract unique categories and locations
        const uniqueCategories = [
          ...new Set(data.data.flatMap((event: AllEvent) => event.categories)),
        ] as string[];
        const uniqueLocations = [
          ...new Set(data.data.map((event: AllEvent) => event.location)),
        ] as string[];
        setCategories(uniqueCategories);
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const filterEvents = () => {
      let filtered = events;

      if (searchTerm) {
        filtered = filtered.filter((event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter((event) =>
          event.categories.includes(selectedCategory)
        );
      }

      if (selectedLocation) {
        filtered = filtered.filter(
          (event) => event.location === selectedLocation
        );
      }

      setFilteredEvents(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    };

    filterEvents();
  }, [searchTerm, selectedCategory, selectedLocation, events]);

  const debouncedSearch = (
    func: (event: React.ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) => {
    let timeout: NodeJS.Timeout | null = null;
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(event), delay);
    };
  };

  const handleDebouncedSearch = debouncedSearch(
    (event) => setSearchTerm(event.target.value),
    300
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(event.target.value);
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <section className="relative flex flex-col items-center justify-center h-56 bg-cover bg-center">
        <div className="absolute inset-0 h-56">
          <Image
            src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Landing Page Photo"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 flex flex-col items-center mx-auto space-y-8 text-white text-center lg:flex-row lg:space-y-0 lg:space-x-12 justify-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-wide leading-tight">
              LIST OF EVENTS
            </h1>

            <div className="mt-6 space-y-4">
              <p className="text-base sm:text-lg md:text-xl">
                Buying event tickets is an exhilarating experience that brings a
                sense of anticipation and excitement.
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6 sm:flex-row justify-center"></div>
          </div>
        </div>
      </section>
      <div className="mt-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleDebouncedSearch}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border rounded mr-4"
          >
            <option value="">Filter by Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="p-2 border rounded"
          >
            <option value="">Filter by Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-red-900 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListing;
