import Product from "./product";

describe("PRoduct unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "123", 100);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than 0", () => {
        expect(() => {
            const product = new Product("123", "123", -100);
        }).toThrowError("Price must be greater than 0");
    });

    it("should change name", () => {
        const product = new Product("123", "123", 100);

        product.changeName("456");

        expect(product.name).toBe("456");
    });

    it("should change price", () => {
        const product = new Product("123", "123", 100);

        product.changePrice(200);

        expect(product.price).toBe(200);
    });
});