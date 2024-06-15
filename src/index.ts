import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/dbConfig";

dotenv.config();
const port = process.env.PORT ?? 3000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
