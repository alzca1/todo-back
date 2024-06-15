import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createTodoService, updateTodoTitleService } from "./application/todoService";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create-todo", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      res.status(403).json("A title must be provided in order to save a todo!");
      return;
    }

    const newTodo = await createTodoService(title);

    if (newTodo) {
      res.status(201).json(newTodo);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.patch("/update-todo", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, title } = req.body;

    if (!id || !title || title.trim() === "") {
      res
        .status(403)
        .json("A valid id and a valid title must be provided if an update is requested!");
      return;
    }

    const updatedTodo = await updateTodoTitleService(id, title);

    if (updatedTodo) {
      res.status(201).json(updatedTodo);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default app;
