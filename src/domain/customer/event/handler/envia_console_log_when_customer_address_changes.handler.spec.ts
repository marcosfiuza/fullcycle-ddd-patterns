import Address from "../../value-object/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../../../@shared/event/event_dispatcher";
import CustomerAddressChangedEvent from "../customer_address_changed.event";
import EnviaConsoleLogWhenCustomerAddressChangesHandler from "./envia_console_log_when_customer_address_changes.handler";

describe("Envia console log 1 when customer is created handler unit test", () => {
    it("should notify when user is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogWhenCustomerAddressChangesHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")).toStrictEqual([eventHandler]);

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});