import React from 'react';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  // Determine badge color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1 mr-2" title={task.title}>
          {task.title}
        </h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      <div className="flex-grow">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-xs text-gray-500 dark:text-gray-500 self-start sm:self-center">
          Added: {formatDate(task.createdAt)}
        </span>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => onStatusChange(task.id, 'Completed')}
            disabled={task.status === 'Completed'}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              task.status === 'Completed'
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                : 'bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/40'
            }`}
          >
            Complete
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
