"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketBookingPage = () => {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const availablePoints = 20000;
  const router = useRouter();

  const formatIDR = (number: number) => {
    return `IDR ${number.toLocaleString("id-ID")}`;
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotals = () => {
    const ticketPrice = 200000;
    const subtotal = ticketPrice * quantity;
    const tax = subtotal * 0.06;
    const total = subtotal + tax - pointsUsed;
    return { subtotal, tax, total };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-60">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // Logic to create order
          const id = 10;

          router.push(`/payment?id=${id}`);
          console.log("Pay!");
        }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Select Tickets Section */}
          <div className="space-y-4 border-r border-gray-200 pr-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Select Tickets</h2>
            </div>

            <div className="border rounded-lg p-4">
              <div>
                <div className="font-medium">Standard Ticket</div>
                <div className="text-sm text-gray-500">{formatIDR(200000)}</div>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Qty: {quantity}</span>
                <span>Total: {formatIDR(quantity * 200000)}</span>
              </div>
            </div>
          </div>

          {/* Attendee Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Attendee Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Use Your Points (Available: {formatIDR(availablePoints)})
                </label>
                <input
                  type="number"
                  name="pointsUsed"
                  value={pointsUsed}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10) || 0;
                    if (value > availablePoints) {
                      alert("You cannot use more points than you have.");
                      return;
                    }
                    setPointsUsed(value);
                  }}
                  placeholder="Enter points to use"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Ticket Type</h3>
              <div className="flex justify-between text-sm">
                <span>Standard Ticket x {quantity}</span>
                <span>{formatIDR(calculateTotals().subtotal)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sub Total:</span>
                <span>{formatIDR(calculateTotals().subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Points Used:</span>
                <span>-{formatIDR(pointsUsed)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>{formatIDR(calculateTotals().tax)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Order Total:</span>
                <span>{formatIDR(calculateTotals().total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Pay Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketBookingPage;
