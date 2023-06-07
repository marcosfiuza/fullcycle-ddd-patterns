import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.use_case";

const product1 = ProductFactory.create("Product 1", 100);
const product2 = ProductFactory.create("Product 2", 200);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
        findByName: jest.fn()
    };
};

describe("Unit test list product use case", () => {
    it("should list products", async () => {
        const productRepository = MockRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

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