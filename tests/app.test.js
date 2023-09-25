const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
let tasks = require('../src/tasks');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Task Manager API', () => {

  let server;

  before((done) => {
    // Start the server and store the server instance
    server = app.listen(4000, () => {
      done();
    });
  });

  after((done) => {
    // Close the server when tests are done
    server.close(() => {
      done();
    });
  });


  const initialTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      createdAt: '2023-01-01T12:00:00.000Z',
    },
  ];

  beforeEach(() => {
    // Reset tasks before each test
    // This ensures that each test runs with a clean set of tasks
    // You can also use a test database for this purpose
    tasks.length = 0;
    tasks.push(...initialTasks); // Restore initial tasks
  });

  it('should return all tasks', (done) => {
    chai
      .request(app)
      .get('/tasks')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('tasks');
        expect(res.body.tasks).to.be.an('array');
        expect(res.body.tasks).to.have.lengthOf(tasks.length);
        done();
      });
  });

  it('should return a task if correct id is provided', (done) => {
    const taskId = 1;
    chai
      .request(app)
      .get(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(taskId);
        done();
      });
  });

  it('should return an error if invalid id is provided', (done) => {
    const taskId = 999;
    chai
      .request(app)
      .get(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Task not found');
        done();
      });
  });

  it('should return an error if id is not a number', (done) => {
    const taskId = 'abc';
    chai
      .request(app)
      .get(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Id');
        done();
      });
  });

  it('should return an error if no task is available', (done) => {
    tasks.length = 0;
    chai
      .request(app)
      .get('/tasks')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('No tasks available, Consider adding a task');
        done();
      });
  });

  it('should create a new task if all inputs are provided correctly', (done) => {
    const newTask = {
      title: 'New Task',
      description: 'New Description',
      completed: false,
      priority: 'low',
    };
    chai
      .request(app)
      .post('/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return an error if title is not provided', (done) => {
    const newTask = {
      description: 'New Description',
      completed: false,
      priority: 'low',
    };
    chai
      .request(app)
      .post('/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Title must be a string');
        done();
      });
  });

  it('should return an error if description is not provided', (done) => {
    const newTask = {
      title: 'New Task',
      completed: false,
      priority: 'low',
    };
    chai
      .request(app)
      .post('/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Description must be a string');
        done();
      });
  });

  it('should return an error if priority is not low, medium, or high', (done) => {
    const newTask = {
      title: 'New Task',
      description: 'New Description',
      completed: false,
      priority: 'invalid',
    };
    chai
      .request(app)
      .post('/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Priority must be low, medium, or high');
        done();
      });
  });

  it('should return an error if completed is not false', (done) => {
    const newTask = {
      title: 'New Task',
      description: 'New Description',
      completed: true,
      priority: 'low',
    };
    chai
      .request(app)
      .post('/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Completed must be false during creation');
        done();
      });
  });

  it('should update a task if all inputs are provided correctly', (done) => {
    const taskId = 1;
    const updatedTask = {
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true,
      priority: 'high',
    };
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTask)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return an error if task id is not found', (done) => {
    const taskId = 999;
    const updatedTask = {
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true,
      priority: 'high',
    };
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTask)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Task not found');
        done();
      });
  });

  it('should return an error if task id is not a number', (done) => {
    const taskId = 'abc';
    const updatedTask = {
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true,
      priority: 'high',
    };
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTask)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Task not found');
        done();
      });
  });

  it('should delete a task if task id is found', (done) => {
    const taskId = 1;
    chai
      .request(app)
      .delete(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Task deleted successfully');
        done();
      });
  });

  it('should return an error if task id is not found', (done) => {
    const taskId = 999;
    chai
      .request(app)
      .delete(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Task not found');
        done();
      });
  });
})