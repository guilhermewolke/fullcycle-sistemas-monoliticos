import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
};

describe("Add a Product Use-case unit test >", () => {
    it("should add a product", async () => {
        const rep = MockRepository();
        const uc = new AddProductUseCase(rep);

        const input = {
            name: "Product 1",
            description: "Product 1 Description",
            purchasePrice: 100,
            stock: 10
        }
        const result = await uc.execute(input);

        expect(rep.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
    });
});