import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Happenings Hub",
//   description: "best event website in the world",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


// // KODE DIBAWAH INI BIKINAN KYLA

// // // app/layout.tsx
// // import './globals.css'
// // import { ReactNode } from 'react'

// // export const metadata = {
// //   title: 'My Event Management App',
// //   description: 'Next.js + Express + Prisma + Tailwind (Responsive)',
// // }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen">
      <div>
      <Navbar />
    </div>
        <main className="max-w-2xl mx-auto mt-10 px-4 w-full">{children}</main>
        <div>
      <Footer />
    </div>
      </body>
    </html>
  )
}
