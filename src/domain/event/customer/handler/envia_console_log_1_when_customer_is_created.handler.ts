import EventHandlerInterface from "../../@shared/event_handler.interface";
import CustomerCreatedEvent from "../customer_created.event";

export default class EnviaConsoleLog1WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}