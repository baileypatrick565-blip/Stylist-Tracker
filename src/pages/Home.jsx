import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-pink-700 mb-8">💇 Stylist Tracker</h1>
      <div className="space-y-4 max-w-md mx-auto">
        <Link
          to="/clients"
          className="block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-sm"
        >
          👥 Manage Clients
        </Link>
        <Link
          to="/inventory"
          className="block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-sm"
        >
          📦 Manage Inventory
        </Link>
        <a
          href="https://app.squareup.com/dashboard/appointments/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-sm"
        >
          📅 Schedule
        </a>
      </div>
    </div>
  );
}