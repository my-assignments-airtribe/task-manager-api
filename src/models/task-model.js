
class Task {
  constructor(id, title, description, completed, priority, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed || false;
    this.priority = priority || 'low';
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Task;