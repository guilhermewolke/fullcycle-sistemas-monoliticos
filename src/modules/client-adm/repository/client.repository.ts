import ID from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientGateway } from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }
    
    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({
            where: {
                id: id
            }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        return new Client({
            id: new ID(client.dataValues.id),
            name: client.dataValues.name,
            address: client.dataValues.address,
            email: client.dataValues.email,
            createdAt: client.dataValues.createdAt,
            updatedAt: client.dataValues.updatedAt
        });
    }

}