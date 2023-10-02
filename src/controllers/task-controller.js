let tasks = require('../tasks.json');
const { v4: uuidv4 } = require('uuid');
const Task = require('../models/task-model');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');


// Handle GET /tasks
// GET /tasks?completed=true
// GET /tasks?sort=createdAt&order=desc
// GET /tasks?completed=true&sort=createdAt&order=desc
getAllTasks = (req, res) => {
  let filteredTasks = [...tasks];

  // Filter tasks based on completion status
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === completed);
  }

  // Sort tasks
  if (req.query.sort === 'createdAt') {
    if (req.query.order === 'desc') {
      filteredTasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else {
      filteredTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
  }

  if (filteredTasks.length > 0) {
    res.status(200).json({ tasks:filteredTasks });
  }
  else {
    res.status(200).json({ tasks: [], message: 'No tasks found' });
  }
};

// Handle GET /tasks/:taskId
getTaskById = (req, res) => {
  const taskId = req.params.taskId.trim();
  let task;
  if (taskId) {
    task = tasks.find(task => task.id === taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid Id' });
  }
};

getTasksByPriority = (req, res) => {
  // Convert level to lowercase for case-insensitive matching
  const level = req.params.level.toLowerCase().trim(); 
  const filteredTasks = tasks.filter(task => task.priority.toLowerCase() === level);
  if (filteredTasks.length > 0) {
    res.status(200).json({ tasks: filteredTasks });
  }
  else {
    res.status(200).json({ message: `No ${level} priority tasks found` });
  }
};

// Handle POST /tasks
createTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, completed, priority } = req.body;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newTask = new Task(uuidv4(), title, description, completed, priority, createdAt, updatedAt );
  tasks.push(newTask);
  fs.writeFile(path.join(__dirname, '../tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Writing to the DB failed' });
    }
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  });
};

// Handle PUT /tasks/:taskId
updateTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const taskId = req.params.taskId.trim();
  // Find the index of the task with the given ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    const { title, description, completed, priority } = req.body;

    tasks[taskIndex] = new Task(
      taskId,
      title ? title : tasks[taskIndex].title,
      description ? description : tasks[taskIndex].description,
      completed ? completed : tasks[taskIndex].completed,
      priority ? priority : tasks[taskIndex].priority,
      tasks[taskIndex].createdAt,
      new Date().toISOString()
    );

    // Save the updated tasks
    fs.writeFile(
      path.join(__dirname, '../tasks.json'),
      JSON.stringify(tasks, null, 2),
      (err) => {
        if (err) {
          res.status(500).json({ error: 'Writing to the DB failed' });
        } else {
          res.status(201).json({ message: 'Task updated successfully', task: tasks[taskIndex] });
        }
      }
    );
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

// Handle DELETE /tasks/:taskId
deleteTask = (req, res) => {
  const taskId = req.params.taskId.trim();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    fs.writeFile(
      path.join(__dirname, '../tasks.json'),
      JSON.stringify(tasks, null, 2),
      (err) => {
        if (err) {
          res.status(500).json({ error: 'Writing to the DB failed' });
        } else {
          res.json({ message: 'Task deleted successfully' });
        }
      }
    );
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  getTasksByPriority,
  createTask,
  updateTask,
  deleteTask,
}