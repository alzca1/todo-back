import request from "supertest";
import app from "../../src/app";
// import { db } from "../../src/infrastructure/db/dbConfig";

describe("todoService ", () => {
  describe("create-todo POST", () => {
    it("create-todo POST route should return status code 403 if no title is provided", async () => {
      const response = await request(app).post("/create-todo").send({});
      expect(response.status).toBe(403);
      expect(response.body).toEqual("A title must be provided in order to save a todo!");
    });

    it("create-todo POST route should return status code 403 if '' is provided as a title", async () => {
      const response = await request(app).post("/create-todo").send({ title: "" });
      expect(response.status).toBe(403);
      expect(response.body).toEqual("A title must be provided in order to save a todo!");
    });

    it("create-todo POST route should return status code 201 if title is provided and therefore correctly saved in the database", async () => {
      const response = await request(app).post("/create-todo").send({ title: "Wash the dishes!" });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        completed: false,
        datecompleted: null,
        datecreated: expect.any(String),
        id: expect.any(Number),
        title: "Wash the dishes!",
      });
    });
  });

  describe.only("update-todo POST", () => {
    it("should return status code 403 if no id is provided", async () => {
      const response = await request(app)
        .patch("/update-todo")
        .send({ title: "Turn the dishwasher on before leaving home 2morrow" });

      expect(response.status).toBe(403);
      expect(response.body).toEqual(
        "A valid id and a valid title must be provided if an update is requested!"
      );
    });

    it("should return status code 403 if updated title is '', null or undefined", async () => {
      const response = await request(app).patch("/update-todo").send({ id: 1, title: "" });

      expect(response.status).toBe(403);
      expect(response.body).toEqual(
        "A valid id and a valid title must be provided if an update is requested!"
      );
    });

    it("should return status code 201 if 'id' and title are provided and the latter is correctly updated in the database", async () => {
      const response = await request(app)
        .patch("/update-todo")
        .send({ id: 1, title: "Take the dog out for a walk", completed: true });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("title", "Take the dog out for a walk");
    });
  });
});
