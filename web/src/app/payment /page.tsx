"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams(); // { eventId: "123" }

  // State event detail
  const [eventName, setEventName] = useState("");
  const [eventPrice, setEventPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);

  // Info user
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [hasCoupon, setHasCoupon] = useState<boolean>(false);
  const [couponExpires, setCouponExpires] = useState<string | null>(null);

  // Payment options
  const [redeem, setRedeem] = useState<boolean>(false);
  const [useCoupon, setUseCoupon] = useState<boolean>(false);

  // Top-up form
  const [topupAmount, setTopupAmount] = useState<number>(0);

  // Feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!params.eventId) {
      setMessage("No event ID found in URL.");
      return;
    }
    fetchEventDetail();
    fetchUserWallet();
    fetchUserPoints();
    fetchActiveCoupon();
  }, [params.eventId]);

  // 1) Fetch event detail
  async function fetchEventDetail() {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/events/${params.eventId}`);
      const data = await res.json();
      if (res.ok && data.data) {
        setEventName(data.data.name);
        setEventPrice(data.data.price);
        setIsFree(data.data.isFree);
      } else {
        setMessage("Failed to load event detail");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching event");
    }
  }

  // 2) Fetch user wallet
  async function fetchUserWallet() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.walletBalance !== undefined) {
        setWalletBalance(data.walletBalance);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 3) Fetch user points
  async function fetchUserPoints() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/points", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.points !== undefined) {
        setPoints(data.points);
        setExpiresAt(data.expiresAt || null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 4) Fetch active coupon
  async function fetchActiveCoupon() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/points/active-coupon", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setHasCoupon(true);
        setCouponExpires(data.expiresAt || null);
      } else {
        setHasCoupon(false);
      }
    } catch (err) {
      console.error(err);
      setHasCoupon(false);
    }
  }

  // ================
  // handleTopUp
  // ================
  async function handleTopUp(e: React.FormEvent) {
    e.preventDefault();
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
      setMessage(data.message);
      setWalletBalance(data.newWalletBalance);
      setTopupAmount(0);
    } catch (error: any) {
      setMessage(error.message);
      toast.error("Error!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  // ================
  // handlePayTicket
  // ================
  async function handlePayTicket(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const eventId = Number(params.eventId);
      if (!eventId) {
        throw new Error("Invalid event ID");
      }
      const res = await fetch("http://localhost:8000/api/v1/wallet/pay", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          redeem,
          useCoupon,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }
      toast.success("Payment successful!", { autoClose: 1500 });
      
      setTimeout(() => {
        router.push("/paymentsuccessful?success=true");
      }, 1500);    } catch (error: any) {
        toast.error("Error!", { autoClose: 3000 });
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function formatIDR(num: number) {
    return "IDR " + num.toLocaleString("id-ID");
  }
  function formatDate(iso: string | null) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
       <ToastContainer />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Payment Page for {eventName || "Event"}</h1>

        {message && <p className="text-red-600 mb-2">{message}</p>}

        <div className="mb-4">
          <h2 className="font-semibold">Event Price</h2>
          <p>{isFree ? "FREE" : formatIDR(eventPrice)}</p>
        </div>

        {/* Wallet / Points / Coupon Info */}
        <div className="mb-4">
          <h2 className="font-semibold">Wallet Balance</h2>
          <p className="text-xl">{formatIDR(walletBalance)}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold">Points Balance</h2>
          <p className="text-xl">{points} points</p>
          {expiresAt && (
            <p className="text-sm text-gray-500">
              Expires on {formatDate(expiresAt)}
            </p>
          )}
        </div>
        {hasCoupon ? (
          <div className="mb-4">
            <h2 className="text-purple-700 font-semibold">You have a 10% coupon!</h2>
            <p className="text-sm text-gray-500">
              Valid until {couponExpires ? new Date(couponExpires).toDateString() : "-"}
            </p>
          </div>
        ) : (
          <p className="mb-4 text-gray-500">No active coupon</p>
        )}

        {/* Top-up form */}
        <form onSubmit={handleTopUp} className="border p-4 mb-6">
          <h3 className="font-semibold mb-2">Top-up Wallet</h3>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min={1}
              className="border p-2 rounded w-1/2"
              value={topupAmount}
              onChange={(e) => setTopupAmount(Number(e.target.value))}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "..." : "Top Up"}
            </button>
          </div>
        </form>

        {/* Purchase form */}
        <form onSubmit={handlePayTicket} className="border p-4">
          <h3 className="font-semibold mb-2">Buy Ticket</h3>
          {/* useCoupon */}
          {hasCoupon && (
            <div className="mb-2 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useCoupon}
                onChange={(e) => setUseCoupon(e.target.checked)}
              />
              <label>Use 10% Coupon?</label>
            </div>
          )}

          {/* redeem points */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={redeem}
              onChange={(e) => setRedeem(e.target.checked)}
            />
            <label>Redeem Points?</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
