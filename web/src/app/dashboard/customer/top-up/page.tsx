"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function TopUpPage() {
  const [loading, setLoading] = useState(false);
  const [topupAmount, setTopupAmount] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [walletBalance, setWalletBalance] = useState<number>(0);

  useEffect(() => {
    fetchUserWallet();
  }, []);

  async function fetchUserWallet() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.wallet !== undefined) {
        setWalletBalance(data.wallet);
      }
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
    }
  }

  async function handleTopUp(e: React.FormEvent) {
    e.preventDefault();
    if (topupAmount <= 0) {
      toast.error("Invalid top-up amount");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/v1/wallet/topup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: topupAmount }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Top-up failed");
      }

      toast.success(data.message || "Top-up successful!");
      // Update wallet balance
      setWalletBalance(data.newWalletBalance);
      setTopupAmount(0);
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            setMessage(error.message);
        }
    } finally {
      setLoading(false);
    }
  }

  function formatIDR(amount: number) {
    return "IDR " + amount.toLocaleString("id-ID");
  }

  return (
    <div className="min-h-screen p-4">
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Top Up Wallet</h1>

        {message && <p className="text-red-600 mb-2">{message}</p>}

        <div className="mb-4">
          <p className="font-semibold">Current Wallet Balance</p>
          <p className="text-lg text-green-600 font-bold">
            {formatIDR(walletBalance)}
          </p>
        </div>

        <form onSubmit={handleTopUp} className="border p-4">
          <label className="block font-medium mb-1">Amount to Top Up</label>
          <input
            type="number"
            min={1}
            value={topupAmount}
            onChange={(e) => setTopupAmount(Number(e.target.value))}
            className="border p-2 rounded w-full mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Processing..." : "Top Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
