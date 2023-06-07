import CreateProductUseCase from "./create.product.use_case";

const input = {
    name: "Product 1",
    price: 100
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findByName: jest.fn()
    };
};

describe("Unit Test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw and error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        expect(async () => {
            await productCreateUseCase.execute({ ...input, name: "" });
        }).rejects.toThrow("Name is required");
    });

    it("should throw and error when price lower than or equal to zero", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        expect(async () => {
            await productCreateUseCase.execute({ ...input, price: 0 });
        }).rejects.toThrow("Price must be greater than 0");

        expect(async () => {
            await productCreateUseCase.execute({ ...input, price: -100 });
        }).rejects.toThrow("Price must be greater than 0");
    });
});