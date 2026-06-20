import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { createTask } from '../services/taskService';
import toast from 'react-hot-toast';

// Mock the dependencies
jest.mock('../services/taskService');
jest.mock('react-hot-toast');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('TaskForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<TaskForm />, { wrapper: BrowserRouter });
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(<TaskForm />, { wrapper: BrowserRouter });
    
    // Submit form without filling fields
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));
    
    expect(await screen.findByText('Title must be at least 3 characters long')).toBeInTheDocument();
    expect(await screen.findByText('Description must be at least 20 characters long')).toBeInTheDocument();
  });

  it('calls createTask API on valid submission', async () => {
    createTask.mockResolvedValueOnce({ success: true, data: { id: 1 } });
    
    render(<TaskForm />, { wrapper: BrowserRouter });
    
    fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'Valid Title' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'This is a valid description that is longer than twenty characters' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));
    
    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith({
        title: 'Valid Title',
        description: 'This is a valid description that is longer than twenty characters',
        status: 'Pending'
      });
      expect(toast.success).toHaveBeenCalledWith('Task created successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
