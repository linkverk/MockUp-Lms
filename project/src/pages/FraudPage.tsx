import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { Transaction } from '../types';
import { AlertOctagon } from 'lucide-react';

const FraudPage = () => {
  const [fraudCases] = useState<Transaction[]>([
    {
      id: '2',
      date: '2024-03-14',
      amount: 500.00,
      status: 'fraud',
      fraudScore: 0.85,
      failedTests: 3,
      chargePoint: 'CP002'
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

  const fraudStats = {
    totalCases: fraudCases.length,
    fraudPercentage: 2.5,
    avgFailedTests: 2.8
  };

  const handleDownloadCsv = () => {
    const csv = fraudCases.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fraud-cases.csv';
    a.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fraud Cases</h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-red-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Total Fraud Cases</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{fraudStats.totalCases}</p>
        </div>
        
        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="font-semibold text-red-900 mb-2">Fraud Percentage</h3>
          <p className="text-2xl font-bold text-red-700">{fraudStats.fraudPercentage}%</p>
        </div>

        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="font-semibold text-red-900 mb-2">Avg Failed Tests</h3>
          <p className="text-2xl font-bold text-red-700">{fraudStats.avgFailedTests}</p>
        </div>
      </div>
      
      <FilterBar 
        onSearch={(value) => console.log('Search:', value)}
        onFilter={(filters) => console.log('Filters:', filters)}
        onSort={(field) => console.log('Sort:', field)}
      />

      <DataTable
        columns={columns}
        data={fraudCases}
        onDownloadCsv={handleDownloadCsv}
        title="Fraud Cases"
      />
    </div>
  );
};

export default FraudPage;