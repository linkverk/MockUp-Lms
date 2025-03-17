import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  onSearch: (value: string) => void;
  onFilter: (filters: any) => void;
  onSort: (field: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilter, onSort }) => {
  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'fraudScore', label: 'Fraud Score' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select 
            onChange={(e) => onSort(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => onFilter({})}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;