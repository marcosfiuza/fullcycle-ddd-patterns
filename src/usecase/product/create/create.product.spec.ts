import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.use_case";

describe("Integration test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            price: 100
        };

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw and error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100
        };

        expect(async () => {
            await createProductUseCase.execute(input)
        }).rejects.toThrow("Name is required");
    });

    it("should throw and error when price is lower than or equal to zero", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            price: -100
        };

        expect(async () => {
            await createProductUseCase.execute(input)
        }).rejects.toThrow("Price must be greater than 0");

        expect(async () => {
            await createProductUseCase.execute({ ...input, price: 0 })
        }).rejects.toThrow("Price must be greater than 0");
    });
});