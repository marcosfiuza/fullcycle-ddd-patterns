import { app, sequelize } from "../express";
import request from "supertest";

describe("e2e test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Customer 1",
                address: {
                    street: "Street",
                    number: 1,
                    zip: "00000",
                    city: "City"
                }
            });

        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual({
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street",
                number: 1,
                zip: "00000",
                city: "City"
            }
        });
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Customer 1"
            });

        expect(response.status).toBe(500);
    });

    it("it should list all customers", async () => {
        const postResponse1 = await request(app)
            .post("/customers")
            .send({
                name: "Customer 1",
                address: {
                    street: "Street",
                    number: 1,
                    zip: "00000",
                    city: "City"
                }
            });

        expect(postResponse1.status).toBe(201);

        const postResponse2 = await request(app)
            .post("/customers")
            .send({
                name: "Customer 2",
                address: {
                    street: "Street",
                    number: 2,
                    zip: "00001",
                    city: "City 2"
                }
            });

        expect(postResponse2.status).toBe(201);

        const response = await request(app)
            .get("/customers")
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([
            {
                id: expect.any(String),
                name: "Customer 1",
                address: {
                    street: "Street",
                    number: 1,
                    zip: "00000",
                    city: "City"
                }
            },
            {
                id: expect.any(String),
                name: "Customer 2",
                address: {
                    street: "Street",
                    number: 2,
                    zip: "00001",
                    city: "City 2"
                }
            }
        ]);
    });
});