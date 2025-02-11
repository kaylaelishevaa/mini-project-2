import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happenings Hub",
  description: "best event website in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


// KODE DIBAWAH INI BIKINAN KYLA

// // app/layout.tsx
// import './globals.css'
// import { ReactNode } from 'react'

// export const metadata = {
//   title: 'My Event Management App',
//   description: 'Next.js + Express + Prisma + Tailwind (Responsive)',
// }

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50 text-gray-800 min-h-screen">
//         <nav className="w-full bg-white shadow">
//           <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//             <div className="text-xl font-bold">Event Management</div>
//             <div className="hidden sm:flex space-x-4">
//               <a href="/register" className="text-blue-600 hover:underline">
//                 Register
//               </a>
//               <a href="/login" className="text-blue-600 hover:underline">
//                 Login
//               </a>
//               <a href="/logout" className="text-blue-600 hover:underline">
//                 Logout
//               </a>
//             </div>

//             <div className="sm:hidden">
//               <a href="/register" className="mr-3 text-blue-600 hover:underline">
//                 Register
//               </a>
//               <a href="/login" className="mr-3 text-blue-600 hover:underline">
//                 Login
//               </a>
//               <a href="/logout" className="text-blue-600 hover:underline">
//                 Logout
//               </a>
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-2xl mx-auto mt-10 px-4 w-full">{children}</main>
//       </body>
//     </html>
//   )
// }
