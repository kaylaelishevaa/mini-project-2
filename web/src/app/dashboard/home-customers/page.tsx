"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [referralNumber, setReferralNumber] = useState<string>("");
  const [message, setMessage] = useState("");
  const [customerName, setCustomerName] = useState<string>(""); // New state variable for customer name

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function fetchUserInfo() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setWalletBalance(data.wallet || 0);
      setPoints(data.points || 0);
      setReferralNumber(data.referralNumber || "");
      setCustomerName(data.name || ""); // Set customer name from API response
    } catch (error) {
      console.error(error);
    }
  }

  function copyReferral() {
    if (!referralNumber) return;
    navigator.clipboard.writeText(referralNumber);
    setMessage("Referral code copied!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">
          {customerName
            ? `Welcome, ${customerName}!`
            : "My Account (Customers)"}
        </h1>

        {message && <p className="text-green-600 mb-2">{message}</p>}

        <div className="mb-4">
          <p className="font-semibold">Wallet Balance</p>
          <p>{walletBalance.toLocaleString("id-ID")}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Points</p>
          <p>{points}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Referral Code</p>
          {referralNumber ? (
            <div className="flex items-center space-x-2">
              <span>{referralNumber}</span>
              <button
                onClick={copyReferral}
                className="bg-gray-200 text-sm px-2 rounded"
              >
                Copy
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No referral code found.</p>
          )}
        </div>
        <p className="text-sm text-gray-500">
          <em>
            Go to{" "}
            <Link href="/eventlisting" className="text-blue-600 underline">
              Events
            </Link>{" "}
            page to buy tickets or{" "}
            <Link href="/top-up" className="text-blue-600 underline">
              Top Up
            </Link>{" "}
            your wallet.
          </em>
        </p>
      </div>
    </div>
  );
}
