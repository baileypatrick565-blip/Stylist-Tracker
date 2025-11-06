import React, { useEffect, useState } from 'react';
import Inventory from './components/Inventory';

export default function App() {
  // Initialize clients from localStorage or empty array
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clients from './pages/Clients';
import InventoryPage from './pages/InventoryPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}