import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.use_case";

describe("Integration test list product use case", () => {
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

    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const product1 = new Product("p1", "Product 1", 100);
        const product2 = new Product("p12", "Product 2", 100);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = await listProductUseCase.execute({});

        expect(output.products).toStrictEqual([
            {
                id: product1.id,
                name: product1.name,
                price: product1.price
            },
            {
                id: product2.id,
                name: product2.name,
                price: product2.price
            },
        ]);
    });
});