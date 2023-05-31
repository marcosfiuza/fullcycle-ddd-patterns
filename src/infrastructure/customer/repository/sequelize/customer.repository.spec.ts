import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer sequelize repository test", () => {
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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "c1",
            name: "Customer 1",
            street: "Street",
            number: 1,
            zipcode: "00000",
            city: "City",
            active: false,
            rewardPoints: 0
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        customer.addRewardPoints(100);
        customer.changeAddress(new Address("Avenue", 1, "00000", "City"));
        customer.activate();

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "c1",
            name: "Customer 2",
            street: "Avenue",
            number: 1,
            zipcode: "00000",
            city: "City",
            active: true,
            rewardPoints: 100
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("c1");

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("should throw an error when a customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("ABCDEF");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("c1", "Customer 1");
        const customer2 = new Customer("c2", "Customer 2");

        customer1.changeAddress(new Address("Street", 1, "00000", "City"));
        customer2.changeAddress(new Address("Street", 2, "00000", "City"));

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();

        expect(foundCustomers).toStrictEqual([customer1, customer2]);
    });
});