import React from "react";

export default function HelpCenter() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Welcome to the Happenings Hub Help Center! Here you can find answers
          to common questions and resources to help you navigate the platform.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-4">
          {/* Event Discovery & Booking */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How can I find and book events?
            </h3>
            <p className="text-gray-700">
              You can explore upcoming events by using the search bar, filters, 
              and categories. Once you find an event you like, click on it to 
              view details and purchase tickets if required.
            </p>
          </div>

          {/* Ticket Purchases */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I purchase event tickets?
            </h3>
            <p className="text-gray-700">
              When you find an event you want to attend, click the -Buy Ticket-
              button. If the event is free, you can register without payment. 
              For paid events, complete the payment using IDR as the currency.
            </p>
          </div>

          {/* Discounts & Referral Codes */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I use referral codes and get discounts?
            </h3>
            <p className="text-gray-700">
              If you register with a referral code, you will receive a **10% discount** 
              for your first purchase. The discount will be valid for 3 months. 
              You can also share your referral number with others to earn points.
            </p>
          </div>

          {/* Points & Rewards */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I earn and redeem points?
            </h3>
            <p className="text-gray-700">
              Every time someone registers using your referral code, you earn **10,000 points**. 
              Points expire after **3 months** and can be redeemed to get discounts on ticket purchases.
            </p>
          </div>

          {/* Event Reviews */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              Can I leave a review for an event?
            </h3>
            <p className="text-gray-700">
              Yes! After attending an event, you can leave a review and rate it 
              based on your experience. Your feedback helps organizers improve 
              future events.
            </p>
          </div>

          {/* User Accounts */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              Do I need an account to buy tickets?
            </h3>
            <p className="text-gray-700">
              Yes, you need to **create an account** before purchasing tickets. 
              This allows you to track your purchases, access event updates, and earn referral points.
            </p>
          </div>

          {/* Contacting Support */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold mb-2">
              How do I contact support?
            </h3>
            <p className="text-gray-700">
              You can contact our support team via the **Help Center** or send an email to 
              <strong> support@eventmanagement.com</strong> for further assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
