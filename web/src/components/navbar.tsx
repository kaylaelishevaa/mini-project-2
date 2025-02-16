// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import LogoutModal from "./Logout";

// interface UserInfo {
//   id: number;
//   name: string;
//   role: "CUSTOMERS" | "ORGANIZERS" | null;
// }

// export default function Navbar() {
//   const router = useRouter();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   async function fetchUser() {
//     try {
//       const res = await fetch("http://localhost:8000/api/v1/auth/me", {
//         credentials: "include",
//       });
//       if (!res.ok) {
//         // 401 => user null
//         setLoadingUser(false);
//         return;
//       }
//       const data = await res.json();
//       setUser({ id: data.id, name: data.name, role: data.role });
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     } finally {
//       setLoadingUser(false);
//     }
//   }

//   // Dipanggil saat logout sukses
//   function handleLogoutSuccess() {
//     setUser(null);
//     router.refresh();
//   }

//   function handleLogoutClick() {
//     setShowLogoutModal(true);
//   }
//   function handleCloseModal() {
//     setShowLogoutModal(false);
//   }

//   if (loadingUser) {
//     return (
//       <nav className="bg-red-900 p-4">
//         <div className="container mx-auto flex justify-between">
//           <div className="text-white font-bold">Happenings Hub</div>
//           <p className="text-white">Checking user...</p>
//         </div>
//       </nav>
//     );
//   }

//   // =========================
//   //    1) Belum login
//   // =========================
//   if (!user) {
//     return (
//       <nav className="bg-red-900 rounded-sm shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="font-bold text-xl text-white">
//             <Link href="/" className="text-white">
//               Happenings Hub
//             </Link>
//           </div>

//           <div className="hidden md:flex space-x-4">
//             <Link href="/eventlisting" className="text-white hover:text-blue-400">
//               Find Events
//             </Link>
//             <Link href="/categories" className="text-white hover:text-blue-400">
//               Categories
//             </Link>
//             <Link href="/helpcenter" className="text-white hover:text-blue-400">
//               Help Center
//             </Link>
//             <Link href="/login" className="text-white hover:text-blue-400">
//               Log In
//             </Link>
//             <Link href="/register" className="text-white hover:text-blue-400">
//               Register
//             </Link>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // =========================
//   //    2) Login + CUSTOMERS
//   // =========================
//   if (user.role === "CUSTOMERS") {
//     return (
//       <nav className="bg-red-900 rounded-sm shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="font-bold text-xl text-white">
//             <Link href="/" className="text-white">
//               Happenings Hub
//             </Link>
//           </div>

//           <div className="hidden md:flex space-x-4 items-center">
//             <Link href="/eventlisting" className="text-white hover:text-blue-400">
//               Find Events
//             </Link>
//             <Link href="/categories" className="text-white hover:text-blue-400">
//               Categories
//             </Link>
//             <Link href="/helpcenter" className="text-white hover:text-blue-400">
//               Help Center
//             </Link>

//             {/* Profile Icon => Dashboard for customers */}
//             <Link href="/dashboard/customer">
//               <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer" />
//             </Link>

//             {/* Logout button */}
//             <button
//               onClick={handleLogoutClick}
//               className="bg-white text-red-900 px-3 py-1 rounded hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {showLogoutModal && (
//           <LogoutModal
//             onClose={handleCloseModal}
//             onLogoutSuccess={handleLogoutSuccess}
//           />
//         )}
//       </nav>
//     );
//   }

//   // =========================
//   //    3) Login + ORGANIZERS
//   // =========================
//   if (user.role === "ORGANIZERS") {
//     return (
//       <nav className="bg-red-900 rounded-sm shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="font-bold text-xl text-white">
//             <Link href="/" className="text-white">
//               Happenings Hub
//             </Link>
//           </div>

//           <div className="hidden md:flex space-x-4 items-center">
//             {/* Create Event (only for organizers) */}
//             <Link href="/event/create" className="text-white hover:text-blue-400">
//               Create Events
//             </Link>

//             {/* Profile Icon => Dashboard for organizers */}
//             <Link href="/dashboard/organizer">
//               <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer" />
//             </Link>

//             {/* Logout button */}
//             <button
//               onClick={handleLogoutClick}
//               className="bg-white text-red-900 px-3 py-1 rounded hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {showLogoutModal && (
//           <LogoutModal
//             onClose={handleCloseModal}
//             onLogoutSuccess={handleLogoutSuccess}
//           />
//         )}
//       </nav>
//     );
//   }}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "./Logout";
import Image from "next/image";

interface UserInfo {
  id: number;
  name: string;
  role: "CUSTOMERS" | "ORGANIZERS" | null;
}

export default function Navbar() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        credentials: "include",
      });
      if (!res.ok) {
        setLoadingUser(false);
        return;
      }
      const data = await res.json();
      setUser({ id: data.id, name: data.username, role: data.role });
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoadingUser(false);
    }
  }

  function handleLogoutSuccess() {
    setUser(null);
    router.refresh();
  }

  function handleLogoutClick() {
    setShowLogoutModal(true);
  }

  function handleCloseModal() {
    setShowLogoutModal(false);
  }

  if (loadingUser) {
    return (
      <nav className="bg-white py-3 shadow">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">Happenings Hub</h1>
          <p>Checking user...</p>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-200 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="Happenings Hub Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            Happenings Hub
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/eventlisting">Find Events</NavLink>
          <NavLink href="/categories">Categories</NavLink>
          <NavLink href="/helpcenter">Help Center</NavLink>
          {user ? (
            <>
              {user.role === "CUSTOMERS" && (
                <NavLink href="/dashboard/customer">Dashboard</NavLink>
              )}
              {user.role === "ORGANIZERS" && (
                <NavLink href="/dashboard/organizer">Dashboard</NavLink>
              )}
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">Log In</NavLink>
              <Link href="/register" className="relative group py-2">
                <span className="relative z-10 px-4 py-1 text-white font-semibold">
                  Register
                </span>
                <div className="absolute inset-0 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors z-0" />
              </Link>
            </>
          )}
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onClose={handleCloseModal}
          onLogoutSuccess={handleLogoutSuccess}
        />
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative text-gray-600 hover:text-blue-600 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300"
    >
      {children}
    </Link>
  );
}
