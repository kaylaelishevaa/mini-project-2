
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // [1] Transaksinya dilakukan kapan (contoh: date now)
  const [transactionDate, setTransactionDate] = useState<string>("");

  // [2] Apakah diizinkan masuk page ini? (misal minimal check)
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Misal: kita cek adakah query param "success=true"
    // atau di real-case, cek context / state
    const successParam = searchParams.get("success");

    if (successParam === "true") {
      setIsAuthorized(true);
      // Isi transactionDate => jam sekarang (atau jam dari backend)
      const dateStr = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTransactionDate(dateStr);
    } else {
      // Kalau tidak "success=true", redirect ke halaman lain
      router.push("/eventlisting"); 
    }
  }, [router, searchParams]);

  // Kalau belum diizinkan (masih false), jangan render apa-apa (atau spinner).
  if (!isAuthorized) {
    return null; // or <p>Redirecting...</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">Your ticket has been booked successfully</p>
        </div>

        {/* Body Card (Statis) */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            {/* Bagian ini statis */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Confirmation</h2>
              <span className="text-sm text-green-600 font-medium px-3 py-1 bg-green-100 rounded-full">
                Paid
              </span>
            </div>

            <div className="space-y-4 text-sm">
              {/* Satu-satunya data "dinamis" adalah transactionDate */}
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Date</span>
                <span className="font-medium">{transactionDate}</span>
              </div>

              <div className="h-px bg-gray-200 my-4"></div>

              <p className="text-gray-700 leading-relaxed">
                Thank you for purchasing the ticket. Please check your email for
                further details regarding your event. We hope you enjoy and have
                a great experience!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/eventlisting"
              className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>A copy of the e-ticket has been sent to your email.</p>
          <p className="mt-2">
            For any questions, please contact our support at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
