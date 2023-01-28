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


describe("GET /api/v1/products", () => {
it("should return all products", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});
});

// describe("GET /api/products/:id", () => {
// it("should return a product", async () => {
//     const res = await request(app).get(
//     "/api/products/63cbab20eea48da8b08e93a7"
//     );
//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("Int Test Dongle");
// });
// });

  describe("POST /api/v1/products", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/api/v1/products").send({
        "name": "Excel P",
        "image": "Excel P url",
        "countInStock": 50
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Excel P");
      expect(res.body.image).toBe("Excel P url");
      expect(res.body.countInStock).toBe(50);
    });
  });


//   describe("PUT /api/products/:id", () => {
//     it("should update a product", async () => {
//       const res = await request(app)
//         .put("/api/products/63cbacb46066b1a6a6d588cc")
//         .send({
//             name: "Express Package",
//             price: 1491,
//             description: "Express Resource",
//         });
//       expect(res.statusCode).toBe(200);
//       expect(res.body.price).toBe(1491);
//     });
//   });


//   describe("DELETE /api/products/:id", () => {
//     it("should delete a product", async () => {
//       const res = await request(app).delete(
//         "/api/products/63cbae1da026311a0ba7cab1"
//       );
//       expect(res.statusCode).toBe(200);
//     });
//   });