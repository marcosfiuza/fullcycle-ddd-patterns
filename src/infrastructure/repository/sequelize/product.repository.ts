import ProductRepositoryInterface from "../../../domain/repository/product.repository_interface";
import ProductModel from "../../db/sequelize/model/product.model";
import Product from "../../../domain/entity/product";

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
        const productModel = await ProductModel.findOne({ where: { id } });

        return new Product(productModel.id, productModel.name, productModel.price);
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map((productModel) => {
            return new Product(productModel.id, productModel.name, productModel.price)
        });
    }

    async findByName(name: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { name } });

        return new Product(productModel.id, productModel.name, productModel.price);
    }
}