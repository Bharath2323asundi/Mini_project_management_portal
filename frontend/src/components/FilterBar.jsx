import React from 'react';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentFilter === filter
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
