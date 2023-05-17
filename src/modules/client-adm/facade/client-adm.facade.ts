import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDTO, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface UseCaseProps {
    addClientUseCase?: UseCaseInterface;
    findClientUseCase?: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUseCase: UseCaseInterface;
    private _addUseCase: UseCaseInterface;

    constructor(ucProps: UseCaseProps){
        this._addUseCase = ucProps.addClientUseCase;
        this._findUseCase = ucProps.findClientUseCase;
    }

    async add(input: AddClientFacadeInputDTO): Promise<void> {
        await this._addUseCase.execute(input);
    }

    async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
        return await this._findUseCase.execute(input);
    }
    
}