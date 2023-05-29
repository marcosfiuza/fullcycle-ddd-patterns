import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");

        const item1 = new OrderItem("i1", "p1", "Item 1", 50, 3);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(75);
        expect(order.total()).toBe(150);
    });

    it("should calculate total of all orders", () => {
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 2);
        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 3);

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        const total = OrderService.calculateTotal([order1, order2]);

        expect(total).toBe(800);
    });
});