import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createTask } from '../services/taskService';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!title || title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    if (!description || description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await createTask({ title, description, status });
      toast.success('Task created successfully!');
      navigate('/dashboard');
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors && Array.isArray(serverErrors)) {
        toast.error(serverErrors[0]);
      } else {
        toast.error('Failed to create task');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card shadow-sm rounded-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors ${
              errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., Update landing page copy"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: null });
            }}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Detailed description of the task (min 20 characters)..."
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Initial Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
