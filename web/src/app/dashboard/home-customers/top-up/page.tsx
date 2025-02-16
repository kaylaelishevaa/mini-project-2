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
    } catch (error: any) {
      toast.error(error.message);
      setMessage(error.message);
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

// "use client";

// import React, { useState } from "react";

// const TopUpPage: React.FC = () => {
//   const [amount, setAmount] = useState<number>(0);

//   const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(event.target.value);
//     if (!isNaN(value)) {
//       setAmount(value);
//     }
//   };

//   const handleTopUp = async () => {
//     alert(`Top up saldo sebesar ${amount} berhasil!`);
//     await fetch("http://localhost:8000/api/v1/wallet/topup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount }),
//       credentials: "include",
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">Top Up Saldo</h2>
//         <form>
//           <div className="mb-4">
//             <label
//               htmlFor="amount"
//               className="block text-gray-700 font-bold mb-2"
//             >
//               Jumlah Saldo
//             </label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={handleAmountChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Masukkan jumlah saldo"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleTopUp}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Konfirmasi Top Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TopUpPage;
