import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../db/sequelize/model/customer.model";
import ProductModel from "../../db/sequelize/model/product.model";
import OrderModel from "../../db/sequelize/model/order.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import Product from "../../../domain/product/entity/product";
import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderItemModel from "../../db/sequelize/model/order_item.model";

describe("Order sequelize repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([OrderModel, CustomerModel, ProductModel, OrderItemModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        const product = new Product("p1", "Product 1", 100);

        await productRepository.create(product);

        const item = new OrderItem("i1", "p1", "Product 1", 100, 2);

        const order = new Order("o1", "c1", [item]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: "o1" },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            items: [{
                id: "i1",
                order_id: "o1",
                product_id: "p1",
                name: "Product 1",
                price: 100,
                quantity: 2
            }],
            total: 200
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        const product1 = new Product("p1", "Product 1", 100);
        const product2 = new Product("p2", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const item1 = new OrderItem("i1", "p1", "Product 1", 100, 2);
        const item2 = new OrderItem("i2", "p2", "Product 2", 200, 1);

        const order = new Order("o1", "c1", [item1]);

        await orderRepository.create(order);

        order.addItem(item2);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: "o1" },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            items: [{
                id: "i1",
                order_id: "o1",
                product_id: "p1",
                name: "Product 1",
                price: 100,
                quantity: 2
            }, {
                id: "i2",
                order_id: "o1",
                product_id: "p2",
                name: "Product 2",
                price: 200,
                quantity: 1
            }],
            total: 400
        });
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        const product = new Product("p1", "Product 1", 100);

        await productRepository.create(product);

        const item = new OrderItem("i1", "p1", "Product 1", 100, 2);

        const order = new Order("o1", "c1", [item]);

        await orderRepository.create(order);

        const foundOrder = await orderRepository.find("o1");

        expect(foundOrder).toStrictEqual(order);
    });

    it("should throw an error when an order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("ABCDEF");
        }).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("c1", "Customer 1");

        customer.changeAddress(new Address("Street", 1, "00000", "City"));

        await customerRepository.create(customer);

        const product1 = new Product("p1", "Product 1", 100);
        const product2 = new Product("p2", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const item1 = new OrderItem("i1", "p1", "Product 1", 100, 2);
        const item2 = new OrderItem("i2", "p2", "Product 2", 200, 1);

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();

        expect(foundOrders).toStrictEqual([order1, order2]);
    });
});