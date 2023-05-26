import Address from "../../../@shared/domain/value-object/address.value-object";
import ID from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        find: jest.fn()
    };
}

describe("Generate a new Invoice use-case unit test >", () => {
    it("should generate the invoice", async () => {
        const rep = MockRepository();
        const uc = new GenerateInvoiceUseCase(rep);

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

        const result = await uc.execute(input);
        expect(rep.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual("Clientezinho 1");
        expect(result.document).toEqual("112358");
        expect(result.street).toEqual("Rua 1");
        expect(result.number).toEqual("1");
        expect(result.complement).toEqual("Fundos");
        expect(result.city).toEqual("Mogi das Cruzes");
        expect(result.state).toEqual("SP");
        expect(result.zipcode).toEqual("01110010");
        expect(result.items[0].id).toEqual("1");
        expect(result.items[0].name).toEqual("Product 1");
        expect(result.items[0].price).toEqual(100);
        expect(result.items[1].id).toEqual("2");
        expect(result.items[1].name).toEqual("Product 2");
        expect(result.items[1].price).toEqual(200);
        expect(result.total).toEqual(300);
    });
});