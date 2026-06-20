import React from 'react';

const DashboardStats = ({ stats }) => {
  const statCards = [
    { label: 'Total Tasks', value: stats.total || 0, color: 'text-gray-800 dark:text-gray-100', bg: 'bg-gray-100 dark:bg-gray-800' },
    { label: 'Pending', value: stats.pending || 0, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { label: 'In Progress', value: stats.inProgress || 0, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Completed', value: stats.completed || 0, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, idx) => (
        <div key={idx} className={`${stat.bg} rounded-xl p-6 shadow-sm border border-black border-opacity-5 dark:border-white dark:border-opacity-5 transition-transform hover:scale-105 duration-200`}>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
