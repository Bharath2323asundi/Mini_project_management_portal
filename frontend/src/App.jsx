import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
              <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-task" 
                  element={
                    <ProtectedRoute>
                      <AddTask />
                    </ProtectedRoute>
                  } 
                />

                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
