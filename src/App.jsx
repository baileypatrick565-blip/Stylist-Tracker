import React, { useEffect, useState } from 'react';
import Inventory from './components/Inventory';

export default function App() {
  // Initialize clients from localStorage or empty array
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('clients');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [newClient, setNewClient] = useState({ name: '', color: '', phone: '' });
  const [editingIndex, setEditingIndex] = useState(-1);

  const addClient = () => {
    if (!newClient.name) return;
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    setNewClient({ name: '', color: '', date: '' });
    // Save immediately after update
    try {
      localStorage.setItem('clients', JSON.stringify(updatedClients));
    } catch (e) {}
  };

  const deleteClient = (index) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
    try {
      localStorage.setItem('clients', JSON.stringify(updatedClients));
    } catch (e) {}
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewClient({ ...clients[index] });
  };

  const saveEdit = () => {
    if (!newClient.name) return;
    const updatedClients = [...clients];
    updatedClients[editingIndex] = newClient;
    setClients(updatedClients);
    setNewClient({ name: '', color: '', date: '' });
    setEditingIndex(-1);
    try {
      localStorage.setItem('clients', JSON.stringify(updatedClients));
    } catch (e) {}
  };

  const cancelEdit = () => {
    setNewClient({ name: '', color: '', date: '' });
    setEditingIndex(-1);
  };

  // Save clients whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('clients', JSON.stringify(clients));
    } catch (e) {}
  }, [clients]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center max-w-lg mx-auto mb-6">
        <h1 className="text-3xl font-bold text-pink-700">💇 Stylist Tracker</h1>
        <a
          href="https://app.squareup.com/dashboard/appointments/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          📅 Schedule
        </a>
      </div>

      <div className="max-w-lg mx-auto bg-white p-4 rounded-2xl shadow">
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Client name"
          value={newClient.name}
          onChange={e => setNewClient({ ...newClient, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Color formula"
          value={newClient.color}
          onChange={e => setNewClient({ ...newClient, color: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2 rounded"
          type="tel"
          placeholder="Phone (xxx-xxx-xxxx)"
          value={newClient.phone}
          onChange={e => {
            const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
            const formatted = input.length >= 10 
              ? `${input.slice(0,3)}-${input.slice(3,6)}-${input.slice(6,10)}`
              : input.replace(/(\d{3})(?=\d)/g, '$1-');
            setNewClient({ ...newClient, phone: formatted });
          }}
          maxLength={12}
        />
        {editingIndex >= 0 ? (
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex-1"
            >
              Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex-1"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={addClient}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
          >
            Add Client
          </button>
        )}
      </div>

      <div className="mt-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-pink-700">Client List</h2>
        <ul className="space-y-2">
          {clients.map((client, i) => (
            <li key={i} className="p-3 bg-white rounded-lg shadow flex justify-between items-center">
              <div className="flex-1 flex justify-between mr-4">
                <span>{client.name}</span>
                <span className="text-sm text-gray-500">{client.color}</span>
                <span className="text-sm text-gray-400">{client.phone}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(i)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteClient(i)}
                  className="text-red-600 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Inventory is now a separate component */}
      <Inventory />
    </div>
  );
}