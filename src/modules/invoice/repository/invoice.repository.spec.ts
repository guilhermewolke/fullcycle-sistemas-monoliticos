import { Sequelize } from "sequelize-typescript";
import ClientModel from "../../client-adm/repository/client.model";
import InvoiceModel from "./invoice.model";
import ProductModel from "../../store-catalog/repository/product.model";
import ID from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItemModel from "./invoice-product.model";
import InvoiceRepository from "./invoice.repository";
import InvoiceProductModel from "./invoice-product.model";
import Address from "../../@shared/domain/value-object/address.value-object";

describe("Invoice repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            ClientModel, InvoiceModel, InvoiceItemModel, ProductModel
        ]);

        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should find an invoice and its items by its ID", async () => {
        // Creating a new invoice on database...
        const createdInvoice = await InvoiceModel.create({
            id: new ID("1").id,
            name: "Clientezinho",
            document: "123",
            street: "Rua 1",
            number: "1",
            complement: "Complemento",
            city: "Cidade",
            state: "UF",
            zipCode: "01110010",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        //Creating some products on database...
        const pm1 = await InvoiceProductModel.create({
            id: new ID("1").id,
            name: "Product 1",
            invoice_id: new ID("1").id,
            price: 100
        });

        const pm2 = await InvoiceProductModel.create({
            id: new ID("2").id,
            name: "Product 2",
            invoice_id: new ID("1").id,
            price: 200
        });

        // Configuring invoices repository tests
        const invoiceRepository = new InvoiceRepository();
        const input = {
            id: "1"
        }
        const result = await invoiceRepository.find(input.id);
        
        expect(result.id.id).toBe(createdInvoice.dataValues.id);
        expect(result.name).toBe(createdInvoice.dataValues.name);
        expect(result.document).toBe(createdInvoice.dataValues.document);
        expect(result.address.street).toBe(createdInvoice.dataValues.street);
        expect(result.address.number).toBe(createdInvoice.dataValues.number);
        expect(result.address.complement).toBe(createdInvoice.dataValues.complement);
        expect(result.address.city).toBe(createdInvoice.dataValues.city);
        expect(result.address.state).toBe(createdInvoice.dataValues.state);
        expect(result.address.zipcode).toBe(createdInvoice.dataValues.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe(pm1.id);
        expect(result.items[0].name).toBe(pm1.dataValues.name);
        expect(result.items[0].price).toBe(pm1.dataValues.price);
        expect(result.items[1].id.id).toBe(pm2.id);
        expect(result.items[1].name).toBe(pm2.dataValues.name);
        expect(result.items[1].price).toBe(pm2.dataValues.price);
        expect(result.total()).toBe(300);
    })

    it("should generate a new invoice", async () => {
        //Creating invoice items...
        const items = [
            {
                id: new ID("1"),
                name: "Product 1",
                price: 100
            },
            {
                id: new ID("2"),
                name: "Product 2",
                price: 200
            }
        ];

        // Configuring invoices repository tests
        const address = new Address(
            "Street 1",
            "1",
            "Complement 1",
            "01100010",
            "City",
            "State"
        );
        const invoice = new Invoice({
            id: new ID("1"),
            name: "Client",
            document: "112358",
            items: items,
            address: address
        });
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);

        const result = await InvoiceModel.findOne({
            where: {id: invoice.id.id},
            include: ["items"]
        });

        expect(result.dataValues.id).toBe(invoice.id.id);
        expect(result.dataValues.name).toBe(invoice.name);
        expect(result.dataValues.document).toBe(invoice.document);
        expect(result.dataValues.street).toBe(invoice.address.street);
        expect(result.dataValues.number).toBe(invoice.address.number);
        expect(result.dataValues.complement).toBe(invoice.address.complement);
        expect(result.dataValues.city).toBe(invoice.address.city);
        expect(result.dataValues.state).toBe(invoice.address.state);
        expect(result.dataValues.zipCode).toBe(invoice.address.zipcode);
        expect(result.dataValues.items.length).toBe(2);
        expect(result.dataValues.items[0].dataValues.name).toBe(items[0].name);
        expect(result.dataValues.items[0].dataValues.price).toBe(items[0].price);
        expect(result.dataValues.items[1].dataValues.name).toBe(items[1].name);
        expect(result.dataValues.items[1].dataValues.price).toBe(items[1].price);

    })
});