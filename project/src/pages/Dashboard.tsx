import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, AlertTriangle, Receipt, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  const stats = {
    totalTransactions: 15234,
    fraudCases: 142,
    suspiciousTransactions: 456,
    activeChargePoints: 89
  };

  const topChargePoints = [
    { name: 'Amsterdam Central', value: 15 },
    { name: 'Rotterdam Station', value: 12 },
    { name: 'Utrecht CS', value: 8 },
    { name: 'Den Haag Centrum', value: 7 },
    { name: 'Eindhoven Airport', value: 5 }
  ];

  const flaggedTests = [
    { name: 'Amount Verification', value: 35 },
    { name: 'Time Pattern', value: 28 },
    { name: 'Location Check', value: 22 },
    { name: 'User Behavior', value: 15 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon={<Receipt className="w-6 h-6 text-blue-600" />}
          trend={{ value: 12, isPositive: true }}
        />
        <Link to="/fraud">
          <DashboardCard
            title="Fraud Cases"
            value={stats.fraudCases}
            icon={<AlertOctagon className="w-6 h-6 text-red-600" />}
            trend={{ value: 8, isPositive: false }}
          />
        </Link>
        <Link to="/suspicious">
          <DashboardCard
            title="Suspicious Transactions"
            value={stats.suspiciousTransactions}
            icon={<AlertTriangle className="w-6 h-6 text-yellow-600" />}
            trend={{ value: 5, isPositive: false }}
          />
        </Link>
        <Link to="/chargepoints">
          <DashboardCard
            title="Active Charge Points"
            value={stats.activeChargePoints}
            icon={<Zap className="w-6 h-6 text-green-600" />}
            trend={{ value: 3, isPositive: true }}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Top Fraud Charge Points</h2>
            <Link to="/chargepoints" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <BarChart width={500} height={300} data={topChargePoints}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Most Flagged Tests</h2>
            <Link to="/reports" className="text-blue-600 hover:text-blue-700 flex items-center">
              View Reports <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <PieChart width={400} height={300}>
            <Pie
              data={flaggedTests}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {flaggedTests.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Fraud Trends</h2>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">+2.5% vs. Last Month</span>
          </div>
        </div>
        {/* Add fraud trends chart here */}
      </div>
    </div>
  );
}

export default Dashboard;