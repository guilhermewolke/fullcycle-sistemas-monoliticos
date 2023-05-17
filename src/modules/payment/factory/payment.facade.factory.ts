import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const rep = new TransactionRepository();
        const uc = new ProcessPaymentUseCase(rep);
        return new PaymentFacade(uc);
    }
}