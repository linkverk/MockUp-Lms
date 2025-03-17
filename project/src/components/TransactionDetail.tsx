import React from 'react';
import { Transaction, TestReport } from '../types';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface TransactionDetailProps {
  transaction: Transaction;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fraud': return 'text-red-600';
      case 'suspicious': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getTestIcon = (result: string) => {
    switch (result) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Transaction Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Transaction ID</p>
            <p className="font-medium">{transaction.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Date</p>
            <p className="font-medium">{transaction.date}</p>
          </div>
          <div>
            <p className="text-gray-600">Amount</p>
            <p className="font-medium">€{transaction.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className={`font-medium ${getStatusColor(transaction.status)}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Fraud Score</p>
            <p className="font-medium">{(transaction.fraudScore * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-600">Charge Point</p>
            <p className="font-medium">{transaction.chargePoint}</p>
          </div>
        </div>
      </div>

      {transaction.tests && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Test Results</h3>
          <div className="space-y-4">
            {transaction.tests.map((test: TestReport) => (
              <div key={test.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTestIcon(test.result)}
                    <h4 className="font-medium">{test.testName}</h4>
                  </div>
                  <span className="text-sm text-gray-500">{test.date}</span>
                </div>
                {test.flaggedData.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Flagged Data:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {test.flaggedData.map((data, index) => (
                        <li key={index}>{data}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Location</h3>
        <div className="w-full h-64">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          // Je hoeft alleen maar de src url aan te passen!!!!!
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2460.918344547285!2d4.481451912416727!3d51.917200871792225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4335dd6b0b5a3%3A0x3b8dcf047e6f0073!2sWijnhaven%20107%2C%203011%20WN%20Rotterdam!5e0!3m2!1snl!2snl!4v1742218588652!5m2!1snl!2snl"
          loading="lazy"
          allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;