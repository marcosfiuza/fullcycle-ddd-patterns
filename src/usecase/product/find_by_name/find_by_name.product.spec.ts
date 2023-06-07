import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindByNameProductUseCase from "./find_by_name.product.use_case";

describe("Integration test find by name product use case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const findByNameProductUseCase = new FindByNameProductUseCase(productRepository);

        const product = new Product("p1", "Product 1", 100);

        await productRepository.create(product);

        const input = { name: "Product 1" };

        const output = {
            id: "p1",
            name: "Product 1",
            price: 100
        }

        const result = await findByNameProductUseCase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = new ProductRepository();
        const findByNameProductUseCase = new FindByNameProductUseCase(productRepository);

        const product = new Product("p1", "Product 1", 100);

        await productRepository.create(product);

        const input = { name: "Product 2" };

        expect(async () => {
            await findByNameProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});