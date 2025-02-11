import React from "react";

export default function HelpCenter() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>
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
              To create an event, go to the "Events" section, click on "Create
              Event," and fill in the required details.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I invite participants to my event?
            </h3>
            <p className="text-gray-700">
              You can invite participants by sharing the event link or using the
              "Invite" feature in the event settings.
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
