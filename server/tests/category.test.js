const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /api/v1/categories", () => {
  it("should return all categories", async () => {
      const res = await request(app).get("/api/v1/categories");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/v1/categories/:id", () => {
  it("should return all categories", async () => {
      const res = await request(app).get("/api/v1/categories/63d6786233e5bd72f52a807a");
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Gadgets");
      
  });
});

describe("POST /api/v1/categories", () => {
  it("should create a categories", async () => {
    const res = await request(app).post("/api/v1/categories").send({
      "name": "Gadgets",
      "icon": "rabbit",
      "color": "grey"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Gadgets");
    expect(res.body.icon).toBe("rabbit");
    expect(res.body.color).toBe('grey');
  });
});

// describe("DELETE /api/v1/categories/:id", () => {
//   it("should delete a product", async () => {
//     const res = await request(app).delete("/api/v1/categories/63d690dd6554e1b0b82317eb");
//     expect(res.statusCode).toBe(200);
//   });
// });

