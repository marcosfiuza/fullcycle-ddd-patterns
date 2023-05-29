import Product from "../entity/product";
import RepositoryInterface from "./repository_interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
    findByName(name: string): Promise<Product>;
}