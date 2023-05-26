import Address from "../../@shared/domain/value-object/address.value-object";
import ID from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-product.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<Invoice> {
        try {
            await InvoiceModel.create({
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipcode,
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
                items: invoice.items.map((item) => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }))
            },
            {
                include: [{model: InvoiceItemModel}]
            });
        } catch (error) {
            console.log(error);
        }
        
        return invoice;
    }

    async find(id: string): Promise<Invoice> {
        const result = await InvoiceModel.findOne({
            where: {id: id},
            include:["items"]
        });

        // preparing the client's object
        const address = new Address(
            result.dataValues.street,
            result.dataValues.number,
            result.dataValues.complement,
            result.dataValues.zipCode,
            result.dataValues.city,
            result.dataValues.state
        )

        const items: Product[] = [];
        
        for (let i = 0; i < result.dataValues.items.length; i++) {
            items.push({
                id: new ID(String(result.dataValues.items[i].dataValues.id)),
                name: result.dataValues.items[i].dataValues.name,
                price: result.dataValues.items[i].dataValues.price
            })
        }

        return new Invoice({
            id: new ID(result.dataValues.id),
            name: result.dataValues.name,
            document: result.dataValues.document,
            address: address,
            items: items,
            createdAt: result.dataValues.createdAt,
            updatedAt: result.dataValues.updatedAt
        });
    }

}