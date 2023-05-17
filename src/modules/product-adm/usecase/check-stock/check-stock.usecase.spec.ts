import { Sequelize } from "sequelize-typescript";
import ID from "../../../@shared/domain/value-object/id.value-object";
import ProductModel from "../../repository/product.model";
import CheckStockUseCase from "./check-stock.usecase";
import ProductRepository from "../../repository/product.repository";
import Product from "../../domain/product.entity";

const product = new Product({
    id: new ID("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 100,
    stock: 10
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
};

describe("Check stock Use-case unit test >", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should get stock quantity for a product by its ID", async () => {
        const rep = MockRepository();
        const uc = new CheckStockUseCase(rep);

        const input = {
            productId: "1"
        }

        const result = await uc.execute(input);

        expect(rep.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.stock).toBe(10);
    });
});