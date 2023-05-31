import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository_interface";
import OrderModel from "./order.model";
import OrderItemModel from "../../../checkout/repository/sequelize/order_item.model";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        const { id, customerId: customer_id } = entity;
        const total = entity.total();
        const items = entity.items.map(({ id, productId: product_id, name, price, quantity }) => ({
            id,
            product_id,
            name,
            price,
            quantity
        }));

        await OrderModel.create({ id, customer_id, items, total }, {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        const { id, customerId: customer_id } = entity;
        const total = entity.total();
        const items = entity.items.map(({ id, productId: product_id, name, price, quantity }) => ({
            id,
            order_id: entity.id,
            product_id,
            name,
            price,
            quantity
        }));

        const orderModel = await OrderModel.findOne({ where: { id }, include: ["items"] });

        orderModel.update({ id, customer_id, total });

        items
            .filter((item) => !orderModel.items.some((itemModel) => item.id === itemModel.id))
            .forEach(async (item) => await OrderItemModel.create(item))

        orderModel.save();
    }

    async find(id: string): Promise<Order> {
        try {
            const orderModel = await OrderModel.findOne({
                where: { id },
                include: ["items"],
                rejectOnEmpty: true
            });

            const items = orderModel.items.map(
                ({ id, product_id, name, price, quantity }) =>
                    new OrderItem(id, product_id, name, price, quantity)
            );

            const order = new Order(orderModel.id, orderModel.customer_id, items);

            return order;
        } catch (err) {
            throw new Error("Order not found");
        }
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });

        return orderModels.map((orderModel) => {
            const items = orderModel.items.map(
                ({ id, product_id, name, price, quantity }) =>
                    new OrderItem(id, product_id, name, price, quantity)
            );

            const order = new Order(orderModel.id, orderModel.customer_id, items);

            return order;
        });
    }
}