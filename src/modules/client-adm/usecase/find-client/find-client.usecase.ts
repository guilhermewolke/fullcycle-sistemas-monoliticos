import { ClientGateway } from "../../gateway/client.gateway";
import { FindClientInputDTO, FindClientOutputDTO } from "./find-client.dto";

export default class FindClientUseCase {
    private _repository: ClientGateway;

    constructor (rep: ClientGateway) {
        this._repository = rep;
    }

    async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
        const client = await this._repository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt 
        }
    }
}