import EventInterface from "./event.interface";
import EventDispatcherInterface from "./event_dispatcher.interface";
import EventHandlerInterface from "./event_handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private _eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if (eventName in this._eventHandlers) {
            this._eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        this._eventHandlers[eventName] = this._eventHandlers[eventName] || [];
        this._eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (eventName in this._eventHandlers) {
            const index = this._eventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this._eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this._eventHandlers = {};
    }

    getEventHandlers(eventName: string): EventHandlerInterface[] {
        return this._eventHandlers[eventName] || [];
    }
}