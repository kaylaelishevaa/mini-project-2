"use client";
import { useState } from "react";
import Image from "next/image";

export default function ReviewPage({ params }) {
  const [overallExperience, setOverallExperience] = useState(0);
  const [qualityOfEvent, setQualityOfEvent] = useState(0);
  const [suggestions, setSuggestions] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleOverallExperienceChange = (newRating) => {
    setOverallExperience(newRating);
  };

  const handleQualityOfEventChange = (newRating) => {
    setQualityOfEvent(newRating);
  };
  const handleSuggestionsChange = (event) => {
    setSuggestions(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      overallExperience === 0 ||
      qualityOfEvent === 0 ||
      suggestions.trim() === ""
    ) {
      alert("Please provide ratings and suggestions.");
      return;
    }

    const newReview = {
      eventId: Number((await params).id),
      overallExperience,
      qualityOfEvent,
      suggestions,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update the state with the new review
      setReviews([newReview, ...reviews]);
      setOverallExperience(0);
      setQualityOfEvent(0);
      setSuggestions("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to submit review. Please try again later.");
    }
  };

  return (
    <section>
      <section className="relative flex flex-col items-center justify-center h-56 bg-cover bg-center">
        <div className="absolute inset-0 h-56">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661270434439-2cabce958cd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Landing Page Photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 flex flex-col items-center mx-auto space-y-8 text-white text-center lg:flex-row lg:space-y-0 lg:space-x-12 justify-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-wide leading-tight">
              THANK YOU!
            </h1>

            <div className="mt-6 space-y-4">
              <p className="text-base sm:text-lg md:text-xl">
                I stand before you today filled with gratitude and appreciation.
                It is with a humble heart that I express my sincere thanks to
                each and every one of you who has played a part in this journey.
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6 sm:flex-row justify-center"></div>
          </div>
        </div>
      </section>
      <div className="container mx-auto py-10 px-40">
        <div>
          <h1 className="text-4xl font-semibold text-center mb-6">
            Event Reviews and Ratings
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="overallExperience" className="block text-lg mb-2">
              Rate the Overall Experience
            </label>
            <div id="overallExperience" className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${
                    star <= overallExperience
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleOverallExperienceChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="qualityOfEvent" className="block text-lg mb-2">
              Rate the Quality of Event
            </label>
            <div id="qualityOfEvent" className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${
                    star <= qualityOfEvent ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleQualityOfEventChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="suggestions" className="block text-lg mb-2">
              Leave Suggestions
            </label>
            <textarea
              id="suggestions"
              value={suggestions}
              onChange={handleSuggestionsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Write your suggestions here"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-red-900 py-2 rounded-lg hover:scale-105 transition duration-200"
          >
            Submit Review
          </button>
        </form>

        {/* <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review the event!</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.createdAt}
                className="border p-4 rounded-md bg-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-2xl ${
                          index < review.overallExperience
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-2xl ${
                          index < review.qualityOfEvent
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-lg">{review.suggestions}</p>
              </div>
            ))
          )}
        </div> */}
      </div>
    </section>
  );
}
