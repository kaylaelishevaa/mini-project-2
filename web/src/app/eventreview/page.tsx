"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function ReviewPage() {
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
      overallExperience,
      qualityOfEvent,
      suggestions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      console.log("Review submitted successfully:", data);

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
      <Navbar />
      <div className="container mx-auto py-40 pt-32 px-40">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Event Reviews and Ratings
        </h1>

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
            className="w-full bg-[#FFE047] py-2 rounded-lg hover:scale-105 transition duration-200"
          >
            Submit Review
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
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
        </div>
      </div>
      <Footer />
    </section>
  );
}
