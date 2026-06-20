const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Validation rules for task creation
const taskValidation = [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status value')
];

// Validation rules for task update
const updateValidation = [
  body('title').optional().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').optional().isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status value')
];

// Apply auth middleware to all routes below this line
router.use(authMiddleware);

// Routes
router.get('/', taskController.getTasks);
router.get('/stats', taskController.getTaskStats); // /stats must come before /:id to prevent matching 'stats' as an id
router.get('/:id', taskController.getTaskById);
router.post('/', taskValidation, validateRequest, taskController.createTask);
router.put('/:id', updateValidation, validateRequest, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
