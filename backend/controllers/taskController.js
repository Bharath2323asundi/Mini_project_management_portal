const { Op } = require('sequelize');
const Task = require('../models/Task');

// Get all tasks with pagination, search, sorting, and filtering
exports.getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Default parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const status = req.query.status || '';
    const search = req.query.search || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

    const offset = (page - 1) * limit;

    // Build the query where clause
    const whereClause = {
      userId: userId
    };

    // Filter by status if provided
    if (status && status !== 'All') {
      whereClause.status = status;
    }

    // Search by title if provided
    if (search) {
      whereClause.title = {
        [Op.like]: `%${search}%`
      };
    }

    // Map query parameter sort to DB column name
    const orderCol = sort === 'created_at' ? 'createdAt' : sort;

    // Fetch tasks using Sequelize findAndCountAll for pagination
    const { count, rows } = await Task.findAndCountAll({
      where: whereClause,
      order: [[orderCol, order]],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: rows,
      total: count,
      page: page,
      totalPages: totalPages
    });
  } catch (error) {
    next(error);
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const newTask = await Task.create({
      title,
      description,
      status: status || 'Pending',
      userId
    });

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.id;

    // Find the task and ensure it belongs to the current user
    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Update fields if provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Get stats for the dashboard
exports.getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch total counts grouped by status
    // Using simple aggregations so beginners can understand easily
    const total = await Task.count({ where: { userId } });
    const pending = await Task.count({ where: { userId, status: 'Pending' } });
    const inProgress = await Task.count({ where: { userId, status: 'In Progress' } });
    const completed = await Task.count({ where: { userId, status: 'Completed' } });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        inProgress,
        completed
      }
    });
  } catch (error) {
    next(error);
  }
};
