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

    test("responds should respon 400,UserName Validation", async(done) => {
        try {
            const newUser = {
                username: "",
            };
            const response = await request(app).post("/users/register").send(newUser);
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "username cannot empty")
            done();
        } catch (err) {
            done(err);
        }
    })

    test("responds should respon 400,Cannot Duplicate Name", async(done) => {
        try {
            const newUser = {
                username: "andi",
            };
            const newUser2 = {
                username: "andi",
            };
            const response = await request(app).post("/users/register").send(newUser);
            const { body, status } = response;
            const response2 = await request(app).post("/users/register").send(newUser2);
            const { body: secondBody, status: secondStatus } = response2;
            expect(secondStatus).toBe(400);
            expect(secondBody).toHaveProperty("message", "this username already registered")
            done();
        } catch (err) {
            done(err);
        }
    })

})

describe("User findAll", () => {
    test("responds with 200", async(done) => {
        try {
            const newUser = {
                username: "andi",
            };
            const response = await request(app).post("/users/register").send(newUser);
            const { body: userBody, status: userStatus } = response;
            const response2 = await request(app).get("/users/leaderboards");
            const { body, status } = response2;
            expect(status).toBe(200);
            expect(body).toHaveProperty("users")
            done();
        } catch (err) {
            done(err);
        }
    })
})