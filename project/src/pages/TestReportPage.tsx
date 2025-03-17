import React, { useState } from 'react';
import { TestReport } from '../types';
import { FileText, AlertTriangle, CheckCircle, XCircle, Filter } from 'lucide-react';
import FilterBar from '../components/FilterBar';

const TestReportPage = () => {
  const [testReports] = useState<TestReport[]>([
    {
      id: 'TR001',
      date: '2024-03-15',
      testName: 'Amount Verification',
      flaggedData: ['Unusual amount: €1500', 'Multiple transactions within 5 minutes'],
      result: 'fail',
      fraudScore: 0.85
    },
    {
      id: 'TR002',
      date: '2024-03-15',
      testName: 'Location Pattern',
      flaggedData: ['Unusual location pattern detected', 'Distance between transactions exceeds normal range'],
      result: 'fail',
      fraudScore: 0.75
    },
    {
      id: 'TR003',
      date: '2024-03-15',
      testName: 'Time Pattern Analysis',
      flaggedData: [],
      result: 'pass',
      fraudScore: 0.15
    }
  ]);

  const getStatusIcon = (result: 'pass' | 'fail') => {
    switch (result) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-red-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Test Reports</h1>
      </div>

      <FilterBar
        onSearch={(value) => console.log('Search:', value)}
        onFilter={(filters) => console.log('Filters:', filters)}
        onSort={(field) => console.log('Sort:', field)}
      />

      <div className="grid gap-6">
        {testReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(report.result)}
                <h2 className="text-lg font-semibold">{report.testName}</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{report.date}</span>
                <span className={`font-medium ${getFraudScoreColor(report.fraudScore)}`}>
                  Score: {(report.fraudScore * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {report.flaggedData.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Flagged Data Points:</h3>
                <ul className="space-y-2">
                  {report.flaggedData.map((data, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
                    >
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      {data}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No data points were flagged in this test.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestReportPage;