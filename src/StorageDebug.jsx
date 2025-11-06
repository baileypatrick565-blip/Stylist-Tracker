import React, { useEffect, useState } from 'react';

export default function StorageDebug() {
  const [data, setData] = useState({ clients: null, inventory: null });

  const read = () => {
    try {
      const clients = localStorage.getItem('clients');
      const inventory = localStorage.getItem('inventory');
      setData({ clients: clients ? JSON.parse(clients) : null, inventory: inventory ? JSON.parse(inventory) : null });
    } catch (e) {
      setData({ clients: null, inventory: null });
    }
  };

  useEffect(() => {
    read();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow mt-6">
      <h3 className="text-lg font-medium mb-2">Storage inspector</h3>
      <div className="mb-2">
        <button className="bg-gray-200 px-2 py-1 mr-2 rounded" onClick={read}>Refresh</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => { localStorage.removeItem('clients'); localStorage.removeItem('inventory'); read(); }}>Clear storage</button>
      </div>
      <div className="text-sm">
        <div className="mb-2">
          <strong>clients:</strong>
          <pre className="overflow-auto max-h-40 bg-gray-50 p-2 mt-1">{JSON.stringify(data.clients, null, 2)}</pre>
        </div>
        <div>
          <strong>inventory:</strong>
          <pre className="overflow-auto max-h-40 bg-gray-50 p-2 mt-1">{JSON.stringify(data.inventory, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
