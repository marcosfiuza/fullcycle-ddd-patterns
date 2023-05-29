import { v4 as uuidv4 } from "uuid";
import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static calculateTotal(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        const order = new Order(uuidv4(), customer.id, items);

        customer.addRewardPoints(order.total() / 2);

        return order;
    }
}