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
import Image from "next/image"

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
        // 401 => user null
        setLoadingUser(false);
        return;
      }
      const data = await res.json();
      setUser({ id: data.id, name: data.name, role: data.role });
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoadingUser(false);
    }
  }

  // Dipanggil saat logout sukses
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

  // Loading state => optional spinner atau teks
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

  // =========================
  //  1) Belum login
  // =========================
  if (!user) {
    return (
      <nav className="bg-gray-200 py-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <Image
              src="/logo.svg" // Ganti dengan path logomu
              alt="Happenings Hub Logo"
              width={40} // Sesuaikan ukuran logo
              height={40}
              className="object-contain"
            />

            {/* Text */}
            <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
              Happenings Hub
            </h1>
          </div>

          {/* Menu (desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/eventlisting">Find Events</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/helpcenter">Help Center</NavLink>
            <NavLink href="/login">Log In</NavLink>

            {/* Tombol Register dengan shape di belakang */}
            <Link href="/register" className="relative group py-2">
              {/* Text register di atas */}
              <span className="relative z-10 px-4 py-1 text-white font-semibold">
                Register
              </span>
              {/* Shape di belakang (mis. pill shape) */}
              <div
                className="absolute inset-0 rounded-full bg-blue-400 
              group-hover:bg-blue-600 transition-colors 
              z-0"
              />
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // =========================
  //   2) Login + CUSTOMERS
  // =========================
  if (user.role === "CUSTOMERS") {
    return (
      <nav className="bg-gray-200 py-3 shadow">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <Image
              src="/logo.svg" // Ganti dengan path logomu
              alt="Happenings Hub Logo"
              width={40} // Sesuaikan ukuran logo
              height={40}
              className="object-contain"
            />

            {/* Text */}
            <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
              Happenings Hub
            </h1>
          </div>

          {/* Menu (desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/eventlisting">Find Events</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/helpcenter">Help Center</NavLink>

            {/* Ikon Profil => link ke dashboard customer */}
            <Link
              href="/dashboard/customer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Profile"
            >
              {/* Inline SVG sebagai ikon profil */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c2.136 0 3.864 1.728 3.864 3.864S14.136 9.728 12 9.728 8.136 8 8.136 5.864 9.864 2 12 2zm0 9.273c2.108 0 3.818 1.599 3.96 3.648l.029.379-.482.07a14.107 14.107 0 00-2.346.549c-.867.259-1.796.559-2.517.559-.722 0-1.65-.3-2.517-.559a14.08 14.08 0 00-2.346-.549l-.482-.07.029-.379c.141-2.049 1.851-3.648 3.96-3.648z" />
              </svg>
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogoutClick}
              className="bg-red-500 text-white px-3 py-1 rounded-full 
                         font-semibold hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
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

  // =========================
  //  3) Login + ORGANIZERS
  // =========================
  if (user.role === "ORGANIZERS") {
    return (
      <nav className="bg-gray-200 py-3 shadow">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <Image
              src="/logo.svg" // Ganti dengan path logomu
              alt="Happenings Hub Logo"
              width={40} // Sesuaikan ukuran logo
              height={40}
              className="object-contain"
            />

            {/* Text */}
            <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
              Happenings Hub
            </h1>
          </div>

          {/* Menu (desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/event/create">Create Events</NavLink>

            {/* Ikon Profil => link ke dashboard organizer */}
            <Link
              href="/dashboard/organizer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Profile"
            >
              {/* Inline SVG sebagai ikon profil */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c2.136 0 3.864 1.728 3.864 3.864S14.136 9.728 12 9.728 8.136 8 8.136 5.864 9.864 2 12 2zm0 9.273c2.108 0 3.818 1.599 3.96 3.648l.029.379-.482.07a14.107 14.107 0 00-2.346.549c-.867.259-1.796.559-2.517.559-.722 0-1.65-.3-2.517-.559a14.08 14.08 0 00-2.346-.549l-.482-.07.029-.379c.141-2.049 1.851-3.648 3.96-3.648z" />
              </svg>
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogoutClick}
              className="bg-red-500 text-white px-3 py-1 rounded-full 
                         font-semibold hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
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

  // =========================
  //  4) Login + Role null (fallback)
  // =========================
  return (
    <nav className="bg-white py-3 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
          Happenings Hub
        </h1>
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 text-white px-3 py-1 rounded-full 
                     font-semibold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
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

/**
 * Komponen link dengan efek garis di bawah saat hover.
 * Menggunakan Tailwind utilities + "relative after" approach.
 */
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
      className="
        relative text-gray-600 hover:text-blue-600 transition-colors 
        after:content-[''] after:absolute after:left-0 after:-bottom-[2px] 
        after:h-[2px] after:w-0 after:bg-current
        hover:after:w-full after:transition-all after:duration-300
      "
    >
      {children}
    </Link>
  );
}
