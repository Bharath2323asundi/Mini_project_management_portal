import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import DashboardStats from '../components/DashboardStats';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTasks, getTaskStats, updateTask, deleteTask } from '../services/taskService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Filtering, Searching, Pagination states
  const [currentFilter, setCurrentFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');

  const limit = 6;

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch tasks with current parameters
      const tasksRes = await getTasks({
        page: currentPage,
        limit,
        status: currentFilter,
        search: searchTerm,
        sort: 'createdAt',
        order: sortOrder
      });

      // Fetch overall stats
      const statsRes = await getTaskStats();

      setTasks(tasksRes.data);
      setTotalPages(tasksRes.totalPages || 1);
      setStats(statsRes.data);

    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentFilter, searchTerm, sortOrder]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handle task status update (Mark as Complete)
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      toast.success('Task marked as completed!');
      fetchDashboardData(); // Refresh list to reflect changes in stats and list
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  // Handle task deletion with confirmation
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        toast.success('Task deleted successfully!');
        
        // If it's the last item on the page and we're not on the first page, go back one page
        if (tasks.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchDashboardData();
        }
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  // Reset pagination when filters change
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    setCurrentPage(1);
  };

  return (
    <div className="pb-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your tasks and track progress</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar onSearch={handleSearch} />
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            title={`Sort by Date: ${sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {sortOrder === 'desc' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
              )}
            </svg>
            <span className="hidden sm:inline">{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="mb-6">
        <FilterBar currentFilter={currentFilter} onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : tasks.length > 0 ? (
        <>
          <TaskList 
            tasks={tasks} 
            onStatusChange={handleStatusChange} 
            onDelete={handleDeleteTask} 
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      ) : (
        <EmptyState 
          message={searchTerm || currentFilter !== 'All' ? "No tasks match your filters" : "You don't have any tasks yet"} 
          showAction={!searchTerm && currentFilter === 'All'}
        />
      )}
    </div>
  );
};

export default Dashboard;
