const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllTasks,
  getTaskById,
  getTasksByPriority,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task-controller');

// Validation middleware
const taskValidationMiddleware = [
  body('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title cannot be empty'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description cannot be empty'),
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean value'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
];

// Validation middleware for updating a task
const updateTaskValidationMiddleware = [
  body('title').optional().isString().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().isString().notEmpty().withMessage('Description cannot be empty'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean value'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
];

const priorityLevels = ['low', 'medium', 'high'];

const priorityValidationMiddleware = (req, res, next) => {
  if (priorityLevels.includes(req.params.level)) {
    return next();
  }
  return res.status(400).json({ error: 'Priority must be low, medium, or high' });
}


router.get('/tasks', getAllTasks);
router.get('/tasks/:taskId', getTaskById);
router.get('/tasks/priority/:level', priorityValidationMiddleware, getTasksByPriority);
router.post('/tasks', taskValidationMiddleware, createTask);
router.put('/tasks/:taskId', updateTaskValidationMiddleware, updateTask);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;
