"use client";
import React, { useState, useEffect } from "react";

interface Promotion {
  name: string;
  discountValue: number;
  limit: number;
  referralCode: string;
  validUntil: string;
}

interface FormData {
  name: string;
  excerpt: string;
  description: string;
  date: string;
  price: number;
  imageUrl: string;
  location: string;
  availableSeats: number;
  organizerId: string;
  isFree: boolean;
  promotions: Promotion[];
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

const EventSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    excerpt: "",
    description: "",
    date: "",
    price: 0,
    imageUrl: "",
    location: "",
    availableSeats: 0,
    organizerId: "",
    isFree: false,
    promotions: [],
    categoryId: "",
  });

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");

        if (response.ok) {
          const data = await response.json();
          // Ensure data is an array
          if (Array.isArray(data.data)) {
            setCategories(data.data);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // useEffect(() => {
  //   console.log("Form Data:", formData);
  // }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    });
  };

  const handlePromotionChange = (
    index: number,
    field: keyof Promotion,
    value: string
  ) => {
    const updatedPromotions = [...promotions];
    updatedPromotions[index][field] =
      field === "discountValue" || field === "limit"
        ? parseFloat(value)
        : value;
    setPromotions(updatedPromotions);
    setFormData({
      ...formData,
      promotions: updatedPromotions,
    });
  };

  const addPromotion = () => {
    setPromotions([
      ...promotions,
      {
        name: "",
        discountValue: 0,
        limit: 0,
        referralCode: "",
        validUntil: "",
      },
    ]);
  };

  const removePromotion = (index: number) => {
    const updatedPromotions = promotions.filter((_, i) => i !== index);
    setPromotions(updatedPromotions);
    setFormData({
      ...formData,
      promotions: updatedPromotions,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Event submitted successfully!");
        setFormData({
          name: "",
          excerpt: "",
          description: "",
          date: "",
          price: 0,
          imageUrl: "",
          location: "",
          availableSeats: 0,
          organizerId: "",
          isFree: false,
          promotions: [],
          categoryId: "",
        });
        setPromotions([]);
      } else {
        alert("Failed to submit event.");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("An error occurred while submitting the event.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-center text-2xl mb-5">Submit Event</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Excerpt:</label>
          <input
            type="text"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md resize-y"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Available Seats:</label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Organizer ID:</label>
          <input
            type="text"
            name="organizerId"
            value={formData.organizerId}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Is Free:</label>
          <input
            type="checkbox"
            name="isFree"
            checked={formData.isFree}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Category:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-5">
          <h3>Promotions:</h3>
          {promotions.map((promotion, index) => (
            <div
              key={index}
              className="border border-gray-300 p-2.5 rounded-md mb-2.5"
            >
              <div className="flex flex-col gap-2">
                <label>Name:</label>
                <input
                  type="text"
                  value={promotion.name}
                  onChange={(e) =>
                    handlePromotionChange(index, "name", e.target.value)
                  }
                  required
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Discount Value:</label>
                <input
                  type="number"
                  value={promotion.discountValue}
                  onChange={(e) =>
                    handlePromotionChange(
                      index,
                      "discountValue",
                      e.target.value
                    )
                  }
                  required
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Limit:</label>
                <input
                  type="number"
                  value={promotion.limit}
                  onChange={(e) =>
                    handlePromotionChange(index, "limit", e.target.value)
                  }
                  required
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Referral Code:</label>
                <input
                  type="text"
                  value={promotion.referralCode}
                  onChange={(e) =>
                    handlePromotionChange(index, "referralCode", e.target.value)
                  }
                  required
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Valid Until:</label>
                <input
                  type="datetime-local"
                  value={promotion.validUntil}
                  onChange={(e) =>
                    handlePromotionChange(index, "validUntil", e.target.value)
                  }
                  required
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={() => removePromotion(index)}
                className="p-2 bg-red-500 text-white border-none rounded-md cursor-pointer"
              >
                Remove Promotion
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPromotion}
            className="p-2 bg-green-500 text-white border-none rounded-md cursor-pointer"
          >
            Add Promotion
          </button>
        </div>
        <button
          type="submit"
          className="p-2.5 bg-blue-500 text-white border-none rounded-md cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventSubmissionForm;
