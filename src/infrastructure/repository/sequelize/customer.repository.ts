import CustomerRepositoryInterface from "../../../domain/repository/customer.repository_interface";
import CustomerModel from "../../db/sequelize/model/customer.model";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        const { id, name, address, rewardPoints } = entity;
        const active = entity.isActive();
        await CustomerModel.create({ id, name, street: address.street, number: address.number, zipcode: address.zip, city: address.city, active, rewardPoints });
    }

    async update(entity: Customer): Promise<void> {
        const { id, name, address, rewardPoints } = entity;
        const active = entity.isActive();
        await CustomerModel.update({ id, name, street: address.street, number: address.number, zipcode: address.zip, city: address.city, active, rewardPoints }, { where: { id } });
    }

    async find(id: string): Promise<Customer> {
        try {
            const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });

            const customer = new Customer(customerModel.id, customerModel.name);

            customer.changeAddress(new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            ));

            customer.addRewardPoints(customerModel.rewardPoints);

            if (customerModel.active === true) {
                customer.activate();
            }

            return customer;
        } catch (err) {
            throw new Error("Customer not found");
        }
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);

            customer.changeAddress(new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            ));

            customer.addRewardPoints(customerModel.rewardPoints);

            if (customerModel.active === true) {
                customer.activate();
            }

            return customer;
        });
    }
}