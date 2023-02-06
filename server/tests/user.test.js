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

// exports.dbCleanUP = async () => {
//   if (mongoServer) {
//       const collections = await mongoose.connection.db.collections()
//       for (let collection of collections) {
//           await collection.deleteMany({})
//       }
//   }
// }

// exports.dbDisconnect = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop()
// }

// describe("GET /api/v1/users", () => {
//   it("should return all products", async () => {
//       const res = await request(app).get("/api/v1/users");
//       expect(res.statusCode).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//   });
// });

// describe("GET /api/v1/products?categories=id", () => {
//   it("should return all products", async () => {
//       const res = await request(app).get("/api/v1/products?categories");
//       expect(res.statusCode).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//   });
// });
// /api/v1/products?categories=63dbd045417bc873454ae18b
// describe("GET /api/products/:id", () => {
// it("should return a product", async () => {
//     const res = await request(app).get(
//     "/api/products/63cbab20eea48da8b08e93a7"
//     );
//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("Int Test Dongle");
// });
// });

describe("POST /api/v1/users", () => {
  it("should create user", async () => {
    const res = await request(app).post("/api/v1/users").send({
      "name": "Peter",
      "email": "test@mail.com",
      "password": "a secret",
      "isAdmin": true,
      "phone": "234566789",
      "street": "Alh T.",
      "apartment": "No. lovely",
      "zip": "4543",
      "city": "lek",
      "country": "9ja4real"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Peter");
    expect(res.body.email).toBe("test@mail.com");
    expect(res.body.passwordHash).toBe("$2b$10$xh9.Bel3vHkwpld8C1sEF.4sryiZInO5GCMmbUHEYQ8QK4Pba/97i");
    expect(res.body.isAdmin).toBe(true);
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