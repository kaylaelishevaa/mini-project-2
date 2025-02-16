import "./globals.css";

import { Lexend } from "next/font/google";
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

const lexend = Lexend({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lexend.className}>
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto mt-10 px-4 w-full">{children}</main>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
