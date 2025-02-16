"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingSection() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center">
      <div className="absolute inset-0 h-screen">
        <Image
          src="https://images.unsplash.com/photo-1468359601543-843bfaef291a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Landing Page Photo"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container relative z-10 flex flex-col items-center mx-auto space-y-8 text-white text-center lg:flex-row lg:space-y-0 lg:space-x-12 justify-center">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wide leading-tight">
            HAPPENINGS HUB
          </h1>
          <p className="mt-4 text-3xl sm:text-4xl md:text-5xl">
            Best Website Event in The World!
          </p>
          <div className="mt-6 space-y-4">
            <p className="text-base sm:text-lg md:text-xl">
              In today's fast-paced digital world, organizing and promoting
              events has become more streamlined and efficient, thanks to the
              advent of specialized event websites. These platforms serve as a
              central hub for event organizers, attendees, and sponsors,
              providing a seamless experience from planning to execution. This
              narrative explores the features, benefits, and impact of an event
              website, illustrating how it transforms the way we connect and
              engage through events.
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-6 sm:flex-row justify-center">
            <Link
              href="/eventlisting"
              className="px-6 py-3 text-white bg-red-900 rounded-md shadow-lg transition duration-300 hover:scale-105"
            >
              Use Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
