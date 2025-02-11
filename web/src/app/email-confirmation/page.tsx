"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailConfirmationPage() {
  const router = useRouter();
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    "Checking your confirmation status..."
  );

  useEffect(() => {
    checkEmailStatus();
  }, []);

  async function checkEmailStatus() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/confirm/status",
        { credentials: "include" }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to check status :(");
      }

      if (data.emailConfirmed) {
        setEmailConfirmed(true);
        router.push("/login");
      } else {
        setEmailConfirmed(false);
        setMessage("Please confirm your email first. Check your inbox!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleRefresh() {
    setLoading(true);
    checkEmailStatus();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Email Confirmation
        </h1>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <>
            <p className="text-gray-700 mb-4">{message}</p>
            {!emailConfirmed && (
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Refresh Status
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
