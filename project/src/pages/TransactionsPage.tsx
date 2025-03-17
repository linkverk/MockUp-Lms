import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import TransactionDetail from '../components/TransactionDetail';
import { Transaction } from '../types';
import { X } from 'lucide-react';

const TransactionsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-03-15',
      amount: 150.00,
      status: 'normal',
      fraudScore: 0.1,
      failedTests: 0,
      chargePoint: 'CP001',
      tests: [
        {
          id: 'TEST1',
          date: '2024-03-15',
          testName: 'Amount Verification',
          flaggedData: [],
          result: 'pass',
          fraudScore: 0.1
        },
        {
          id: 'TEST2',
          date: '2024-03-15',
          testName: 'Location Pattern',
          flaggedData: [],
          result: 'pass',
          fraudScore: 0.05
        }
      ]
    },
    {
      id: '2',
      date: '2024-03-15',
      amount: 500.00,
      status: 'fraud',
      fraudScore: 0.85,
      failedTests: 3,
      chargePoint: 'CP002',
      tests: [
        {
          id: 'TEST3',
          date: '2024-03-15',
          testName: 'Amount Verification',
          flaggedData: ['Unusual amount: €500'],
          result: 'fail',
          fraudScore: 0.85
        }
      ]
    }
  ]);

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'fraudScore', label: 'Fraud Score' },
    { key: 'failedTests', label: 'Failed Tests' },
    { key: 'chargePoint', label: 'Charge Point' }
  ];

  const handleDownloadCsv = () => {
    const csv = transactions.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h1>
      
      <FilterBar 
        onSearch={(value) => console.log('Search:', value)}
        onFilter={(filters) => console.log('Filters:', filters)}
        onSort={(field) => console.log('Sort:', field)}
      />

      <div className="relative">
        <DataTable
          columns={columns}
          data={transactions}
          onDownloadCsv={handleDownloadCsv}
          title="All Transactions"
          onRowClick={handleRowClick}
        />

        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <TransactionDetail transaction={selectedTransaction} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;