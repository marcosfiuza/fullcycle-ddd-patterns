import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.use_case";

const product = new Product("p1", "Product 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findByName: jest.fn()
    };
};

describe("Unit test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = { id: "p1" };

        const output = {
            id: "p1",
            name: "Product 1",
            price: 100
        }

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        });

        const input = { id: "p2" };

        expect(async () => {
            await findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found")
    });
});