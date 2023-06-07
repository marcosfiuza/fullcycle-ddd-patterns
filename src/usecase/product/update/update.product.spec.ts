import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.use_case";

describe("Integration test update product use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("p1", "Product 01", 100);

        await productRepository.create(product);

        const input = {
            id: "p1",
            name: "Product 02",
            price: 200
        };

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual({
            id: "p1",
            name: input.name,
            price: input.price
        });
    });

    it("should throw and error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("p1", "Product 01", 100);

        await productRepository.create(product);

        await expect(async () => {
            const input = {
                id: "p1",
                name: "",
                price: 200
            };

            await updateProductUseCase.execute(input);
        }).rejects.toThrow("Name is required");
    });

    it("should throw and error when price is lower than or equal to zero", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("p1", "Product 01", 100);

        await productRepository.create(product);

        expect(async () => {
            const input = {
                id: "p1",
                name: "Product 01",
                price: -100
            };

            await updateProductUseCase.execute(input);
        }).rejects.toThrow("Price must be greater than 0");

        await expect(async () => {
            const input = {
                id: "p1",
                name: "Product 01",
                price: 0
            };

            await updateProductUseCase.execute(input);
        }).rejects.toThrow("Price must be greater than 0");
    });
});