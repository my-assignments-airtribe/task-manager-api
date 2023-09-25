const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
// middleware
const validateTaskInput  = require('./helpers/validate');
// In Memory Database
let tasks = require('./tasks');
const app = express();
const port = 3000;

app.use(bodyParser.json());




// Get all tasks
// GET /tasks?completed=true
// GET /tasks?sort=createdAt&order=desc
// GET /tasks?completed=true&sort=createdAt&order=desc
app.get('/tasks', (req, res) => {
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
    res.status(404).json({ error: 'No tasks available, Consider adding a task' });
  }
});

// Get a specific task by ID
app.get('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
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
});

// Create a new task
app.post('/tasks', validateTaskInput, (req, res) => {
  const { title, description, completed, priority } = req.body;
  // console.log(req.body);
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: completed || false,
    priority: priority || 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Writing to the DB failed' });
    }
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  });
});



// Update a task by ID
app.put('/tasks/:taskId', validateTaskInput,  (req, res) => {
  const taskId = parseInt(req.params.taskId);

  // Find the index of the task with the given ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    const { title, description, completed } = req.body;
    tasks[taskIndex].title = title ? title : tasks[taskIndex].title;
    tasks[taskIndex].description = description ? description : tasks[taskIndex].description;
    tasks[taskIndex].completed = completed;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    // Save the updated tasks
    fs.writeFile(
      path.join(__dirname, 'tasks.json'),
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
});

// Delete a task by ID
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    fs.writeFile(
      path.join(__dirname, 'tasks.json'),
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
});

// GET /tasks/priority/low
app.get('/tasks/priority/:level', (req, res) => {
  // Convert level to lowercase for case-insensitive matching
  const level = req.params.level.toLowerCase(); 
  const filteredTasks = tasks.filter(task => task.priority.toLowerCase() === level);
  if (filteredTasks.length > 0) {
    res.status(200).json({ tasks: filteredTasks });
  }
  else {
    res.status(404).json({ error: `No ${level} priority tasks found` });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log('Error running the server');
    throw new Error('Something bad happened...');
  }
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
