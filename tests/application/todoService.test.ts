import request from "supertest";
import app from "../../src/app";

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
        dateCompleted: null,
        dateCreated: expect.any(String),
        id: expect.any(Number),
        title: "Wash the dishes!",
      });
    });
  });

  describe("update-todo POST", () => {
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

  describe("toggle-completed PATCH", () => {
    // it returns 403 if no id is provided
    it("should return status code 403 if no id is provided", async () => {
      const response = await request(app)
        .patch("/toggle-completed")
        .send({ completed: false, dateCompleted: Date.now() });

      expect(response.status).toBe(403);
      expect(response.body).toEqual(
        "A valid id and a boolean value must be provided to fulfill the toggle action"
      );
    });

    // it returns 403 if done is different from a boolean
    it("should return a 403 status code if completed contains a non-boolean value", async () => {
      const response = await request(app)
        .patch("/toggle-completed")
        .send({ id: 1, completed: "completed", dateCompleted: Date.now() });

      expect(response.status).toBe(403);
      expect(response.body).toEqual(
        "A valid id and a boolean value must be provided to fulfill the toggle action"
      );
    });

    // it returns 201 if done has "TRUE" value and this and the dateCompleted is filled

    it("should return a 201 status if 'completed' has a 'true' value and 'dateCompleted' is properly added", async () => {
      const response = await request(app)
        .patch("/toggle-completed")
        .send({ id: 1, completed: true });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("completed", true);
    });
    // it returns 201 if the done has "FALSE" value and this is filled and dateCompleted is set to null

    it("should return a 201 status if 'completed' has a 'false' value and 'dateCompleted' is set to null", async () => {
      const response = await request(app)
        .patch("/toggle-completed")
        .send({ id: 1, completed: false });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("completed", false);
      expect(response.body).toHaveProperty("dateCompleted", null);
    });
  });

  describe.only("todos GET ", () => {
    it("returns a 204 status code if no todos present in the database yet", async () => {
      const response = await request(app).get("/todos").send({});

      expect(response.status).toBe(204);
      expect(response.body).toStrictEqual({});
    });

    it("returns a 200 if there are todos stored in the database and they are properly listed", async () => {
      const response = await request(app).get("/todos").send({});

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
