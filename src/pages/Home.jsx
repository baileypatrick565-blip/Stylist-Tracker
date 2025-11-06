import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [lowCount, setLowCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('inventory');
      if (!saved) return setLowCount(0);
      const parsed = JSON.parse(saved);
      const low = parsed.filter(it => (Number(it.qty) || 0) <= 2).length;
      setLowCount(low);
    } catch (e) {
      setLowCount(0);
    }
  }, []);

  // Listen for inventory changes emitted from Inventory component (same-window)
  useEffect(() => {
    const onInventoryUpdated = (e) => {
      try {
        const low = e?.detail?.low;
        if (typeof low === 'number') setLowCount(low);
      } catch (err) {
        // ignore
      }
    };

    // Storage event for cross-tab changes
    const onStorage = (e) => {
      if (e.key === 'inventory') {
        try {
          const parsed = JSON.parse(e.newValue || '[]');
          const low = parsed.filter(it => (Number(it.qty) || 0) <= 2).length;
          setLowCount(low);
        } catch (err) {
          setLowCount(0);
        }
      }
    };

    window.addEventListener('inventoryUpdated', onInventoryUpdated);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('inventoryUpdated', onInventoryUpdated);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-pink-700 mb-8">💇 Stylist Tracker</h1>

      {lowCount > 0 && (
        <div className="max-w-md mx-auto mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded">
          ⚠️ Low inventory: {lowCount} item{lowCount > 1 ? 's' : ''} below threshold
        </div>
      )}

      <div className="space-y-4 max-w-md mx-auto">
        <Link
          to="/clients"
          className="block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-sm"
        >
          👥 Manage Clients
        </Link>
        <Link
          to="/inventory"
          className="relative block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-sm"
        >
          📦 Manage Inventory
          {lowCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {lowCount}
            </span>
          )}
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