import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
    it("should create an order", () => {
        const item = OrderFactory.createItem("p1", "Product 1", 100, 2);

        const order = OrderFactory.create("c1", [item]);

        expect(order.id).toBeDefined();
        expect(order.customerId).toBe("c1");
        expect(order.total()).toBe(200);
        expect(order.constructor.name).toBe("Order");
    });
});