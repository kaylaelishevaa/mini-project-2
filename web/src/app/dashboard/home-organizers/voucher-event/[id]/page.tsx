"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    eventId: "",
    name: "",
    discountValue: "",
    limit: "",
    referralCode: "",
    validUntil: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Promotion created successfully!");
        setFormData({
          eventId: "",
          name: "",
          discountValue: "",
          limit: "",
          referralCode: "",
          validUntil: "",
        });
      } else {
        alert("Failed to create promotion.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the promotion.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Create Voucher</h2>
        <div className="mb-4">
          <label
            htmlFor="eventId"
            className="block text-gray-700 font-bold mb-2"
          >
            Event ID
          </label>
          <input
            type="text"
            id="eventId"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountValue"
            className="block text-gray-700 font-bold mb-2"
          >
            Discount Value
          </label>
          <input
            type="number"
            id="discountValue"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="limit" className="block text-gray-700 font-bold mb-2">
            Limit
          </label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="referralCode"
            className="block text-gray-700 font-bold mb-2"
          >
            Referral Code
          </label>
          <input
            type="text"
            id="referralCode"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="validUntil"
            className="block text-gray-700 font-bold mb-2"
          >
            Valid Until
          </label>
          <input
            type="datetime-local"
            id="validUntil"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
