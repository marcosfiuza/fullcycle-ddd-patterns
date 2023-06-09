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

    it("should check if notification has at least one error", () => {
        const notification = new Notification();

        const error = {
            message: "error message",
            context: "context"
        };

        notification.addError(error);

        expect(notification.hasErrors("context")).toBe(true);

        expect(notification.hasErrors()).toBe(true);
    });

    it("should get all errors props", () => {
        const notification = new Notification();

        const error1 = {
            message: "error message 1",
            context: "context 1"
        };

        notification.addError(error1);

        expect(notification.getErrors()).toStrictEqual([error1]);

        const error2 = {
            message: "error message 2",
            context: "context 2"
        };

        notification.addError(error2);

        expect(notification.getErrors()).toStrictEqual([error1, error2]);

        expect(notification.getErrors("context 1")).toStrictEqual([error1]);

        expect(notification.getErrors("context 2")).toStrictEqual([error2]);
    });

    it("should clear errors", () => {
        const notification = new Notification();

        const error1 = {
            message: "error message 1",
            context: "context 1"
        };

        const error2 = {
            message: "error message 2",
            context: "context 2"
        };

        const error3 = {
            message: "error message 3",
            context: "context 3"
        };

        notification.addError(error1);
        notification.addError(error2);
        notification.addError(error3);

        expect(notification.getErrors()).toStrictEqual([error1, error2, error3]);

        notification.clearErrors("context 1");

        expect(notification.getErrors()).toStrictEqual([error2, error3]);

        notification.clearErrors();

        expect(notification.getErrors()).toStrictEqual([]);
    });
});