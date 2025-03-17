import React from 'react';
import { Download } from 'lucide-react';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onDownloadCsv: () => void;
  title: string;
  onRowClick?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onDownloadCsv, title, onRowClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button
          onClick={onDownloadCsv}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.key === 'amount' ? `€${row[column.key].toFixed(2)}` :
                     column.key === 'fraudScore' ? `${(row[column.key] * 100).toFixed(1)}%` :
                     column.key === 'status' ? (
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${row[column.key] === 'fraud' ? 'bg-red-100 text-red-800' :
                          row[column.key] === 'suspicious' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}
                      `}>
                        {row[column.key].charAt(0).toUpperCase() + row[column.key].slice(1)}
                      </span>
                     ) :
                     row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;