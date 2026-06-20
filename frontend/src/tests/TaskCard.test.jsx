import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TaskCard from '../components/TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task description',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  it('renders task details correctly', () => {
    render(<TaskCard task={mockTask} onStatusChange={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test task description')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('calls onStatusChange when Complete button is clicked', () => {
    const mockOnStatusChange = vi.fn();
    render(<TaskCard task={mockTask} onStatusChange={mockOnStatusChange} onDelete={vi.fn()} />);
    
    fireEvent.click(screen.getByText('Complete'));
    expect(mockOnStatusChange).toHaveBeenCalledWith(1, 'Completed');
  });

  it('disables Complete button if status is already Completed', () => {
    const completedTask = { ...mockTask, status: 'Completed' };
    render(<TaskCard task={completedTask} onStatusChange={vi.fn()} onDelete={vi.fn()} />);
    
    const completeButton = screen.getByText('Complete');
    expect(completeButton).toBeDisabled();
  });

  it('calls onDelete when Delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(<TaskCard task={mockTask} onStatusChange={vi.fn()} onDelete={mockOnDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
