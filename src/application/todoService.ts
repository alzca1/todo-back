import { Todo } from "../domain/todo";
import { db } from "../infrastructure/db/dbConfig";

const createTodoService = async (title: string): Promise<Todo> => {
  const client = await db.connect();
  try {
    const newTodo = await client.query(
      'INSERT INTO todos(title, "dateCreated", completed) VALUES ($1, NOW(), $2) RETURNING *',
      [title, false]
    );
    return newTodo.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};

const updateTodoTitleService = async (id: string, title: string): Promise<Todo> => {
  const client = await db.connect();

  try {
    const updatedTodo = await client.query(
      "UPDATE todos SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );

    return updatedTodo.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};

const toggleTodoCompletionService = async (id: string, completed: boolean): Promise<Todo> => {
  const client = await db.connect();

  try {
    const dateCompleted = completed ? new Date().toISOString() : null;
    const toggledTodo = await client.query(
      'UPDATE todos set completed = $1, "dateCompleted" = $2 WHERE id = $3 RETURNING *',
      [completed, dateCompleted, id]
    );

    return toggledTodo.rows[0];
  } catch (error) {
    console.error(error);
    throw Error;
  } finally {
    client.release();
  }
};

const getTodosService = async (): Promise<Todo[]> => {
  const client = await db.connect();

  try {
    const getAllTodos = await client.query("SELECT * FROM todos");
    return getAllTodos.rows;
  } catch (error) {
    console.error(error);
    throw Error;
  } finally {
    client.release();
  }
};

export { createTodoService, updateTodoTitleService, toggleTodoCompletionService, getTodosService };
