const request = require('supertest');
const app = require('../app');
const db = require('../config/mongo');

afterAll(async(done) => {
    try {
        db.collection('Users').drop();
        done()
    } catch (error) {
        done(error)
    }
})

describe("User register test", () => {
    test("responds with 201", async(done) => {
        try {
            const newUser = {
                username: "andi",
            };
            const response = await request(app).post("/users/register").send(newUser);
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty("_id")
            expect(body).toHaveProperty("username")
            done();
        } catch (err) {
            done(err);
        }
    })
})