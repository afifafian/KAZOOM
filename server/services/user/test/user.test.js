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

const newUser = {
    username: "andi",
    password: "andi123"
};

describe("User register test", () => {
    test("responds with 201", async(done) => {
        try {
            const response = await request(app).post("/users/register").send(newUser);
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty("_id")
            expect(body).toHaveProperty("username")
            expect(body).toHaveProperty("password")
            done();
        } catch (err) {
            done(err);
        }
    })

    test("responds should respon 400,UserName Validation", async(done) => {
        try {
            const failedUser = {
                username: "",
                password: "andi123"
            };
            const response = await request(app).post("/users/register").send(failedUser);
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "username cannot empty")
            done();
        } catch (err) {
            done(err);
        }
    })

    test("responds should respon 400,Password Validation", async(done) => {
        try {
            const failedUser2 = {
                username: "andik",
                password: ""
            };
            const response = await request(app).post("/users/register").send(failedUser2);
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "password cannot empty")
            done();
        } catch (err) {
            done(err);
        }
    })

    test("responds should respon 400,Cannot Duplicate Name", async(done) => {
        try {
            const duplicateUser = {
                username: "andi",
                password: "andi12345"
            };
            const duplicateUser2 = {
                username: "andi",
                password: "andi1234"
            };
            const response = await request(app).post("/users/register").send(duplicateUser);
            const { body, status } = response;
            const response2 = await request(app).post("/users/register").send(duplicateUser2);
            const { body: secondBody, status: secondStatus } = response2;
            expect(secondStatus).toBe(400);
            expect(secondBody).toHaveProperty("message", "this username already registered")
            done();
        } catch (err) {
            done(err);
        }
    })

})

describe("User Login test", () => {
    test("Success Login - should return response 200", async(done) => {
        try {
            const response = await request(app).post("/users/login").send(newUser)
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("token");
            done();
        } catch (err) {
            done(err)
        }
    });
    test("Failed Login - should return response 404", async(done) => {
        try {
            const response = await request(app).post("/users/login").send({username: "andi", password: "ohoy"})
            const { body, status } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Invalid username or password");
            done();
        } catch (err) {
            done(err)
        }
    })
})

describe("User findAll", () => {
    test("responds with 200", async(done) => {
        try {
            const response2 = await request(app).get("/users/leaderboards");
            const { body, status } = response2;
            expect(status).toBe(200);
            expect((Array).isArray(body)).toBeTruthy();
            done();
        } catch (err) {
            done(err);
        }
    })
})