import React from 'react';
import { ChargePoint, Transaction } from '../types';
import { AlertOctagon, TrendingUp } from 'lucide-react';

interface ChargePointDetailProps {
  chargePoint: ChargePoint;
}

const ChargePointDetail: React.FC<ChargePointDetailProps> = ({ chargePoint }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{chargePoint.location}</h2>
          <span className="text-gray-500">ID: {chargePoint.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-red-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Fraud Cases</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{chargePoint.fraudCases}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Total Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{chargePoint.totalTransactions}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-xl">
          <h3 className="font-semibold text-orange-900 mb-2">Fraud Percentage</h3>
          <p className="text-2xl font-bold text-orange-700">
            {((chargePoint.fraudCases / chargePoint.totalTransactions) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {chargePoint.recentTransactions && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {chargePoint.recentTransactions.map((transaction: Transaction) => (
              <div
                key={transaction.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Transaction {transaction.id}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{transaction.amount.toFixed(2)}</p>
                    <p className={`text-sm ${
                      transaction.status === 'fraud' ? 'text-red-600' : 
                      transaction.status === 'suspicious' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargePointDetail;