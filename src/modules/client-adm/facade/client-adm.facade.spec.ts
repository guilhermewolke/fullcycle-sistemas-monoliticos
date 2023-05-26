import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client Adm Facade unit tests", () => {
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

    it("should create a new client", async () => {
        const facade = ClientAdmFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "Clientezinho",
            email: "cliente@zin.ho",
            address: "Enderecinho do clientezinho"
        };
        await facade.add(input);

        const client = await ClientModel.findOne({ where: {id: "1"}});
        //console.log(client);
        expect(client).toBeDefined();
        expect(client.dataValues.name).toBe(input.name);
        expect(client.dataValues.email).toBe(input.email);
        expect(client.dataValues.address).toBe(input.address);
    });

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Clientezinho",
            email: "cliente@zin.ho",
            document: "123",
            address: "Enderecinho do clientezinho",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1"
        };
        
        const result = await facade.find(input);

        //console.log(client);
        expect(result).toBeDefined();
        expect(client.dataValues.id).toBe(result.id);
        expect(client.dataValues.name).toBe(result.name);
        expect(client.dataValues.email).toBe(result.email);
        expect(client.dataValues.address).toBe(result.address);
    });
});