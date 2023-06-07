import CreateCustomerUseCase from "./create.customer.use_case";

const input = {
    name: "Customer 1",
    address: {
        street: "Street",
        number: 1,
        zip: "00000",
        city: "City"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit Test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        });
    });

    it("should throw and error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        expect(async () => {
            input.name = "";

            await customerCreateUseCase.execute(input)
        }).rejects.toThrow("Name is required");
    });

    it("should throw and error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        expect(async () => {
            input.address.street = "";

            await customerCreateUseCase.execute(input)
        }).rejects.toThrow("Street is required");
    });
});