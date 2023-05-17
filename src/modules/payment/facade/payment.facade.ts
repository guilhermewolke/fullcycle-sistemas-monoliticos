import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDTO, PaymentFacadeOutputDTO } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {

    constructor(private processPaymentUC: UseCaseInterface) {}

    async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
        return this.processPaymentUC.execute(input);
    }

}