// Centralized error handler middleware
// This prevents scattered try/catch blocks and ensures a consistent JSON error format
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: err.errors || [] // Optional array of specific errors
  });
};

module.exports = errorHandler;
