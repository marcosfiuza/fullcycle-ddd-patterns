import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

export default class OrderFactory {
    public static create(customerId: string, items: OrderItem[]): Order {
        return new Order(uuid(), customerId, items);
    }

    public static createItem(productId: string, name: string, price: number, quantity: number): OrderItem {
        return new OrderItem(uuid(), productId, name, price, quantity);
    }
}