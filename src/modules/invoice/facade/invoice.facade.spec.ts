import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceProductModel from "../repository/invoice-product.model";
import InvoiceFacadeFactory from "../factory/facade.factory";
import ID from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "../domain/invoice.entity";

describe("Invoice Facade for generation and searching test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([InvoiceModel, InvoiceProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a new invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "Clientezinho 1",
            document: "112358",
            street: "Rua 1",
            number: "1",
            complement: "Fundos",
            city: "Mogi das Cruzes",
            state: "SP",
            zipcode: "01110010",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100
                },{
                    id: "2",
                    name: "Product 2",
                    price: 200
                }
            ]
        };

        const result = await facade.generate(input);

        const invoiceDB = await InvoiceModel.findOne({
            where: {id: result.id},
            include: ["items"]
        })
        expect(invoiceDB).toBeDefined();
        expect(invoiceDB.dataValues.name).toBe("Clientezinho 1");
        expect(invoiceDB.dataValues.document).toBe("112358");
        expect(invoiceDB.dataValues.street).toBe("Rua 1");
        expect(invoiceDB.dataValues.number).toBe("1");
        expect(invoiceDB.dataValues.complement).toBe("Fundos");
        expect(invoiceDB.dataValues.city).toBe("Mogi das Cruzes");
        expect(invoiceDB.dataValues.state).toBe("SP");
        expect(invoiceDB.dataValues.zipCode).toBe("01110010");
        expect(invoiceDB.dataValues.items[0].dataValues.id).toBeDefined();
        expect(invoiceDB.dataValues.items[0].dataValues.name).toBe("Product 1");
        expect(invoiceDB.dataValues.items[0].dataValues.price).toBe(100);
        expect(invoiceDB.dataValues.items[1].dataValues.id).toBeDefined();
        expect(invoiceDB.dataValues.items[1].dataValues.name).toBe("Product 2");
        expect(invoiceDB.dataValues.items[1].dataValues.price).toBe(200);
    });

    it("should find an invoice and its items by its ID", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "Clientezinho 1",
            document: "112358",
            street: "Rua 1",
            number: "1",
            complement: "Fundos",
            city: "Mogi das Cruzes",
            state: "SP",
            zipcode: "01110010",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100
                },{
                    id: "2",
                    name: "Product 2",
                    price: 200
                }
            ]
        };

        const created = await facade.generate(input);

        const found = await facade.find({id: created.id})

        expect(found.name).toBe("Clientezinho 1");
        expect(found.document).toBe("112358");
        expect(found.address.street).toBe("Rua 1");
        expect(found.address.number).toBe("1");
        expect(found.address.complement).toBe("Fundos");
        expect(found.address.city).toBe("Mogi das Cruzes");
        expect(found.address.state).toBe("SP");
        expect(found.address.zipcode).toBe("01110010");
        expect(found.items[0].id).toBeDefined();
        expect(found.items[0].name).toBe("Product 1");
        expect(found.items[0].price).toBe(100);
        expect(found.items[1].id).toBeDefined();
        expect(found.items[1].name).toBe("Product 2");
        expect(found.items[1].price).toBe(200);
    });
})