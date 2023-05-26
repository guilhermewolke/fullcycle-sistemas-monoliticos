import { FindClientOutputDTO } from "../../../client-adm/usecase/find-client/find-client.dto";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase {
    private _repository: InvoiceGateway;

    constructor(rep: InvoiceGateway) {
        this._repository = rep;
    }

    async execute(input:  FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this._repository.find(input.id);
        
        const items: {
            id: string;
            name: string;
            price: number;
        }[] = [];
        for (let i = 0; i < invoice.items.length; i++) {
            items.push({
                id: invoice.items[i].id.id,
                name: invoice.items[i].name,
                price: invoice.items[i].price
            })
        }
        
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipcode: invoice.address.zipcode
            },
            items: items,
            total: invoice.total(),
            createdAt: invoice.createdAt
        }
    }

}