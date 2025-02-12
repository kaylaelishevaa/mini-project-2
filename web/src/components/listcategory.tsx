"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ListCategory = () => {
  const [categories, setCategories] = useState({ data: [] }); // Initialize state with an object containing a 'data' property
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 4;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          // Check if 'data' property exists and is an array
          setCategories(data);
        } else {
          throw new Error(
            "Data received from API is not in the expected format"
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.data.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const totalPages = Math.ceil(categories.data.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCategories.map((category) => (
          <li
            key={category.id}
            className="bg-white rounded-lg p-4 flex flex-col items-center hover:bg-gray-100 transition-colors duration-300"
          >
            <Link
              href={`/categories/${category.id}`}
              className="flex flex-col items-center"
            >
              <Image
                src={category.image} // Ensure the category object has an 'image' property
                alt={category.name}
                width={400}
                height={400}
                className="w-20 h-20 rounded-full mb-2"
              />
              <span className="text-xl text-center font-semibold hover:text-blue-500 transition-colors duration-300">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:bg-gray-300 hover:bg-blue-600 transition-colors duration-300"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:bg-gray-300 hover:bg-blue-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListCategory;
