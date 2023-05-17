import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment-gateway";
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(private repository: PaymentGateway) {}

    async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO> {
        const transaction = new Transaction({
            amount: input.amount,
            orderID: input.orderID
        });
        
        transaction.process();
        const persistTransaction = await this.repository.save(transaction);
        return {
            transactionID: persistTransaction.id.id,
            orderID: persistTransaction.orderID,
            amount: persistTransaction.amount,
            status: transaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        }
    }
}