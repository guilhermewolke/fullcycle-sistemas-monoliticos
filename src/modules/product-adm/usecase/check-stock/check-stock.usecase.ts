import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDTO, CheckStockOutputDTO } from "./check-stock.dto";

export default class CheckStockUseCase {

    private repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this.repository = repository;
    }

    async execute(input: CheckStockInputDTO): Promise<CheckStockOutputDTO> {
        const p = await this.repository.find(input.productId);
        return {
            id: p.id.id,
            stock: p.stock
        }

    }
}