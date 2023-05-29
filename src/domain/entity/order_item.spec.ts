import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const item = new OrderItem("", "p1", "Item 1", 100, 2);
        }).toThrowError("Id is required");
    });

    it("should throw error when productId is empty", () => {
        expect(() => {
            const item = new OrderItem("i1", "", "Item 1", 100, 2);
        }).toThrowError("ProductId is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const item = new OrderItem("i1", "p1", "", 100, 2);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is lower than or equal to zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "p1", "Item 1", -100, 2);
        }).toThrowError("Price must be greater than zero");

        expect(() => {
            const item = new OrderItem("i1", "p1", "Item 1", 0, 2);
        }).toThrowError("Price must be greater than zero");
    });

    it("should return the correct price value", () => {
        const item = new OrderItem("i1", "p1", "Item 1", 100, 2);

        expect(item.price).toBe(100);
    });

    it("should return the correct quantity value", () => {
        const item = new OrderItem("i1", "p1", "Item 1", 100, 2);

        expect(item.quantity).toBe(2);
    });

    it("should throw error when quantity is lower than or equal to zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "p1", "Item 1", 100, -2);
        }).toThrowError("Quantity must be greater than zero");

        expect(() => {
            const item = new OrderItem("i1", "p1", "Item 1", 100, 0);
        }).toThrowError("Quantity must be greater than zero");
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "p1", "Item 1", 100, 3);

        expect(item.total()).toBe(300);
    });
});