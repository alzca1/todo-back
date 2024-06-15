import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT ?? 3000;

const startServer = async () => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
