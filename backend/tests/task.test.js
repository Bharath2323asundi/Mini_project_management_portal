const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../config/db');
const User = require('../models/User');
const Task = require('../models/Task');

let token;
let createdTaskId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create a user and get token for task tests
  const user = await User.create({
    name: 'Task Test User',
    email: 'task_test@example.com',
    password: 'password123'
  });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'task_test@example.com',
      password: 'password123'
    });
  
  token = res.body.data.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task Endpoints', () => {
  
  it('should prevent unauthenticated access', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(401);
  });

  it('should create a new task successfully', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Learn Testing',
        description: 'Write unit and integration tests using Jest and Supertest'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Learn Testing');
    
    createdTaskId = res.body.data.id;
  });

  it('should fail task creation on validation error', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Hi', // too short
        description: 'Short' // too short
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('should fetch all tasks with pagination', async () => {
    const res = await request(app)
      .get('/api/tasks?page=1&limit=5')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.total).toBe(1);
  });

  it('should update a task status', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'In Progress'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.status).toBe('In Progress');
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
