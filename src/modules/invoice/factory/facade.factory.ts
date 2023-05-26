import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const rep = new InvoiceRepository();
        const generateUC = new GenerateInvoiceUseCase(rep);
        const findUC = new FindInvoiceUseCase(rep);
        const facade = new InvoiceFacade({
            generate: generateUC,
            find: findUC
        });

        return facade;
    }
}