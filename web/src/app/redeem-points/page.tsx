"use client";
import React, { useEffect, useState } from "react";

export default function RedeemPointsPage() {
  const [ticketPrice, setTicketPrice] = useState<number | undefined>();
  const [points, setPoints] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  // On mount, fetch user points
  useEffect(() => {
    fetchPointsBalance();
  }, []);

  async function fetchPointsBalance() {
    try {
      setMessage("");
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/v1/points", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch points balance");
      }

      // Set the states
      setPoints(data.points || 0);
      setExpiresAt(data.expiresAt || null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    if (!ticketPrice) return;

    setLoading(true);
    setMessage("");
    setFinalPrice(null);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/points/redeem",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketPrice }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to redeem points.");
      }

      setMessage(data.message);
      setFinalPrice(data.finalPrice);

      // Refresh points after redeeming
      await fetchPointsBalance();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function formatExpiry(isoString: string | null) {
    if (!isoString) return "No active points found";
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded w-full">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Redeem Your Points
        </h1>
        <p className="text-gray-600 mb-6">
          Use your points to reduce ticket prices and enjoy discounts.
        </p>

        {/* Points Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Your Point Balance</h2>
          <p className="text-3xl text-blue-700 font-bold">{points} points</p>
          <p className="text-sm text-gray-500">
            Expires on{" "}
            <span className="font-medium">{formatExpiry(expiresAt)}</span>
          </p>

          <div className="w-full bg-gray-200 h-2 mt-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: points > 0 ? "100%" : "0%" }}
            ></div>
          </div>
        </div>

        {/* Redeem Form */}
        <h2 className="font-semibold text-lg mb-3">Redeem Your Points</h2>
        <form onSubmit={handleRedeem} className="space-y-4">
          <div>
            <label className="block font-medium">Ticket Price</label>
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              value={ticketPrice || ""}
              onChange={(e) => setTicketPrice(Number(e.target.value))}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            {loading ? "Redeeming..." : "Apply Points"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-red-600">
            {message}
          </p>
        )}
        {finalPrice !== null && (
          <div className="mt-2 text-center">
            <p className="text-gray-700">
              Final Ticket Price after redemption:{" "}
              <span className="font-bold text-lg text-blue-700">
                {finalPrice}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
