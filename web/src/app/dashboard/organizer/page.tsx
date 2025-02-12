import React from "react";
import Image from "next/image";
import NavbarOrganizer from "../../../components/navbarOrganizer";

const events = [
  {
    id: 1,
    name: "Tech Conference 2023",
    excerpt: "Join us for the biggest tech conference of the year!",
    description:
      "This conference will cover the latest trends in technology and provide networking opportunities.",
    date: "2023-09-15T09:00:00Z",
    price: 250,
    image: "https://via.placeholder.com/300",
    location: "Convention Center, Downtown",
    availableSeats: 50,
    isFree: false,
    createdAt: "2023-08-01T12:34:56Z",
  },
  {
    id: 2,
    name: "Art Exhibition",
    excerpt: "Discover the world of art with our annual exhibition.",
    description:
      "This exhibition will showcase the works of local and international artists.",
    date: "2023-10-20T10:00:00Z",
    price: 0,
    image: "https://via.placeholder.com/300",
    location: "City Gallery, Art District",
    availableSeats: 100,
    isFree: true,
    createdAt: "2023-09-01T08:45:32Z",
  },
  {
    id: 3,
    name: "Music Festival",
    excerpt: "Celebrate the summer with our music festival!",
    description: "Enjoy live performances from your favorite artists.",
    date: "2023-07-28T14:00:00Z",
    price: 150,
    image: "https://via.placeholder.com/300",
    location: "Park, Riverside",
    availableSeats: 200,
    isFree: false,
    createdAt: "2023-06-15T16:23:45Z",
  },
];

export default function DashboardOrganizer() {
  return (
    <div>
      <NavbarOrganizer />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">My Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
              <Image
                src={event.image}
                alt={event.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-2">{event.excerpt}</p>
              <p className="text-gray-600 mb-2">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">Location: {event.location}</p>
              <p className="text-gray-600 mb-2">
                Available Seats: {event.availableSeats}
              </p>
              <p className="text-gray-600 mb-2">
                Price: {event.isFree ? "Free" : `$${event.price}`}
              </p>
              <p className="text-gray-600 mb-2">
                Created At: {new Date(event.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   BarChart,
//   Line,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// interface DashboardData {
//   events: {
//     id: number;
//     title: string;
//     registrations: unknown[];
//     transactions: { amount: string }[];
//   }[];
//   totalEvents: number;
//   totalRegistrations: number;
//   totalRevenue: number;
//   stats: {
//     daily: Record<string, number>;
//     monthly: Record<string, number>;
//     yearly: Record<string, number>;
//   };
// }

// export default function DashboardPage() {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [viewMode, setViewMode] = useState<"daily" | "monthly" | "yearly">(
//     "daily"
//   );

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   async function fetchDashboardData() {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("http://localhost:8000/api/v1/dashboard");
//       if (!response.ok) {
//         throw new Error(
//           "Failed to fetch dashboard data. Status: " + response.status
//         );
//       }
//       const data = await response.json();
//       setDashboardData(data);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message || "An error occurred while fetching dashboard.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Convert the stats record (e.g. { "2023-09-01": 5, "2023-09-02": 10 })
//   // into an array Recharts can read: [ { date: "2023-09-01", value: 5 }, { date: "2023-09-02", value: 10 } ]
//   function createRechartsData(stats: Record<string, number>) {
//     const sortedDates = Object.keys(stats).sort(); // sort by date
//     return sortedDates.map((date) => ({
//       date,
//       value: stats[date],
//     }));
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[80vh]">
//         <p className="text-gray-600">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-[80vh]">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return null; // or some fallback
//   }

//   const { totalEvents, totalRegistrations, totalRevenue, events, stats } =
//     dashboardData;

//   // Prepare the data for Recharts based on viewMode
//   let chartTitle: string;
//   let chartData: { date: string; value: number }[] = [];

//   if (viewMode === "daily") {
//     chartTitle = "Daily Registrations";
//     chartData = createRechartsData(stats.daily);
//   } else if (viewMode === "monthly") {
//     chartTitle = "Monthly Registrations";
//     chartData = createRechartsData(stats.monthly);
//   } else {
//     chartTitle = "Yearly Registrations";
//     chartData = createRechartsData(stats.yearly);
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Top heading */}
//         <h1 className="text-3xl font-bold mb-6 text-blue-700">
//           Organizer Dashboard
//         </h1>

//         {/* Summary cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded shadow p-4">
//             <h2 className="text-sm font-semibold text-gray-500">
//               Total Events
//             </h2>
//             <p className="text-2xl font-bold">{totalEvents}</p>
//           </div>
//           <div className="bg-white rounded shadow p-4">
//             <h2 className="text-sm font-semibold text-gray-500">
//               Total Registrations
//             </h2>
//             <p className="text-2xl font-bold">{totalRegistrations}</p>
//           </div>
//           <div className="bg-white rounded shadow p-4">
//             <h2 className="text-sm font-semibold text-gray-500">
//               Total Revenue
//             </h2>
//             <p className="text-2xl font-bold">
//               ${Number(totalRevenue).toLocaleString()}
//             </p>
//           </div>
//         </div>

//         {/* Events List */}
//         <div className="bg-white rounded shadow p-4 mb-8">
//           <h2 className="text-xl font-bold mb-4">Your Events</h2>
//           {events.length === 0 ? (
//             <p className="text-gray-500">No events yet.</p>
//           ) : (
//             <table className="min-w-full text-left">
//               <thead>
//                 <tr className="border-b">
//                   <th className="py-2 px-3">Title</th>
//                   <th className="py-2 px-3">Registrations</th>
//                   <th className="py-2 px-3">Transactions</th>
//                   <th className="py-2 px-3">Total Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {events.map((evt) => {
//                   const registrationCount = evt.registrations.length;
//                   const totalAmount = evt.transactions.reduce(
//                     (sum, tx) => sum + Number(tx.amount),
//                     0
//                   );
//                   return (
//                     <tr key={evt.id} className="border-b hover:bg-gray-50">
//                       <td className="py-2 px-3">{evt.title}</td>
//                       <td className="py-2 px-3">{registrationCount}</td>
//                       <td className="py-2 px-3">{evt.transactions.length}</td>
//                       <td className="py-2 px-3">
//                         ${totalAmount.toLocaleString()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Stats / Graphs Section */}
//         <div className="bg-white rounded shadow p-4 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold">{chartTitle}</h2>
//             <div className="space-x-2">
//               <button
//                 className={`px-3 py-1 rounded ${
//                   viewMode === "daily"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => setViewMode("daily")}
//               >
//                 Day
//               </button>
//               <button
//                 className={`px-3 py-1 rounded ${
//                   viewMode === "monthly"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => setViewMode("monthly")}
//               >
//                 Month
//               </button>
//               <button
//                 className={`px-3 py-1 rounded ${
//                   viewMode === "yearly"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => setViewMode("yearly")}
//               >
//                 Year
//               </button>
//             </div>
//           </div>

//           {/* Recharts Example */}
//           <div className="w-full h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               {viewMode === "daily" ? (
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#4a90e2"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               ) : (
//                 // For monthly/yearly, we can do a BarChart, or also a LineChart if you prefer
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#4a90e2" />
//                 </BarChart>
//               )}
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
