"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    excerpt: "",
    description: "",
    location: "",
    date: "",
    price: "",
    availableSeats: "",
    categoryId: "",
    isFree: false,
    organizerId: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        setMessage("Failed to fetch events");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        setMessage("Failed to fetch categories");
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("excerpt", formData.excerpt);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("location", formData.location);
    formDataWithImage.append("date", formData.date);
    formDataWithImage.append("price", formData.price);
    formDataWithImage.append("availableSeats", formData.availableSeats);
    formDataWithImage.append("categoryIds[]", formData.categoryId); // Changed to single category ID
    formDataWithImage.append("isFree", formData.isFree);
    formDataWithImage.append("organizerId", formData.organizerId);
    formDataWithImage.append("image", image);

    try {
      const response = await fetch("http://localhost:8000/api/v1/events", {
        method: "POST",
        body: formDataWithImage,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessage(data.message);
      setFormData({
        name: "",
        excerpt: "",
        description: "",
        location: "",
        date: "",
        price: "",
        availableSeats: "",
        categoryId: "", // Changed to single category ID
        isFree: false,
        organizerId: "",
      });
      setImage(null);
      setEvents([...events, data.data]);
      router.push("/dashboard/home-organizers");
    } catch (error) {
      setMessage("Failed to create event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Event Manager</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Excerpt:
          </label>
          <input
            type="text"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required={!formData.isFree}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Is Free</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Seats:
          </label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image:
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventPage;
