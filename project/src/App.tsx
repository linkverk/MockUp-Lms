import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import FraudPage from './pages/FraudPage';
import SuspiciousPage from './pages/SuspiciousPage';
import ChargePointsPage from './pages/ChargePointsPage';
import TestReportPage from './pages/TestReportPage';
import ClientsPage from './pages/ClientsPage';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/suspicious" element={<SuspiciousPage />} />
            <Route path="/fraud" element={<FraudPage />} />
            <Route path="/chargepoints" element={<ChargePointsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/reports" element={<TestReportPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;