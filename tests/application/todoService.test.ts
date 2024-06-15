import request from "supertest";
import app from "../../src/app";
// import { db } from "../../src/infrastructure/db/dbConfig";

describe("todoService ", () => {
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
