const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// full app middleware
app.use(bodyParser.json());

app.use('/api', require('./routes/tasks'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  console.log(req.method, req.path)
  console.log(res)
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, (error) => {
  if (error) {
    console.log('Error running the server');
    throw new Error('Something bad happened...');
  }
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
