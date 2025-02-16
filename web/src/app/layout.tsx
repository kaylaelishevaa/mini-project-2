import "./globals.css";

import { Lexend } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Happenings Hub",
  description: "best event website in the world",
};

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
