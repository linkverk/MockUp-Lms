import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { ChargePoint } from '../types';
import { Zap } from 'lucide-react';

const ChargePointsPage = () => {
  const [chargePoints] = useState<ChargePoint[]>([
    {
      id: 'CP001',
      location: 'Amsterdam Central',
      fraudCases: 5,
      totalTransactions: 1200
    },
    // Add more sample data
  ]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'location', label: 'Location' },
    { key: 'fraudCases', label: 'Fraud Cases' },
    { key: 'totalTransactions', label: 'Total Transactions' }
  ];

  const handleDownloadCsv = () => {
    const csv = chargePoints.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'charge-points.csv';
    a.click();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Charge Points</h1>
      </div>
      
      <FilterBar 
        onSearch={(value) => console.log('Search:', value)}
        onFilter={(filters) => console.log('Filters:', filters)}
        onSort={(field) => console.log('Sort:', field)}
      />

      <DataTable
        columns={columns}
        data={chargePoints}
        onDownloadCsv={handleDownloadCsv}
        title="Charge Points Overview"
      />
    </div>
  );
};

export default ChargePointsPage;