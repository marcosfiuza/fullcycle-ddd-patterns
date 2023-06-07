import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.use_case";

const customer = new Customer("c1", "Customer 1");
const address = new Address("Street", 1, "00000", "City");

customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit Test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = { id: "c1" };

        const output = {
            id: "c1",
            name: "Customer 1",
            address: {
                street: "Street",
                number: 1,
                zip: "00000",
                city: "City"
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        });

        const input = { id: "c1" };

        expect(async () => {
            await useCase.execute(input);
        }).rejects.toThrow("Customer not found")
    });
});