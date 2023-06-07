import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.use_case";

const customer1 = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Street", 1, "00000", "City")
);

const customer2 = CustomerFactory.createWithAddress(
    "Customer 2",
    new Address("Street", 2, "00001", "City 2")
);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit test list customer use case", () => {
    it("should list customers", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);

        const output = await customerListUseCase.execute({});

        expect(output.customers).toStrictEqual([
            {
                id: customer1.id,
                name: customer1.name,
                address: {
                    street: customer1.address.street,
                    number: customer1.address.number,
                    zip: customer1.address.zip,
                    city: customer1.address.city
                }
            },
            {
                id: customer2.id,
                name: customer2.name,
                address: {
                    street: customer2.address.street,
                    number: customer2.address.number,
                    zip: customer2.address.zip,
                    city: customer2.address.city
                }
            }
        ]);
    });
});