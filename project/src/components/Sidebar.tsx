import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, AlertTriangle, AlertOctagon, Zap, FileText, Users } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/suspicious', icon: AlertTriangle, label: 'Suspicious' },
    { path: '/fraud', icon: AlertOctagon, label: 'Fraud' },
    { path: '/chargepoints', icon: Zap, label: 'Charge Points' },
    { path: '/clients', icon: Users, label: 'Clients' },
    { path: '/reports', icon: FileText, label: 'Test Reports' }
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Fraud Monitor</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors ${
              isActive(item.path) ? 'bg-blue-50 border-r-4 border-blue-600' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;