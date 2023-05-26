import Address from "../../../@shared/domain/value-object/address.value-object";
import ID from "../../../@shared/domain/value-object/id.value-object";
import AddProductUseCase from "../../../product-adm/usecase/add-product/add-product.usecase";
import Invoice from "../../domain/invoice.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDTO, GenerateInvoiceUseCaseOutputDTO } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
    private repository: InvoiceGateway;

    constructor(repository: InvoiceGateway) {
        this.repository = repository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDTO): Promise<GenerateInvoiceUseCaseOutputDTO> {
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.zipcode,
            input.city,
            input.state
        );

        const items = [];
        for (let i = 0; i < input.items.length; i++) {
            items.push({
                id: new ID(input.items[i].id),
                name: input.items[i].name,
                price: input.items[i].price
            })
        }

        const props = {
            name: input.name,
            document: input.document,
            address: address,
            items: items
        };

        const invoice = new Invoice(props);

        const result = await this.repository.generate(invoice);
        
        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipcode: result.address.zipcode,
            items: items.map((i) => {
                return {
                    id: i.id.id,
                    name: i.name,
                    price: i.price
                }
            }),
            total: result.total()
        };
    }

}