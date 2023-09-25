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
- [Contributing](#contributing)
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

URL: /tasks
Method: POST
Request Body:
title (string, required): Task title.
description (string, required): Task description.
completed (boolean): Task completion status (default is false).
priority (string): Task priority level (e.g., 'low', 'medium', 'high').

### Get All Tasks
URL: /tasks
Method: GET

### Get a Task by ID
URL: /tasks/:taskId
Method: GET

### Update a Task
URL: /tasks/:taskId
Method: PUT
Request Body:
title (string): New task title.
description (string): New task description.
completed (boolean, required): New task completion status.
priority (string): New task priority level (e.g., 'low', 'medium', 'high').
Delete a Task
URL: /tasks/:taskId
Method: DELETE
Get Tasks by Priority
URL: /tasks/priority/:level
Method: GET
URL Parameters:
level (string, required): Priority level (e.g., 'low', 'medium', 'high').

## Usage
Use an API client (e.g., Postman or curl) to interact with the endpoints.
Create, read, update, and delete tasks as needed.
Filter and sort tasks using query parameters for better organization.
Retrieve tasks by priority level to focus on important tasks.

## License
This project is licensed under the MIT License.