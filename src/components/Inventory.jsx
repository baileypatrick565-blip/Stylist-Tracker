import React, { useEffect, useState } from 'react';

export default function Inventory() {
  // Initialize inventory from localStorage or empty array
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('inventory');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure qty is a number on load
        return parsed.map(it => ({ ...it, qty: Number(it.qty) || 0 }));
      }
      return [];
    } catch (e) {
      return [];
    }
  });
  const [newItem, setNewItem] = useState({ product: '', shade: '', qty: '' });
  const [editingIndex, setEditingIndex] = useState(-1);

  // Save inventory whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    } catch (e) {}
  }, [inventory]);

  const addItem = () => {
    if (!newItem.product) return;
    const itemToStore = { ...newItem, qty: Number(newItem.qty) || 0 };
    setInventory([...inventory, itemToStore]);
    setNewItem({ product: '', shade: '', qty: '' });
  };

  const deleteItem = (index) => {
    const updated = inventory.filter((_, i) => i !== index);
    setInventory(updated);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewItem({ ...inventory[index] });
  };

  const saveEdit = () => {
    if (!newItem.product) return;
    const updated = [...inventory];
    updated[editingIndex] = { ...newItem, qty: Number(newItem.qty) || 0 };
    setInventory(updated);
    setNewItem({ product: '', shade: '', qty: '' });
    setEditingIndex(-1);
  };

  const cancelEdit = () => {
    setNewItem({ product: '', shade: '', qty: '' });
    setEditingIndex(-1);
  };

  const updateQuantity = (index, change) => {
    const updated = [...inventory];
    const current = Number(updated[index].qty) || 0;
    const newQty = current + change;
    updated[index] = { ...updated[index], qty: newQty < 0 ? 0 : newQty };
    setInventory(updated);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-pink-700">🎨 Color Inventory</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
        <input
          className="border p-2 rounded"
          placeholder="Product name"
          value={newItem.product}
          onChange={(e) => setNewItem({ ...newItem, product: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Shade or tone"
          value={newItem.shade}
          onChange={(e) => setNewItem({ ...newItem, shade: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Quantity"
          value={newItem.qty}
          onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
        />
      </div>

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
          onClick={addItem}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
        >
          ➕ Add to Inventory
        </button>
      )}

      <ul className="mt-4 space-y-2">
        {inventory.map((item, i) => (
          <li
            key={i}
            className={item.qty <= 2 ? 'p-3 bg-red-50 border rounded-lg shadow-sm flex justify-between items-center' : 'p-3 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center'}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{item.product}</span>{' '}
                <span className="text-sm text-gray-500">{item.shade}</span>
                {item.qty <= 2 && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    Low Stock!
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 mr-4">
                <button
                  onClick={() => updateQuantity(i, -1)}
                  className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                >
                  -
                </button>
                <span className={item.qty <= 2 ? 'text-red-600 font-bold' : ''}>
                  {item.qty || 0}
                </span>
                <button
                  onClick={() => updateQuantity(i, 1)}
                  className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => startEdit(i)}
                className="text-blue-600 hover:text-blue-700"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteItem(i)}
                className="text-red-600 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
