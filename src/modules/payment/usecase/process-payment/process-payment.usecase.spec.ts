import ID from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase";

const approvedTransaction = new Transaction({
    id: new ID("1"),
    amount: 100,
    orderID: "1",
    status: "approved"
});

const ApprovedMockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(approvedTransaction))
    }
}

const declinedTransaction = new Transaction({
    id: new ID("1"),
    amount: 99,
    orderID: "1",
    status: "declined"
});

const DeclinedMockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(declinedTransaction))
    }
}

describe("Process payment use case unit test", () => {
    it("should approve a transaction", async () => {
        const rep = ApprovedMockRepository();
    
        const uc = new ProcessPaymentUseCase(rep);
    
        const input = {
            orderID: "1",
            amount: 100
        }

        const result = await uc.execute(input);
        expect(rep.save).toHaveBeenCalled();
        expect(result.transactionID).toBe(approvedTransaction.id.id);
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderID).toBe("1");
        expect(result.createdAt).toBe(approvedTransaction.createdAt);
        expect(result.updatedAt).toBe(approvedTransaction.updatedAt);
    });

    it("should decline a transaction", async() => {
        const rep = DeclinedMockRepository();
    
        const uc = new ProcessPaymentUseCase(rep);
    
        const input = {
            orderID: "1",
            amount: 99
        };

        const result = await uc.execute(input);
        expect(rep.save).toHaveBeenCalled();
        expect(result.transactionID).toBe(declinedTransaction.id.id);
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(99);
        expect(result.orderID).toBe("1");
        expect(result.createdAt).toBe(declinedTransaction.createdAt);
        expect(result.updatedAt).toBe(declinedTransaction.updatedAt);
    })
});