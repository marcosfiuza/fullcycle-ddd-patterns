import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.use_case";

const customer = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Street", 1, "00000", "City")
);

const input = {
    id: customer.id,
    name: "Customer 2",
    address: {
        street: "New Street",
        number: 2,
        zip: "00001",
        city: "New City"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw and error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        expect(async () => {
            await customerUpdateUseCase.execute({ ...input, name: "" });
        }).rejects.toThrow("Name is required");
    });

    it("should throw and error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        expect(async () => {
            await customerUpdateUseCase.execute({ ...input, address: { ...input.address, street: "" } });
        }).rejects.toThrow("Street is required");
    });
});