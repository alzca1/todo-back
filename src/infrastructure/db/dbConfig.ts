import { Pool } from "pg";
import dotenv from "dotenv";
import { createTable } from "./createTable";

dotenv.config();

let connection: any;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432"),
});

const initializeDB = async () => {
  try {
    connection = await db.connect();
    await createTable();
    console.info("connected to the database...");
  } catch (error) {
    console.error("Database connection error ", error);
    throw error;
  }
};

export { db, initializeDB };
