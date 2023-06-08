import Notification from "./notification";

describe("Unit test for notification", () => {
    it("should create errors", () => {
        const notification = new Notification();

        const error1 = {
            message: "error message 1",
            context: "context"
        };

        notification.addError(error1);

        expect(notification.messages("context")).toBe("error message 1");

        const error2 = {
            message: "error message 2",
            context: "context"
        };

        const error3 = {
            message: "error message 3",
            context: "other context"
        };

        notification.addError(error2);
        notification.addError(error3);

        expect(notification.messages("context")).toBe("error message 1, error message 2");

        expect(notification.messages("other context")).toBe("error message 3");

        expect(notification.messages()).toBe("error message 1, error message 2, error message 3");
    });
});