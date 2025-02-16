import React from "react";
import Image from "next/image";

export default function HelpCenter() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-10">
      <section className="relative flex flex-col items-center justify-center h-56 bg-cover bg-center">
        <div className="absolute inset-0 h-56">
          <Image
            src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Landing Page Photo"
            fill
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 flex flex-col items-center mx-auto space-y-8 text-white text-center lg:flex-row lg:space-y-0 lg:space-x-12 justify-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-wide leading-tight">
              HELP CENTER
            </h1>

            <div className="mt-6 space-y-4">
              <p className="text-base sm:text-lg md:text-xl">
                A Help Center is a vital resource for both customers and
                businesses, providing essential support and information.
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6 sm:flex-row justify-center"></div>
          </div>
        </div>
      </section>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl gap-4">
        <p className="text-gray-700 text-lg mb-8 text-center">
          Welcome to the Event Management Help Center! Here you can find answers
          to common questions and resources to help you navigate the platform.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I create an event?
            </h3>
            <p className="text-gray-700">
              To create an event, go to the events section, click on Create
              Event and fill in the required details.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I invite participants to my event?
            </h3>
            <p className="text-gray-700">
              You can invite participants by sharing the event link or using the
              Invite feature in the event settings.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I manage event registrations?
            </h3>
            <p className="text-gray-700">
              You can manage event registrations through the Registration tab in
              the event dashboard.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I add a referral code?
            </h3>
            <p className="text-gray-700">
              You can add a referral code in the settings section of your
              account.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I contact support?
            </h3>
            <p className="text-gray-700">
              You can contact support by clicking on the help button in the top
              right corner or by sending an email to
              support@eventmanagement.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
