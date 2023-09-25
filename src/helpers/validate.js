function validateTaskInput(req, res, next) {
  const { title, description, completed, priority } = req.body;

  if (req.method === 'POST') {
    // Check for required fields during task creation
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title must be a string' });
    }

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }
  
    if (completed && completed !== false) {
      return res.status(400).json({ error: 'Completed must be false during creation' });
    }
  }

  // If input is valid, continue to the route handler
  next();
}

module.exports = validateTaskInput;
