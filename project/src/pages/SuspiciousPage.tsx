import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { Transaction } from '../types';
import { AlertTriangle } from 'lucide-react';

const SuspiciousPage = () => {
  const [suspiciousCases] = useState<Transaction[]>([
    {
      id: '3',
      date: '2024-03-13',
      amount: 300.00,
      status: 'suspicious',
      fraudScore: 0.6,
      failedTests: 2,
      chargePoint: 'CP003'
    },
    // Add more sample data
  ]);

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'fraudScore', label: 'Fraud Score' },
    { key: 'failedTests', label: 'Failed Tests' },
    { key: 'chargePoint', label: 'Charge Point' }
  ];

  const suspiciousStats = {
    totalCases: suspiciousCases.length,
    suspiciousPercentage: 5.8,
    avgFailedTests: 1.5
  };

  const handleDownloadCsv = () => {
    const csv = suspiciousCases.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suspicious-cases.csv';
    a.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Suspicious Transactions</h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-yellow-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Total Suspicious Cases</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-700">{suspiciousStats.totalCases}</p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-xl">
          <h3 className="font-semibold text-yellow-900 mb-2">Suspicious Percentage</h3>
          <p className="text-2xl font-bold text-yellow-700">{suspiciousStats.suspiciousPercentage}%</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl">
          <h3 className="font-semibold text-yellow-900 mb-2">Avg Failed Tests</h3>
          <p className="text-2xl font-bold text-yellow-700">{suspiciousStats.avgFailedTests}</p>
        </div>
      </div>
      
      <FilterBar 
        onSearch={(value) => console.log('Search:', value)}
        onFilter={(filters) => console.log('Filters:', filters)}
        onSort={(field) => console.log('Sort:', field)}
      />

      <DataTable
        columns={columns}
        data={suspiciousCases}
        onDownloadCsv={handleDownloadCsv}
        title="Suspicious Cases"
      />
    </div>
  );
};

export default SuspiciousPage;