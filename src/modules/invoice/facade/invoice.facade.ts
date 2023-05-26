import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO } from "./invoice.facade.interface";

export interface UseCasesProps {
    generate?: UseCaseInterface;
    find?: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generate: UseCaseInterface;
    private _find: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._generate = props.generate;
        this._find = props.find;
    }

    generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
        return this._generate.execute(input);
    }

    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._find.execute(input);
    }

}