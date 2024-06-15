import { Todo } from "../domain/todo";
import { db } from "../infrastructure/db/dbConfig";

const createTodoService = async (title: string): Promise<Todo> => {
  const client = await db.connect();
  try {
    const newTodo = await client.query(
      "INSERT INTO todos(title, dateCreated, completed) VALUES ($1, NOW(), $2) RETURNING *",
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

export { createTodoService };
