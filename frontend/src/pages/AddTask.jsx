import React from 'react';
import TaskForm from '../components/TaskForm';

const AddTask = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <TaskForm />
      </div>
    </div>
  );
};

export default AddTask;
