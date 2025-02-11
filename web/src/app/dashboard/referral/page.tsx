"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReferralDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [referralNumber, setReferralNumber] = useState("");
  const [points, setPoints] = useState(0);
  const [pointsExpire, setPointsExpire] = useState<Date | null>(null);

  const [discount, setDiscount] = useState<number | null>(null);
  const [discountExpire, setDiscountExpire] = useState<Date | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // 1) Fetch user info: e.g. GET /api/v1/auth/me
      const userRes = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include", // if using cookies for auth
      });
      if (!userRes.ok) {
        // If not logged in or user not found, maybe push to login
        router.push("/login");
        return;
      }
      const userData = await userRes.json();

      // userData might look like { id, username, email, referralNumber, emailConfirmed, ... }
      setReferralNumber(userData.referralNumber || "");

      // 2) Fetch points balance: e.g. GET /api/v1/points/balance
      const pointsRes = await fetch("http://localhost:8000/api/v1/points/balance", {
        credentials: "include",
      });
      if (pointsRes.ok) {
        const pointsData = await pointsRes.json(); // { points, expiresAt }
        setPoints(pointsData.points);
        if (pointsData.expiresAt) {
          setPointsExpire(new Date(pointsData.expiresAt));
        }
      } else {
        // If user has no points or route fails, handle gracefully
        console.log("No points or error retrieving points balance.");
      }

      // 3) Fetch active coupon (10% discount). e.g. GET /api/v1/coupons/active
      const couponRes = await fetch("http://localhost:8000/api/v1/coupons/active", {
        credentials: "include",
      });
      if (couponRes.ok) {
        const couponData = await couponRes.json(); // { discount, expiresAt }
        setDiscount(couponData.discount);
        if (couponData.expiresAt) {
          setDiscountExpire(new Date(couponData.expiresAt));
        }
      } else {
        console.log("No active coupon found.");
      }

      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
          setErrorMessage(error.message || "Something went wrong!");
      }
    }
  }

  function formatDate(date: Date | null) {
    if (!date) return "N/A";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // A small helper to copy the referralNumber to clipboard
  function handleCopyReferral() {
    if (!referralNumber) return;
    navigator.clipboard.writeText(referralNumber);
    alert("Referral code copied!");
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-white/60 border border-grey/30 shadow-xl rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-extrabold text-pink-700 mb-4 text-center">
          Referral & Points Dashboard
        </h1>

        {loading ? (
          <p className="text-gray-800 text-center">Loading data...</p>
        ) : errorMessage ? (
          <p className="text-red-600 text-center font-semibold">{errorMessage}</p>
        ) : (
          <div className="space-y-6">
            {/* Referral Code Section */}
            <div className="bg-white/80 p-4 rounded shadow">
              <h2 className="text-lg font-bold text-gray-800">Your Referral Code</h2>
              {referralNumber ? (
                <div className="mt-2">
                  <span className="text-blue-700 font-semibold text-xl">{referralNumber}</span>
                  <button
                    onClick={handleCopyReferral}
                    className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              ) : (
                <p className="text-gray-700">No referral code found.</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Share this code with friends. Each time someone registers using your code,
                you’ll get <strong>+10,000 points</strong>, and they’ll get a <strong>10% discount</strong>!
              </p>
            </div>

            {/* Points Balance Section */}
            <div className="bg-white/80 p-4 rounded shadow">
              <h2 className="text-lg font-bold text-gray-800">Your Points</h2>
              <p className="mt-1 text-2xl text-purple-700 font-bold">{points} points</p>
              <p className="text-sm text-gray-600">
                Expires on: <span className="font-medium">{formatDate(pointsExpire)}</span>
              </p>
            </div>

            {/* Discount Coupon Section */}
            <div className="bg-white/80 p-4 rounded shadow">
              <h2 className="text-lg font-bold text-gray-800">Active Discount Coupon</h2>
              {discount ? (
                <div className="mt-1">
                  <p className="text-gray-700">
                    <strong>{discount}% off</strong> your next purchase.
                  </p>
                  <p className="text-sm text-gray-600">
                    Valid until <span className="font-medium">{formatDate(discountExpire)}</span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-700">No active coupon found.</p>
              )}
            </div>

            {/* Could add links to Redeem Points or Checkout, etc. */}
            <div className="text-center mt-6">
              <a
                href="/redeem-points"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-3"
              >
                Redeem Points
              </a>
              <a
                href="/checkout"
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >
                Checkout
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
