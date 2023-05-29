import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "Order 1", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("o1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            const order = new Order("o1", "Order 1", []);
        }).toThrowError("Items is required");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 2);
        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 5);

        const order1 = new Order("o1", "Order 1", [item1]);

        expect(order1.total()).toBe(200);

        const order2 = new Order("o2", "Order 2", [item2]);

        expect(order2.total()).toBe(1000);

        const order3 = new Order("o3", "Order 3", [item1, item2]);

        expect(order3.total()).toBe(1200);
    });

    it("should add an item", () => {
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 2);

        const order = new Order("o1", "Order 1", [item1]);

        expect(order.total()).toBe(200);

        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 5);

        order.addItem(item2);

        expect(order.total()).toBe(1200);
    });
});