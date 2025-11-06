import React from 'react';
import Inventory from '../components/Inventory';

export default function InventoryPage() {
  return (
    <div className="p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pink-700">📦 Inventory Management</h1>
          <a
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Home
          </a>
        </div>
        <Inventory />
      </div>
    </div>
  );
}