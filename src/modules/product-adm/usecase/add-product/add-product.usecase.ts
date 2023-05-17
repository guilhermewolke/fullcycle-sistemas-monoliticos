import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";

export default class AddProductUseCase {

    private repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this.repository = repository;
    }
    async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
        const props = {
            id: new ID(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        const product = new Product(props);

        this.repository.add(product);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }

    }
}