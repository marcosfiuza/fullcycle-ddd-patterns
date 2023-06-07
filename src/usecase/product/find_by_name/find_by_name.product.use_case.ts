import ProductRepositoryInterface from "../../../domain/product/repository/product.repository_interface";
import { InputFindByNameProductDto, OutputFindByNameProductDto } from "./find_by_name.product.dto";

export default class FindByNameProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputFindByNameProductDto): Promise<OutputFindByNameProductDto> {
        const product = await this.productRepository.findByName(input.name);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
};