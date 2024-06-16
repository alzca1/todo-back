import app from "./app";
import dotenv from "dotenv";
import { initializeDB } from "./infrastructure/db/dbConfig";

dotenv.config();
const port = process.env.PORT ?? 3000;

const startServer = async () => {
  await initializeDB();
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
