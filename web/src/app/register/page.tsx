// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ZodError } from "zod";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { registerSchema } from "../schemas/auth-schemas";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("UNSET");
//   const [referralCode, setReferralCode] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setFieldErrors({});
//     setLoading(true);

//     try {
//       const formData = {
//         name,
//         username,
//         email,
//         password,
//         role,
//         referralCode: referralCode || undefined,
//       };

//       registerSchema.parse(formData);

//       const response = await fetch(
//         "http://localhost:8000/api/v1/auth/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       toast.success("Registration successful! Check your email to confirm.");

//       setName("");
//       setUsername("");
//       setEmail("");
//       setPassword("");
//       setRole("UNSET");
//       setReferralCode("");

//       router.push("/email-confirmation");
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errors: Record<string, string> = {};
//         for (const issue of error.issues) {
//           const fieldName = issue.path[0] as string;
//           errors[fieldName] = issue.message;
//         }
//         setFieldErrors(errors);

//         toast.error("Please fix the errors below.");
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <ToastContainer position="top-center" autoClose={3000} />

//       <div className="bg-white rounded shadow p-6 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
//         <form onSubmit={handleRegister} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block mb-1 font-semibold">Name</label>
//             <input
//               type="text"
//               className={`border border-gray-300 rounded w-full p-2 ${
//                 fieldErrors.name ? "border-red-500" : ""
//               }`}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             {fieldErrors.name && (
//               <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
//             )}
//           </div>

//           {/* Username */}
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               className={`border border-gray-300 rounded w-full p-2 ${
//                 fieldErrors.username ? "border-red-500" : ""
//               }`}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             {fieldErrors.username && (
//               <p className="text-red-500 text-sm mt-1">
//                 {fieldErrors.username}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input
//               type="email"
//               className={`border border-gray-300 rounded w-full p-2 ${
//                 fieldErrors.email ? "border-red-500" : ""
//               }`}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {fieldErrors.email && (
//               <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               className={`border border-gray-300 rounded w-full p-2 ${
//                 fieldErrors.password ? "border-red-500" : ""
//               }`}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {fieldErrors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {fieldErrors.password}
//               </p>
//             )}
//           </div>

//           {/* Referral Code */}
//           <div>
//             <label className="block mb-1 font-semibold">
//               Referral Code (Optional)
//             </label>
//             <input
//               type="text"
//               className={`border border-gray-300 rounded w-full p-2 ${
//                 fieldErrors.referralCode ? "border-red-500" : ""
//               }`}
//               value={referralCode}
//               onChange={(e) => setReferralCode(e.target.value)}
//             />
//             {fieldErrors.referralCode && (
//               <p className="text-red-500 text-sm mt-1">
//                 {fieldErrors.referralCode}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-600">
//           Already registered?{" "}
//           <Link href="/login" className="text-blue-600 hover:underline">
//             Please log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import { registerSchema } from "../schemas/auth-schemas";

export default function RegisterPage() {
  const router = useRouter();

  // State form register
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("UNSET");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Slides animasi di sisi kiri
  const slides = [
    {
      image: "/event-planning.svg",
      title: "Effortless Event Planning",
      description:
        "Plan, manage, and execute your events seamlessly with our all-in-one event management platform. From ticketing to scheduling, everything is simplified.",
    },
    {
      image: "/audience.svg",
      title: "Maximize Your Audience",
      description:
        "Expand your event's reach with powerful marketing tools, real-time analytics, and integrated social sharing to drive more engagement.",
    },
    {
      image: "/event-execution.svg",
      title: "Seamless Event Execution",
      description:
        "Streamline event operations with real-time updates, attendee check-ins, and automated workflows—ensuring a smooth and hassle-free experience.",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Timer slide otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setLoading(true);

    try {
      const formData = {
        name,
        username,
        email,
        password,
        role,
        referralCode: referralCode || undefined,
      };

      registerSchema.parse(formData);

      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful! Check your email to confirm.");

      // Reset field
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("UNSET");
      setReferralCode("");

      router.push("/email-confirmation");
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        for (const issue of error.issues) {
          const fieldName = issue.path[0] as string;
          errors[fieldName] = issue.message;
        }
        setFieldErrors(errors);
        toast.error("Please fix the errors below.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[700px]">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Kontainer utama: lebar & tinggi lebih besar */}
      <div className="flex w-full max-w-6xl min-h-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Kolom Kiri: Slider (disembunyikan di mobile) */}
        <div className="hidden md:flex w-1/2 bg-blue-500 text-white relative overflow-hidden p-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000
        ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
            >
              {/* Gambar */}
              <Image
                src={slide.image}
                alt={slide.title}
                width={200}
                height={200}
                className="mb-4 object-contain"
              />

              {/* Judul & Deskripsi */}
              <h2 className="text-xl font-bold text-center p-3 mx-2">
                {slide.title}
              </h2>
              <p className="leading-relaxed text-center max-w-sm p-3 mx-3">
                {slide.description}
              </p>

              {/* Bullet Indicator (ditempatkan setelah teks, bukan absolute) */}
              <div className="mt-4 flex justify-center items-center space-x-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === i ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Kolom Kanan: Form Register */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-8 text-center">Register</h1>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  className={`border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.name ? "border-red-500" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block mb-1 font-semibold">Username</label>
                <input
                  type="text"
                  className={`border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.username ? "border-red-500" : ""
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {fieldErrors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  className={`border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.email ? "border-red-500" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  className={`border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.password ? "border-red-500" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Referral Code (Optional) */}
              <div>
                <label className="block mb-1 font-semibold">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  className={`border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.referralCode ? "border-red-500" : ""
                  }`}
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                {fieldErrors.referralCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.referralCode}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-4 rounded w-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-700">
              Already registered?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Please log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
