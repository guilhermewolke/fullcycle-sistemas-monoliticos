import ID from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const product1 = {
    id: new ID("1"),
    name: "Product 1",
    price: 100
};
const product2 = {
    id: new ID("2"),
    name: "Product 2",
    price: 200
};
const products = [product1, product2];

const address = new Address("Rua 1", "1", "Fundos", "01110010", "Mogi das Cruzes", "SP")
const invoice = new Invoice({
    id: new ID("1"),
    name: "Clientezinho 1",
    document: "112358",
    address: address,
    items: products
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
};

describe("Find invoce by ID usecase unit test", () => {
    it("should find an invoice by its ID", async() => {
        const rep = MockRepository();
        const uc = new FindInvoiceUseCase(rep);

        const input = {
            id: "1"
        };

        const result = await uc.execute(input);
        expect(rep.find).toHaveBeenCalled();
        expect(result.id).toEqual(invoice.id.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.complement).toEqual(invoice.address.complement);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.zipcode).toEqual(invoice.address.zipcode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id).toEqual(invoice.items[1].id.id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.total).toBe(300);
    });
})