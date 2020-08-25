const request = require("supertest");
const app = require('../app');
const db = require('../config/mongo');

afterAll(async(done) => {
    try {
        db.collection('Templates').drop();
        done()
    } catch (error) {
        done(error)
    }
});

const inputTemplate = {
    title: "Soal IPA",
    questions: [
        {
            question: "apakah salah itu benar?",
            choices: 
            [ { answer: "Benar", status: true },
              { answer: "Salah", status: false },
              { answer: "Gatau", status: false },
              { answer: "Bebas", status: false }
            ],
            point: 1000
        },
    ],
    userId: "54tch45t5t87t8"
};

const wrongInputTemplate = {
    title: "",
    questions: [
        {
            question: "apakah salah itu benar?",
            choices: 
            [ { answer: "Benar", status: true },
              { answer: "Salah", status: false },
              { answer: "Gatau", status: false },
              { answer: "Bebas", status: false }
            ],
            point: 1000
        },
    ],
    userId: "54tch45t5t87t8"
};

const wrongInputTemplate2 = {
    title: "Soal IPA",
    questions: [],
    userId: "54tch45t5t87t8"
};

const wrongInputTemplate3 = {
    title: "Soal IPA",
    questions: [
        {
            question: "apakah salah itu benar?",
            choices: 
            [ { answer: "Benar", status: true },
              { answer: "Salah", status: false },
              { answer: "Gatau", status: false },
              { answer: "Bebas", status: false }
            ],
            point: 1000
        },
    ],
    userId: ""
};

describe("Create Template Test", () => {
    test("Success Create New Template - should return response with 201", async(done) => {
        try {
            const response = await request(app).post("/template").send(inputTemplate);
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty("_id")
            expect(body).toHaveProperty("title")
            expect(body).toHaveProperty("questions")
            expect(body).toHaveProperty("userId")
            done();
        } catch (err) {
            done(err);
        }
    })
    test("Error Validation Template title - should return response json", async(done) => {
        try {
            const response = await request(app).post("/template").send(wrongInputTemplate);
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Title must be filled!")
            done();
        } catch (err) {
            done(err);
        }
    })
    test("Error Validation Template questions - should return response json", async(done) => {
        try {
            const response = await request(app).post("/template").send(wrongInputTemplate2)
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Questions must be filled!")
            done();
        } catch (err) {
            done(err);
        }
    })
    test("Error Validation Question User Id - should return response json", async(done) => {
        try {
            
            const response = await request(app).post("/template").send(wrongInputTemplate3)
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Id User must be filled!")
            done();
        } catch (err) {
            done(err);
        }
    })
});

describe("GET All Templates", () => {
    test("Success Get All Templates - should return status 200", async (done) => {
        try {
            const response = await request(app).get("/template")
            const { body, status } = response;
            expect(status).toBe(200);
            expect((Array).isArray(body)).toBeTruthy();
            expect(body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(inputTemplate)
                ])
            )
            done();
        } catch (error) {
            done(error);
        }
    })
})

describe("DELETE Template", () => {
    test("Success Delete Templates - should return status 200", async (done) => {
        try {
            const response2 = await request(app).post("/template").send(inputTemplate)
            const { body: bodyAlias, status: statusAlias } = response2
            const id = "5f3ff1b68c37397af90bbe5a"
            const response = await request(app).delete(`/template/${id}`)
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("messages", "Successfully Deleted Template!")
            done();
        } catch (error) {
            done(error);
        }
    })
})