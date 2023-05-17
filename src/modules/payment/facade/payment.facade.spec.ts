import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import TransactionRepository from "../repository/transaction.repository";
import PaymentFacade from "./payment.facade";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment Facade unit test", () => {
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

    it("should process a payment transaction", async() => {
        const facade = PaymentFacadeFactory.create();

        const input = {
            orderID: "order-1",
            amount: 100
        };


        const output = await facade.process(input);
        expect(output.transactionID).toBeDefined();
        expect(output.orderID).toBe(input.orderID);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
    });
});