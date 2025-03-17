import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { Client } from '../types';
import { Users, AlertTriangle, AlertOctagon } from 'lucide-react';

const ClientsPage = () => {
  const [clients] = useState<Client[]>([
    {
      id: 'C001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      totalTransactions: 156,
      fraudCases: 2,
      suspiciousCases: 5,
      lastTransaction: '2024-03-15',
      riskScore: 0.35
    },
    {
      id: 'C002',
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      totalTransactions: 89,
      fraudCases: 0,
      suspiciousCases: 1,
      lastTransaction: '2024-03-14',
      riskScore: 0.12
    },
    {
      id: 'C003',
      name: 'Michael Brown',
      email: 'm.brown@example.com',
      totalTransactions: 234,
      fraudCases: 4,
      suspiciousCases: 8,
      lastTransaction: '2024-03-15',
      riskScore: 0.75
    }
  ]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'totalTransactions', label: 'Total Transactions' },
    { key: 'fraudCases', label: 'Fraud Cases' },
    { key: 'suspiciousCases', label: 'Suspicious Cases' },
    { key: 'lastTransaction', label: 'Last Transaction' },
    { key: 'riskScore', label: 'Risk Score' }
  ];

  const handleDownloadCsv = () => {
    const csv = clients.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.csv';
    a.click();
  };

  const clientStats = {
    totalClients: clients.length,
    totalFraudCases: clients.reduce((sum, client) => sum + client.fraudCases, 0),
    totalSuspiciousCases: clients.reduce((sum, client) => sum + client.suspiciousCases, 0)
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Total Clients</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{clientStats.totalClients}</p>
        </div>
        
        <div className="bg-red-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Total Fraud Cases</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{clientStats.totalFraudCases}</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Suspicious Cases</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-700">{clientStats.totalSuspiciousCases}</p>
        </div>
      </div>
      
      <FilterBar 
        onSearch={(value) => console.log('Search:', value)}
        onFilter={(filters) => console.log('Filters:', filters)}
        onSort={(field) => console.log('Sort:', field)}
      />

      <DataTable
        columns={columns}
        data={clients}
        onDownloadCsv={handleDownloadCsv}
        title="Client Overview"
      />
    </div>
  );
};

export default ClientsPage;