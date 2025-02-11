"use client";
import React, { useState } from "react";

export default function CheckoutTicketPage() {
  const [userId, setUserId] = useState("");
  const [ticketPrice, setTicketPrice] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checkoutResult, setCheckoutResult] = useState<{
    originalPrice: number;
    discount: number;
    finalPrice: number;
  } | null>(null);

  // For demonstration, we mock event info
  const eventTitle = "Awesome Concert";
  const eventDate = "28 Sept 2024";
  const eventLocation = "Jakarta Convention Center";

  // If you want to let user input a referral code, 
  // your backend doesn't handle it directly in the same route, 
  // but we can store it, then do a separate step or a new endpoint 
  // that adds a coupon. For now, we just show the field.
  const [referralCode, setReferralCode] = useState("");

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!ticketPrice) return;
    setLoading(true);
    setMessage("");
    setCheckoutResult(null);

    try {
      // We'll do a single call to your /checkout/ticket route
      // This route automatically uses all available points and any valid coupon
      const response = await fetch("http://localhost:8000/api/v1/checkout/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ticketPrice }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      // data should have { originalPrice, discount, finalPrice }
      setCheckoutResult({
        originalPrice: data.originalPrice,
        discount: data.discount,
        finalPrice: data.finalPrice,
      });
      setMessage("Checkout successful! Ready to proceed to payment?");
    } catch (error: unknown) {
        if(error instanceof Error) {
          setMessage(error.message);
        }
    } finally {
      setLoading(false);
    }
  }

  function handleApplyReferral() {
    // If you had an endpoint for referral code:
    // fetch("/api/v1/checkout/apply-referral", { ... })
    // or set a local coupon. For now, we just simulate success:
    if (!referralCode) {
      setMessage("Please enter a referral code first.");
    } else {
      // We pretend it's always valid
      setMessage(`Referral code "${referralCode}" applied! 
                  You might get an extra 10% discount if available.`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
        {/* Event Info */}
        <h1 className="text-2xl font-bold mb-2 text-purple-700">Checkout Ticket</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{eventTitle}</h2>
          <p className="text-gray-500">{eventDate}</p>
          <p className="text-gray-500">{eventLocation}</p>
        </div>

        <hr className="my-4" />

        {/* Referral Code Section */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Have a referral code?</label>
          <div className="flex space-x-2">
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter code here..."
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <button
              onClick={handleApplyReferral}
              className="bg-gray-100 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Redeem Points Section */}
        {/* Actually, your /checkout/ticket route automatically applies all points.
            But let's pretend user can just see that they have points to apply. */}
        <div className="mb-4">
          <p className="font-semibold">Redeem Points</p>
          <p className="text-sm text-gray-500">
            (Your points will be automatically applied if available.)
          </p>
        </div>

        <hr className="my-4" />

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block font-medium">User ID</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
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
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        </form>

        {/* Result / Summary */}
        {message && (
          <p className="mt-4 text-center font-semibold text-red-600">{message}</p>
        )}
        {checkoutResult && (
          <div className="mt-4 space-y-2 text-center">
            <h3 className="font-bold text-lg text-gray-700">Summary:</h3>
            <p>Original Price: {checkoutResult.originalPrice}</p>
            <p>Discount: {checkoutResult.discount}</p>
            <p className="font-bold">
              Final Price: {checkoutResult.finalPrice}
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2">
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
