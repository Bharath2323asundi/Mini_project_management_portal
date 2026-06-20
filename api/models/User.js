const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the User model matching our database schema
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  }
}, {
  tableName: 'users',
  timestamps: true, // Sequelize automatically manages createdAt and updatedAt
  updatedAt: false, // We only have created_at in the users schema
});

module.exports = User;
