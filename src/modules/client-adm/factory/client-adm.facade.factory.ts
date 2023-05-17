import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create() {
        const rep = new ClientRepository();
        const addClientUC = new AddClientUseCase(rep);
        const findClientUC = new FindClientUseCase(rep);
        const facade = new ClientAdmFacade({
            addClientUseCase: addClientUC,
            findClientUseCase: findClientUC
        });
        return facade;
    }
}