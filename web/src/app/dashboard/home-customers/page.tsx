"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Custom Hook untuk mengelola data pengguna
const useUserInfo = () => {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [referralNumber, setReferralNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  const fetchUserInfo = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setWalletBalance(data.wallet || 0);
      setPoints(data.points || 0);
      setReferralNumber(data.referralNumber || "");
      setCustomerName(data.name || "");
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const copyReferral = useCallback(() => {
    if (!referralNumber) return;
    navigator.clipboard.writeText(referralNumber);
    setMessage("Referral code copied!");
    setTimeout(() => setMessage(""), 2000);
  }, [referralNumber]);

  return {
    walletBalance,
    points,
    referralNumber,
    message,
    customerName,
    copyReferral,
  };
};

const CustomersPage = () => {
  const {
    walletBalance,
    points,
    referralNumber,
    message,
    customerName,
    copyReferral,
  } = useUserInfo();

  const formattedWalletBalance = useMemo(() => {
    return walletBalance.toLocaleString("id-ID");
  }, [walletBalance]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative flex flex-col items-center justify-center h-56 bg-cover bg-center">
        <div className="absolute inset-0 h-56">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Landing Page Photo"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 flex flex-col items-center mx-auto space-y-8 text-white text-center lg:flex-row lg:space-y-0 lg:space-x-12 justify-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-wide leading-tight">
              WELCOME!
            </h1>

            <div className="mt-6 space-y-4">
              <p className="text-base sm:text-lg md:text-xl">
                Families, friends, and couples arrived, their faces lit up with
                anticipation. Children ran around, their giggles echoing as they
                played games and participated in fun activities.
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6 sm:flex-row justify-center"></div>
          </div>
        </div>
      </section>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg mt-10">
        <div className="flex items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {customerName
                ? `Welcome, ${customerName}!`
                : "My Account (Customers)"}
            </h1>
            <p className="text-gray-500 text-sm">Customer Profile</p>
          </div>
        </div>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold">Wallet Balance</p>
            <p className="text-lg">{formattedWalletBalance}</p>
          </div>
          <div>
            <p className="font-semibold">Points</p>
            <p className="text-lg">{points}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold">Referral Code</p>
          {referralNumber ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg">{referralNumber}</span>
              <button
                onClick={copyReferral}
                className="bg-gray-200 text-sm px-2 py-1 rounded"
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
};

export default CustomersPage;
