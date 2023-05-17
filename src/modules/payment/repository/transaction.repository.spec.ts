import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import ID from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";

describe("Transaction repository unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a transaction", async () => {
        const transaction = new Transaction({
            id: new ID("1"),
            amount: 100,
            orderID: "1"
        });

        transaction.approve();

        const repository = new TransactionRepository();
        const result = await repository.save(transaction);

        expect(result.id).toBeDefined();
        expect(result.id.id).toBe(transaction.id.id);
        expect(result.orderID).toBe(transaction.orderID);
        expect(result.status).toBe(transaction.status);
        expect(result.amount).toBe(transaction.amount);
        expect(result.amount).toBe(transaction.amount);

    });
});