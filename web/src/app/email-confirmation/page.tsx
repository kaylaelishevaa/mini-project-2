// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EmailConfirmationPage() {
//   const router = useRouter();
//   const [emailConfirmed, setEmailConfirmed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState(
//     "Checking your confirmation status..."
//   );

//   useEffect(() => {
//     checkEmailStatus();
//   }, []);

//   async function checkEmailStatus() {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v1/confirm/status",
//         { credentials: "include" }
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to check status :(");
//       }

//       if (data.emailConfirmed) {
//         setEmailConfirmed(true);
//         router.push("/login");
//       } else {
//         setEmailConfirmed(false);
//         setMessage("Please confirm your email first. Check your inbox!");
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setMessage(error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleRefresh() {
//     setLoading(true);
//     checkEmailStatus();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//       <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-center">
//         <h1 className="text-2xl font-bold mb-4 text-blue-700">
//           Email Confirmation
//         </h1>
//         {loading ? (
//           <p className="text-gray-600">Loading...</p>
//         ) : (
//           <>
//             <p className="text-gray-700 mb-4">{message}</p>
//             {!emailConfirmed && (
//               <button
//                 onClick={handleRefresh}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Refresh Status
//               </button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailConfirmationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkEmailStatus();
  }, []);

  async function checkEmailStatus() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/confirm/status", {
        credentials: "include",
      });

      // // Kalau 401 => user belum login / tidak punya sesi => diarahkan ke /register
      // if (response.status === 401) {
      //   router.push("/register");
      //   return;
      // }

      // // Kalau 404 => user tidak ditemukan => ke /register juga
      // if (response.status === 404) {
      //   router.push("/register");
      //   return;
      // }

      // Selain itu, cek apakah response OK
      // if (!response.ok) {
      //   throw new Error("Failed to check email status");
      // }

      const data = await response.json();
      // Jika emailConfirmed = true => langsung ke /login
      if (data.emailConfirmed) {
        router.push("/login");
      } else {
        // emailConfirmed = false => tampilkan instruksi
        setLoading(false);
      }
    } catch (error) {
      console.error("Error checking email status:", error);
      // fallback => misal ke /register
      router.push("/register");
    }
  }

  function handleOpenGmail() {
    window.open("https://mail.google.com", "_blank");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Muncul jika emailConfirmed === false
  return (
    <div className="min-h-[700px] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-50 border border-gray-200 shadow-lg rounded-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          Almost there!
        </h1>
        <p className="text-gray-700 mb-6">
          We just sent you a confirmation email. Please check your inbox, and
          your spam folder, just in case :)
        </p>
        <button
          onClick={handleOpenGmail}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Open Gmail
        </button>
      </div>
    </div>
  );
}

