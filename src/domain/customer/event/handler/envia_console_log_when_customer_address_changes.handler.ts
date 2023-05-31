import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import CustomerAddressChangedEvent from "../customer_created.event";

export default class EnviaConsoleLogWhenCustomerAddressChangesHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        const { id, name, address } = event.eventData;

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
}