import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "Customer 1");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const customer = new Customer("c1", "");
        }).toThrowError("Name is required");
    });

    it("should throw error when id and name are empty", () => {
        expect(() => {
            const customer = new Customer("", "");
        }).toThrowError("Id is required, Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("c1", "Customer 1");

        customer.changeName("Customer 2");

        expect(customer.name).toBe("Customer 2");
    });

    it("should activate customer", () => {
        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("c1", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined and you activate a customer", () => {
        expect(() => {
            const customer = new Customer("c1", "Customer 1");

            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("c1", "Customer 1");

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);
    });
});