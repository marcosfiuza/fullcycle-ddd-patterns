import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.use_case";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

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
});