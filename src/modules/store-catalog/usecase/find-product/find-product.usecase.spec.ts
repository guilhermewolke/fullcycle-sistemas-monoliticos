import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new ID("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 100
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("Find a product use case unit test", () => {
    it("should find a product", async () => {
        const rep = MockRepository();
        const uc = new FindProductUseCase(rep);

        const input = {
            id: "1"
        };

        const result = await uc.execute(input);

        expect(rep.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Description 1");
        expect(result.salesPrice).toBe(100);
    })
});