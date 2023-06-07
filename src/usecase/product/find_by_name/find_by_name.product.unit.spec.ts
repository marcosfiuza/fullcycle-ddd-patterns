import Product from "../../../domain/product/entity/product";
import FindByNameProductUseCase from "./find_by_name.product.use_case";

const product = new Product("p1", "Product 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findByName: jest.fn().mockReturnValue(Promise.resolve(product))
    };
};

describe("Unit test find by name product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findByNameProductUseCase = new FindByNameProductUseCase(productRepository);

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
        const productRepository = MockRepository();
        const findByNameProductUseCase = new FindByNameProductUseCase(productRepository);

        productRepository.findByName.mockImplementation(() => {
            throw new Error("Product not found")
        });

        const input = { name: "Product 2" };

        expect(async () => {
            await findByNameProductUseCase.execute(input);
        }).rejects.toThrow("Product not found")
    });
});