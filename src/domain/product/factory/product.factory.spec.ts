import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
    it("should create a product", () => {
        const product = ProductFactory.create("Product 1", 100);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("Product");
    });
});