import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ListProductsUseCase from "./list-products.usecase";

const product1 = new Product({
    id: new ID("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 100
});

const product2 = new Product({
    id: new ID("2"),
    name: "Product 2",
    description: "Description 2",
    salesPrice: 150
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    }
};

describe("Listing products test usecase unit test", () => {
    it("should list all of the products", async () => {
        const rep = MockRepository();
        const uc = new ListProductsUseCase(rep);

        const result = await uc.execute({});

        expect(rep.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe("1");
        expect(result.products[0].name).toBe("Product 1");
        expect(result.products[0].description).toBe("Description 1");
        expect(result.products[0].salesPrice).toBe(100);

        expect(result.products[1].id).toBe("2");
        expect(result.products[1].name).toBe("Product 2");
        expect(result.products[1].description).toBe("Description 2");
        expect(result.products[1].salesPrice).toBe(150);
    });
});