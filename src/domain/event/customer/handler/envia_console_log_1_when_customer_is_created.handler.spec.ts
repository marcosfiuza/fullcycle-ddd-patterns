import Address from "../../../entity/address";
import Customer from "../../../entity/customer";
import EventDispatcher from "../../@shared/event_dispatcher";
import CustomerCreatedEvent from "../customer_created.event";
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "./envia_console_log_1_when_customer_is_created.handler";

describe("Envia console log 1 when customer is created handler unit test", () => {
    it("should notify when user is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1WhenCustomerIsCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")).toStrictEqual([eventHandler]);

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});