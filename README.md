# Mini Project Management Portal

## Overview
A full-stack Mini Project Management Portal built to help users seamlessly manage their tasks. This responsive web app allows users to create, view, update, and delete tasks while tracking progress through clear dashboard statistics. The application implements advanced security with JWT authentication and features dark mode, sorting, filtering, and pagination for optimal user experience.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Axios, React Router Dom, React Hot Toast
- **Backend**: Node.js, Express.js, Sequelize ORM, jsonwebtoken, bcryptjs, express-validator
- **Database**: MySQL (for production/dev) and SQLite (for tests)
- **Testing**: Jest, Supertest (Backend) & Vitest, React Testing Library (Frontend)

## Folder Structure
```
project-root/
├─ frontend/                # React App (Vite)
│ ├─ src/
│ │ ├─ components/          # Reusable UI components
│ │ ├─ pages/               # Top-level route components
│ │ ├─ services/            # Axios API calls
│ │ ├─ context/             # Auth and Theme context
│ │ ├─ tests/               # React Testing Library test cases
│ │ ├─ App.jsx
│ │ ├─ main.jsx
│ │ └─ index.css
│ ├─ .env.example
│ ├─ package.json
│ ├─ tailwind.config.js
│ └─ vite.config.js
├─ backend/                 # Express API
│ ├─ routes/                # API Endpoints definition
│ ├─ controllers/           # Request handlers and logic
│ ├─ models/                # Sequelize Models (User, Task)
│ ├─ middleware/            # Auth, Validation and Error handling
│ ├─ config/                # Database configuration
│ ├─ tests/                 # Jest/Supertest test cases
│ ├─ .env.example
│ ├─ server.js
│ └─ package.json
├─ README.md
└─ schema.sql
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MySQL Server running locally (or remote)

### 1. Database Setup
Ensure you have MySQL running. Then load the initial schema and test user:
```bash
mysql -u your_username -p < schema.sql
```
This will create `mini_project_db`, the necessary tables, and insert seed data including a test user.

### 2. Backend Setup
Navigate into the `backend` folder:
```bash
cd backend
npm install
```
Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your DB_USER, DB_PASS, etc if necessary
```
Start the server:
```bash
npm start
```
(Server will run on `http://localhost:5000`)

### 3. Frontend Setup
Navigate into the `frontend` folder:
```bash
cd frontend
npm install
```
Configure environment variables:
```bash
cp .env.example .env
# Ensure VITE_API_URL points to the backend URL
```
Start the frontend app:
```bash
npm run dev
```
(Frontend will be accessible at `http://localhost:5173`)

### 4. How to run tests
**Backend Tests:**
```bash
cd backend
npm test
```
**Frontend Tests:**
```bash
cd frontend
npm test
```

## API Documentation

### Auth Endpoints
| Method | Endpoint | Description | Request Body | Sample Response |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register user | `{ "name": "...", "email": "...", "password": "..." }` | `201` `{ "success": true, "data": { "id": 1, ... } }` |
| `POST` | `/api/auth/login` | Login user | `{ "email": "...", "password": "..." }` | `200` `{ "success": true, "data": { "token": "...", "user": {...} } }` |

### Task Endpoints (Requires Authorization: Bearer <token>)
| Method | Endpoint | Description | Query / Body | Sample Response |
|---|---|---|---|---|
| `GET` | `/api/tasks` | Get paginated, filtered, sorted tasks | `?page=1&limit=6&status=Pending&search=abc&sort=createdAt&order=desc` | `200` `{ "success": true, "data": [...], "total": 10, "page": 1, "totalPages": 2 }` |
| `GET` | `/api/tasks/stats` | Get dashboard stats | None | `200` `{ "success": true, "data": { "total": 10, "pending": 3, "inProgress": 2, "completed": 5 } }` |
| `GET` | `/api/tasks/:id` | Get single task | Params: `id` | `200` `{ "success": true, "data": { ... } }` |
| `POST` | `/api/tasks` | Create task | `{ "title": "...", "description": "...", "status": "Pending" }` | `201` `{ "success": true, "data": { ... } }` |
| `PUT` | `/api/tasks/:id` | Update task | `{ "title": "...", "status": "Completed" }` | `200` `{ "success": true, "data": { ... } }` |
| `DELETE`| `/api/tasks/:id` | Delete task | Params: `id` | `200` `{ "success": true, "data": null }` |

## Assumptions Made
- Single user task ownership: A user can only see and manage their own tasks.
- No email verification or forgot password flow to keep it simple.
- Tasks are strictly bound to three predefined status values: 'Pending', 'In Progress', 'Completed'.
- Soft deletes are not implemented; deletion is permanent.
- JWT is stored in local storage for the sake of simplicity matching beginner level guidelines.
- The UI follows a mobile-first approach. Cards switch to tables gracefully on large screens.
