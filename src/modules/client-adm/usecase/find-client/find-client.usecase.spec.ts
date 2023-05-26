import ID from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new ID("1"),
    name: "Clientezinho 1",
    email: "cliente@zin.ho",
    address: "Rua 1"
});


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    };
};
describe("Find a client use case unit tests", () => {
    it("should add a new client", async () => {
        const rep = MockRepository();
        const uc = new FindClientUseCase(rep);

        const input = {
            id: "1"
        };

        const result = await uc.execute(input);

        expect(rep.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
    });
});