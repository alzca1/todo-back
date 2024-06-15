import { db } from "./dbConfig";

const createTable = async () => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY
            title VARCHAR(255) NOT NULL
            completed BOOLEAN NOT NULL DEFAULT FALSE
            dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
            dateCompleted TIMESTAMP
        )
        `;
    await client.query(createTableQuery);
    await client.query("COMMIT");
    console.info("Table 'todos' created successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating table ", error);
  } finally {
    client.release();
  }
};

export { createTable };
