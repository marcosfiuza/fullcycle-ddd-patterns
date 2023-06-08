import { app, sequelize } from "../express";
import request from "supertest";

describe("e2e test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });

        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100
        });
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1"
            });

        expect(response.status).toBe(500);
    });

    it("it should list all products", async () => {
        const postResponse1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });

        expect(postResponse1.status).toBe(201);

        const postResponse2 = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                price: 200
            });

        expect(postResponse2.status).toBe(201);

        const response = await request(app)
            .get("/products")
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([
            {
                id: expect.any(String),
                name: "Product 1",
                price: 100
            },
            {
                id: expect.any(String),
                name: "Product 2",
                price: 200
            }
        ]);
    });
});