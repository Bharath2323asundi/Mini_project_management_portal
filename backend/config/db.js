const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// We use sqlite in test environments for fast, isolated tests
const isTestEnv = process.env.NODE_ENV === 'test';

const sequelize = isTestEnv 
  ? new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '..', 'test_db.sqlite'),
      logging: false // Disable logging for tests to keep console clean
    })
  : new Sequelize(
      process.env.DB_NAME || 'mini_project_db',
      process.env.DB_USER || 'root',
      process.env.DB_PASS || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false, // Disable SQL query logging in console
        dialectOptions: process.env.DB_SSL === 'true' ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : {}
      }
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
