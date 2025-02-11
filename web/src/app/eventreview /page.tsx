"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";
export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and a review.");
      return;
    }

    const newReview = {
      id: Date.now(), // unique ID based on timestamp
      rating,
      review,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReview("");
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
            <label htmlFor="rating" className="block text-lg mb-2">
              Rate the Event
            </label>
            <div id="rating" className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="review" className="block text-lg mb-2">
              Leave a Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Write your review here"
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
                key={review.id}
                className="border p-4 rounded-md bg-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-2xl ${
                          index < review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-lg">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}
