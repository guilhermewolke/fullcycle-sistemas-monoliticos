import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import Product from "../../domain/product.entity";
import { ListProductsDTO, ListProductsInputDTO } from "./list-products.dto";

export default class ListProductsUseCase implements UseCaseInterface {
    constructor (private repository: ProductGateway) {}

    async execute(input: ListProductsInputDTO): Promise<ListProductsDTO> {
        const products = await this.repository.findAll();

        return {
            products: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }))
        }
    }

}