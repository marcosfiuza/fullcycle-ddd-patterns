import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.use_case";

const product = ProductFactory.create("Product 1", 100);

const input = {
    id: product.id,
    name: "Product 2",
    price: 200
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findByName: jest.fn()
    };
};

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw and error when name is missing", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        expect(async () => {
            await updateProductUseCase.execute({ ...input, name: "" });
        }).rejects.toThrow("Name is required");
    });

    it("should throw and error when price is lower than or equal to zero", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        expect(async () => {
            await updateProductUseCase.execute({ ...input, price: -100 });
        }).rejects.toThrow("Price must be greater than 0");

        expect(async () => {
            await updateProductUseCase.execute({ ...input, price: 0 });
        }).rejects.toThrow("Price must be greater than 0");
    });
});