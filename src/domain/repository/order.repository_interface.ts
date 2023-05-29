import Order from "../entity/order";
import RepositoryInterface from "./repository_interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
}