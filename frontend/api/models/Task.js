const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

// Define the Task model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    defaultValue: 'Pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id', // Map to DB column name
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
}, {
  tableName: 'tasks',
  timestamps: true,
});

// Setup relationships
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
