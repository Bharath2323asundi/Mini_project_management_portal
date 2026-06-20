import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <>
      {/* Mobile/Tablet view: Stacked cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onStatusChange={onStatusChange} 
            onDelete={onDelete} 
          />
        ))}
      </div>

      {/* Desktop view: Table layout */}
      <div className="hidden lg:block bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Task Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Added
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{task.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{task.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                    ${task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  `}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onStatusChange(task.id, 'Completed')}
                    disabled={task.status === 'Completed'}
                    className={`mr-3 ${task.status === 'Completed' ? 'text-gray-400 cursor-not-allowed' : 'text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300'}`}
                  >
                    Complete
                  </button>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskList;
