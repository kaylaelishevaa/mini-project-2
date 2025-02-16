// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { ZodError } from "zod";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { loginSchema } from "../schemas/auth-schemas";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setFieldErrors({});
//     setLoading(true);

//     try {
//       const formData = { emailOrUsername, password };
//       loginSchema.parse(formData);

//       const response = await fetch("http://localhost:8000/api/v1/auth/login", {
//         credentials: "include",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       toast.success("Login successful!");
//       const meRes = await fetch("http://localhost:8000/api/v1/auth/me", {
//         credentials: "include",
//       });
//       const meData = await meRes.json();
//       if (!meRes.ok) {
//         // fallback => if somehow error
//         router.push("/select-role");
//         return;
//       }

//       // cek meData.role => "CUSTOMERS" / "ORGANIZERS" / dsb
//       if (meData.role === "CUSTOMERS") {
//         // langsung ke /home-customers
//         router.push("/home-customers");
//       } else if (meData.role === "ORGANIZERS") {
//         // langsung ke /home-organizers
//         router.push("/home-organizers");
//       } else {
//         // kalau role default atau null => user must select role
//         router.push("/select-role");
//       }
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
//         <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold">
//               Email or Username
//             </label>
//             <input
//               type="text"
//               className={`border border-gray-300 rounded w-full p-2 ${
//                 fieldErrors.emailOrUsername ? "border-red-500" : ""
//               }`}
//               value={emailOrUsername}
//               onChange={(e) => setEmailOrUsername(e.target.value)}
//               required
//             />
//             {fieldErrors.emailOrUsername && (
//               <p className="text-red-500 text-sm mt-1">
//                 {fieldErrors.emailOrUsername}
//               </p>
//             )}
//           </div>

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

//           <button
//             type="submit"
//             className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-600">
//           Haven’t made an account yet?{" "}
//           <Link href="/register" className="text-green-600 hover:underline">
//             Please sign up
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ZodError } from "zod";
import Image from "next/image";

import { loginSchema } from "../schemas/auth-schemas";

export default function LoginPage() {
  const router = useRouter();

  // State untuk form login
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Data slides (gambar dan teks) untuk animasi di sisi kiri
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

  // Timer untuk pergantian slide otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setFieldErrors({});
    setLoading(true);

    try {
      const formData = { emailOrUsername, password };
      // Validasi form dengan Zod
      loginSchema.parse(formData);

      // Lakukan request login ke server
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful!");

      // Cek role user
      const meRes = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include",
      });
      const meData = await meRes.json();

      if (!meRes.ok) {
        router.push("/select-role");
        return;
      }

      // Arahkan sesuai role
      if (meData.role === "CUSTOMERS") {
        router.push("/home-customers");
      } else if (meData.role === "ORGANIZERS") {
        router.push("/home-organizers");
      } else {
        router.push("/select-role");
      }
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

      {/* Container utama yang membungkus seluruh tampilan */}
      <div className="flex w-full max-w-5xl h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Kolom Kiri: Animasi/Slider */}
        <div className="hidden md:flex w-1/2 bg-blue-500 text-white relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 w-full h-full flex flex-col items-center justify-center px-8 transition-opacity duration-1000
                ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={250}
                height={250}
                className="mb-6 object-contain"
              />
              <h2 className="text-xl font-bold mb-2 text-center">{slide.title}</h2>
              <p className="text-center max-w-sm">{slide.description}</p>
            </div>
          ))}

          {/* Bullet Indicator */}
          <div className="absolute bottom-6 w-full flex justify-center items-center space-x-2">
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

        {/* Kolom Kanan: Form Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          {/* Bungkus form dalam container agar center */}
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">
                  Email or Username
                </label>
                <input
                  type="text"
                  className={`border border-gray-300 rounded w-full p-2 ${
                    fieldErrors.emailOrUsername ? "border-red-500" : ""
                  }`}
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                />
                {fieldErrors.emailOrUsername && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.emailOrUsername}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  className={`border border-gray-300 rounded w-full p-2 ${
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

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
              Haven’t made an account yet?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Please sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
