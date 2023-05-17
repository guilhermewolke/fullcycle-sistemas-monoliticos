import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import ID from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
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

    it("should create a product", async () => {
        const productProps = {
            id: new ID("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10
        }
        const product = new Product(productProps);
        const rep = new ProductRepository();
        await rep.add(product);

        const productDB = await ProductModel.findOne({
            where: {id: productProps.id.id}
        });

        expect(productProps.id.id).toBe(productDB.id);
        expect(productProps.name).toBe(productDB.name);
        expect(productProps.description).toBe(productDB.description);
        expect(productProps.purchasePrice).toBe(productDB.purchasePrice);
        expect(productProps.stock).toBe(productDB.stock);
    });

    it("should find a product", async () => {
        const rep = new ProductRepository();

        ProductModel.create({
            id: new ID("1").id,
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const productDB = await ProductModel.findOne({
            where: {id: new ID("1").id}
        });

        const p = await rep.find("1");

        expect(p.id.id).toEqual("1");
        expect(p.name).toEqual("Product 1");
        expect(p.description).toEqual("Product 1 description");
        expect(p.purchasePrice).toEqual(100);
        expect(p.stock).toEqual(10);
    });
});