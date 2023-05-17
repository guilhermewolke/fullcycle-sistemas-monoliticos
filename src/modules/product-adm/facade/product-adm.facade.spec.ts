import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("Product ADM Façade test", () => {
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

    it("should create a product", async() => {
        const facade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await facade.addProduct(input);

        const productDB = await ProductModel.findOne({
            where: {id: input.id}
        });

        expect(input.id).toBe(productDB.id);
        expect(input.name).toBe(productDB.name);
        expect(input.description).toBe(productDB.description);
        expect(input.purchasePrice).toBe(productDB.purchasePrice);
        expect(input.stock).toBe(productDB.stock);
    });

    it("should check a product stock", async() => {
        const facade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await facade.addProduct(input);

        const result = await facade.checkStock({productId: "1"})
        expect(result.id).toEqual(input.id);
        expect(result.stock).toBe(10);
    });
});