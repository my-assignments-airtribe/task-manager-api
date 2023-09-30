
class Task {
  constructor(id, title, description, completed, priority, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Task;