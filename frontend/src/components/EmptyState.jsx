import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ message = "No tasks found", showAction = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-full mb-4">
        <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{message}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
        Get started by creating a new task to manage your workflow better.
      </p>
      {showAction && (
        <Link
          to="/add-task"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Task
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
