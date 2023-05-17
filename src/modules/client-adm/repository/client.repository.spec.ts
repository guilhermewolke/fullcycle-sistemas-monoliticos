import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import ID from "../../@shared/domain/value-object/id.value-object";

describe("Client repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new client", async() => {
        const client = new Client({
            id: new ID("1"),
            name: "Clientezinho",
            email: "cliente@zin.ho",
            address: "Enderecinho do clientezinho"
        });

        const rep = new ClientRepository();
        await rep.add(client);

        const clientDB = await ClientModel.findOne({where: {id: "1"}});
        
        expect(clientDB).toBeDefined();
        expect(clientDB.dataValues.id).toBe("1");
        expect(clientDB.dataValues.name).toBe("Clientezinho");
        expect(clientDB.dataValues.email).toBe("cliente@zin.ho");
        expect(clientDB.dataValues.address).toBe("Enderecinho do clientezinho");

    });

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Clientezinho",
            email: "cliente@zin.ho",
            address: "Enderecinho do clientezinho",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        const rep = new ClientRepository();
        const result = await rep.find(client.dataValues.id);
        
        expect(result.id.id).toEqual(client.dataValues.id);
        expect(result.name).toEqual(client.dataValues.name);
        expect(result.email).toEqual(client.dataValues.email);
        expect(result.address).toEqual(client.dataValues.address);
        expect(result.createdAt).toEqual(client.dataValues.createdAt);
        expect(result.updatedAt).toEqual(client.dataValues.updatedAt);
    });
});