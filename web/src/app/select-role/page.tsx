"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SelectRolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRoleSelection(role: "CUSTOMERS" | "ORGANIZERS") {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/update-role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to set role");
      }

      toast.success(`Role updated to ${role}!`);
      // If you want the user to see the toast for a moment, 
      // use a small setTimeout before redirecting:
      setTimeout(() => {
        if (role === "CUSTOMERS") router.push("/home-customers");
        else router.push("/home-organizers");
      }, 1500);
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 px-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <h1 className="text-4xl font-bold text-purple-700 mb-2">
        Welcome to My Event Platform!
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        We’re glad you’re here! What can we help you with first?
      </p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Find an Experience (Customer) */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6">
          <Image
            src="/find-experience.png"
            alt="Find Experience"
            width={200}
            height={200}
          />
          <h2 className="text-xl font-bold mt-4">Find an experience</h2>
          <p className="text-gray-600 text-center mt-2 mb-4">
            Discover fun events tailored to your interests.
          </p>
          <button
            onClick={() => handleRoleSelection("CUSTOMERS")}
            disabled={loading}
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200"
          >
            Tell us what you love
          </button>
        </div>

        {/* Card 2: Organize an Event (Organizer) */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6">
          <Image
            src="/organize-event.png"
            alt="Organize Event"
            width={200}
            height={200}
          />
          <h2 className="text-xl font-bold mt-4">Organize an event</h2>
          <p className="text-gray-600 text-center mt-2 mb-4">
            Plan and manage your best event easily.
          </p>
          <button
            onClick={() => handleRoleSelection("ORGANIZERS")}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Plan your best event ever
          </button>
        </div>
      </div>
    </div>
  );
}
