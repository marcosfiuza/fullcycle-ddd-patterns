import Address from "./address";

describe("Address unit tests", () => {
    it("should throw error when street is empty", () => {
        expect(() => {
            const address = new Address("", 1, "00000", "City");
        }).toThrowError("Street is required");
    });

    it("should throw error when street number is equal to zero", () => {
        expect(() => {
            const address = new Address("Street", 0, "00000", "City");
        }).toThrowError("Number is required");
    });

    it("should throw error when zip code is empty", () => {
        expect(() => {
            const address = new Address("Street", 1, "", "City");
        }).toThrowError("Zip is required");
    });

    it("should throw error when city is empty", () => {
        expect(() => {
            const address = new Address("Street", 1, "00000", "");
        }).toThrowError("City is required");
    });
});