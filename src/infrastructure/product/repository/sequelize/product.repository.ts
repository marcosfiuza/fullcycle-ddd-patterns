import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository_interface";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        const { id, name, price } = entity;
        await ProductModel.create({ id, name, price });
    }

    async update(entity: Product): Promise<void> {
        const { id, name, price } = entity;
        await ProductModel.update({ id, name, price }, { where: { id } });
    }

    async find(id: string): Promise<Product> {
        try {
            const productModel = await ProductModel.findOne({ where: { id }, rejectOnEmpty: true });

            return new Product(productModel.id, productModel.name, productModel.price);
        } catch (err) {
            throw new Error("Product not found");
        }
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map((productModel) => {
            return new Product(productModel.id, productModel.name, productModel.price)
        });
    }

    async findByName(name: string): Promise<Product> {
        try {
            const productModel = await ProductModel.findOne({ where: { name }, rejectOnEmpty: true });

            return new Product(productModel.id, productModel.name, productModel.price);
        } catch (err) {
            throw new Error("Product not found");
        }
    }
}