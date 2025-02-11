"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

interface Category {
  id: number;
  name: string;
}

export default function EventCreationPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formEvent, setFormEvent] = useState({
    name: "",
    excerpt: "",
    description: "",
    location: "",
    date: "",
    price: "",
    publishedDate: "",
    availableSeats: "",
    categoryIds: [] as number[],
    image: null as File | null,
    isFree: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    getCategories();
  }, []);

  function notify(message: string) {
    return toast(message);
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", formEvent.name);
      formData.append("excerpt", formEvent.excerpt);
      formData.append("description", formEvent.description);
      formData.append("location", formEvent.location);
      formData.append("date", formEvent.date);
      formData.append("price", formEvent.isFree ? "0.0" : formEvent.price);
      formData.append("publishedDate", formEvent.publishedDate);
      formData.append("availableSeats", formEvent.availableSeats);
      formData.append("categoryIds", JSON.stringify(formEvent.categoryIds));
      formData.append("isFree", formEvent.isFree.toString());
      if (formEvent.image) {
        formData.append("image", formEvent.image);
      }

      const response = await fetch("http://localhost:8000/api/v1/events", {
        method: "POST",
        body: formData,
      });

      const responseBody = await response.text();
      let errorData = { message: "Network response was not ok" };

      if (!response.ok) {
        try {
          errorData = JSON.parse(responseBody);
        } catch (jsonError) {
          console.error("Error parsing JSON error:", jsonError);
        }

        throw new Error(
          `HTTP error ${response.status}: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      notify("Event creation successful");
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      notify(`Error creating event: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  // Unified input change handler
  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "isFree") {
      setFormEvent((prev) => ({
        ...prev,
        isFree: checked,
        price: checked ? "0.0" : prev.price,
      }));
    } else if (name === "categoryIds") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
        parseInt(option.value)
      );
      setFormEvent((prev) => ({
        ...prev,
        categoryIds: selectedOptions,
      }));
    } else {
      setFormEvent((prev) => ({
        ...prev,
        [name]: type === "file" ? e.target.files[0] : value,
      }));
    }
  }

  return (
    <section className="flex flex-col min-h-screen justify-center items-center bg-gray-100 p-4">
      <ToastContainer />
      <form
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formEvent.name}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="excerpt" className="text-gray-700 font-medium">
            Excerpt
          </label>
          <input
            type="text"
            id="excerpt"
            name="excerpt"
            value={formEvent.excerpt}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="description" className="text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formEvent.description}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="location" className="text-gray-700 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formEvent.location}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="date" className="text-gray-700 font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formEvent.date}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="isFree" className="text-gray-700 font-medium">
            Is Free
          </label>
          <input
            type="checkbox"
            id="isFree"
            name="isFree"
            checked={formEvent.isFree}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="price" className="text-gray-700 font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formEvent.price}
            onChange={handleInputChange}
            required={!formEvent.isFree}
            disabled={formEvent.isFree}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="publishedDate" className="text-gray-700 font-medium">
            Published Date
          </label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formEvent.publishedDate}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="availableSeats" className="text-gray-700 font-medium">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            name="availableSeats"
            value={formEvent.availableSeats}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="categoryIds" className="text-gray-700 font-medium">
            Categories
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setIsCategoryDropdownVisible(!isCategoryDropdownVisible)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              {isCategoryDropdownVisible
                ? "Hide Categories"
                : "Show Categories"}
            </button>
            {isCategoryDropdownVisible && (
              <select
                id="categoryIds"
                name="categoryIds"
                multiple
                value={formEvent.categoryIds.map(String)}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 w-full"
              >
                <option value="" disabled>
                  Pick categories
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="image" className="text-gray-700 font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`${
            isLoading ? "bg-gray-500 text-gray-300" : "bg-blue-500 text-white"
          } border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Event"}
        </button>
      </form>
    </section>
  );
}
