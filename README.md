# todo-back

A modest backend for a todo app

# Todo Backend Application

This is a simple backend application written in Node.js using Express framework and PostgreSQL as the database. The application provides APIs to manage a to-do list, including creating, updating, toggling completion status, and retrieving to-dos.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- PostgreSQL database installed and running
- npm package manager installed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alzca1/todo-back
   cd todo-backend

   ```

2. Install the dependencies:

   ```bash
   npm install

   ```

3. Build the application and you'll see a "dist" folder will be created inside the project's folder:

```bash
 npm run build

```

## Configuration

1. Create a .env file in the root directory and add your PostgreSQL database configuration:

   DB_USER=your_username
   DB_HOST="localhost"
   DB_NAME="todo-app"
   DB_PASSWORD=your_password
   DB_PORT=5432

2. Ensure your PostgreSQL database is running and the database specified in the .env file exists (if not, create it manually with the name 'todo-app').

## Running the application

1. Start the server:

   ```bash
   npm start

   ```

2. The server will start on http://localhost:3000. You'll know you're good to go once you see the following messages on your bash console:

```bash

Table 'todos' created successfully!
connected to the database...
server running on port 3000

```

## API Endpoints

### Create a To-do

- **URL:** `/create-todo`
- **Method:** `POST`
- **Request Body:**

  ```
  {
    "title": "Your todo title"
  }
  ```

- **Responses:**
  - `201 Created`: Successfully created a to-do item.
  - `400 Bad Request`: Title is missing or invalid.
  - `500 Internal Server Error`: An error occurred on the server.

### Update a To-do Title

- **URL:** `/update-todo`
- **Method:** `PATCH`
- **Request Body:**

  ```
  {
    "id": "todo_id",
    "title": "Updated title"
  }
  ```

- **Responses:**
  - `201 Created`: Successfully updated the to-do item.
  - `400 Bad Request`: Invalid id or title.
  - `500 Internal Server Error`: An error occurred on the server.

### Toggle To-do Completion

- **URL:** `/toggle-completed`
- **Method:** `PATCH`
- **Request Body:**

  ```
  {
    "id": "todo_id",
    "completed": true
  }
  ```

- **Responses:**
  - `201 Created`: Successfully toggled the completion status.
  - `400 Bad Request`: Invalid id or completion status.
  - `500 Internal Server Error`: An error occurred on the server.

### Get All To-dos

- **URL:** `/todos`
- **Method:** `GET`
- **Responses:**
  - `200 OK`: Successfully retrieved all to-do items.
  - `204 No Content`: No to-do items found.
  - `500 Internal Server Error`: An error occurred on the server.

## Database Schema

Ensure your PostgreSQL database has the following schema for the to-do items:

```
 CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    "dateCreated" TIMESTAMP NOT NULL DEFAULT NOW(),
    "dateCompleted" TIMESTAMP
 );
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact

If you have any questions or need further assistance, feel free to contact me at alzca1l@gmail.com.
