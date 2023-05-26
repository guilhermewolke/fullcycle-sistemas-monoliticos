import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe("Add client use case unit tests", () => {
    it("should add a client", async () => {
        const rep = MockRepository();
        const uc = new AddClientUseCase(rep);

        const input = {
            name: "Clientezinho 1",
            email: "cliente@zin.ho",
            address: "Rua 1"
        };

        const result = await uc.execute(input);
        expect(rep.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.address).toEqual(input.address);
        expect(result.email).toEqual(input.email);
    });
});