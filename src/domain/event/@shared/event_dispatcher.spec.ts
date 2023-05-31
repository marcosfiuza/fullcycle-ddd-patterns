import EventDispatcher from "./event_dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send_email_when_product_is_created.handler";
import ProductCreatedEvent from "../product/product_created.event";

describe("Domain events test", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toStrictEqual([eventHandler]);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toStrictEqual([eventHandler]);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toStrictEqual([]);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toStrictEqual([eventHandler]);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toStrictEqual([]);
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toStrictEqual([eventHandler]);

        const productCreatedEvent = new ProductCreatedEvent({
            id: "p1",
            name: "Product 1",
            price: 100
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});