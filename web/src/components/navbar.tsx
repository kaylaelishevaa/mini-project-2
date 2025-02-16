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

  // before login
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

// after login
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
