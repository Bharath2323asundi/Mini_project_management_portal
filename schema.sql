CREATE DATABASE IF NOT EXISTS mini_project_db;
USE mini_project_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed Data
-- Password for the seed user is 'password123' (hashed using bcrypt with 10 salt rounds)
INSERT INTO users (name, email, password) 
VALUES ('Test User', 'test@example.com', '$2a$10$7/xM1TclxY1/O/E9DxyRj..gK6rM5U08s1RSt9yZJ8O/FqP7iH/kK')
ON DUPLICATE KEY UPDATE name=name;

-- We assume the user ID is 1 for these tasks
INSERT INTO tasks (title, description, status, user_id) VALUES 
('Setup React Project', 'Initialize Vite project, install dependencies like React Router and Tailwind CSS. Setup basic folder structure.', 'Completed', 1),
('Design Database Schema', 'Create tables for users and tasks with relationships. Write schema.sql with seed data.', 'Completed', 1),
('Implement JWT Auth', 'Create login and register endpoints. Setup bcrypt for password hashing and generate JWT token upon successful login.', 'In Progress', 1),
('Build Dashboard UI', 'Create responsive task cards, filter bar, and search functionality. Integrate with Tailwind CSS.', 'Pending', 1),
('Write Unit Tests', 'Write tests for backend endpoints using Jest and Supertest. Add frontend tests using React Testing Library.', 'Pending', 1);
