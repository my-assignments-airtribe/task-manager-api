# Task Manager API

A simple RESTful API for managing tasks built with Node.js and Express.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Create a Task](#create-a-task)
  - [Get All Tasks](#get-all-tasks)
  - [Get a Task by ID](#get-a-task-by-id)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
  - [Get Tasks by Priority](#get-tasks-by-priority)
- [Usage](#usage)
- [License](#license)

## Introduction

This Task Manager API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Each task includes a title, description, completion status, and priority level. The API provides various endpoints to manage tasks and allows users to filter and sort tasks as needed.

## Features

- Create a new task with title, description, completion status, and priority.
- Retrieve a list of all tasks.
- Get a specific task by ID.
- Update an existing task, including changing title, description, completion status, and priority.
- Delete a task by ID.
- Filter tasks based on completion status and sort by creation date.
- Retrieve tasks by priority level (e.g., low, medium, high).

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Git for version control (optional).

### Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/my-assignments-airtribe/task-manager-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-api
   ```
3. Install dependencies:

   ```bash
   yarn install
   ```
    or
    ```bash
    npm install
    ```
4. Start the server:

   ```bash
   yarn start
   ```
    or
    ```bash
    npm start
    ```

## API Endpoints

### Create a Task

- **URL:** `/tasks`
- **Method:** `POST`
- **Request Body:**
  - `title` (string, required): Task title.
  - `description` (string, required): Task description.
  - `completed` (boolean): Task completion status (default is `false`).
  - `priority` (string): Task priority level (e.g., 'low', 'medium', 'high').
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"title": "Task 1", "description": "Description 1" }' http://localhost:3000/tasks
  ```


### Get All Tasks
- **URL:** `/tasks`
- **Method:** `GET`
- **Query Parameters:**
  - `completed` (boolean): Filter tasks by completion status (e.g., `completed=true`).
  - `sortBy` (string): Sort tasks by creation date (e.g., `sortBy=createdAt:desc`).
  ```bash
  curl -X GET http://localhost:3000/tasks?completed=true&sort=createdAt&order=desc
  ```

### Get a Task by ID
- **URL:** `/tasks/:taskId`
- **Method:** `GET`
- **URL Parameters:**
  - `taskId` (string, required): Task ID.
  ```bash
  curl -X GET http://localhost:3000/tasks/1
  ```

### Update a Task
- **URL:** `/tasks/:taskId`
- **Method:** `PUT`
- **URL Parameters:**
  - `taskId` (string, required): Task ID.
- **Request Body:**
  - `title` (string): Task title.
  - `description` (string): Task description.
  - `completed` (boolean): Task completion status.
  - `priority` (string): Task priority level (e.g., 'low', 'medium', 'high').
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Task 1", "Updated description": "Description 1" }' http://localhost:3000/tasks/1
  ```

## Usage

To interact with the Task Manager API, follow these steps:

1. Use an API client (e.g., Postman or `curl`) to send HTTP requests to the API endpoints.
2. Create, read, update, and delete tasks as needed using the appropriate HTTP methods and endpoints.
3. Use query parameters to filter and sort tasks for better organization.
4. Retrieve tasks by priority level to focus on important tasks.


## License
This project is licensed under the MIT License.