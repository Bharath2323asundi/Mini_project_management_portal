const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend origin
app.use(express.json()); // Parse incoming JSON requests

// Connect to Database
connectDB();

// Sync models with database
// Note: In production, you would typically use migrations rather than sync()
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: false }).then(() => {
    console.log('Database synced.');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export for testing
