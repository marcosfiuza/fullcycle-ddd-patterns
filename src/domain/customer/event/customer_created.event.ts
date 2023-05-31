import Customer from "../entity/customer";
import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Customer;

    constructor(eventData: Customer) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
};