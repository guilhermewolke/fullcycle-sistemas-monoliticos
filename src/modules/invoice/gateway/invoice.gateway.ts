import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";

export interface InvoiceGateway {
    generate(invoice: Invoice): Promise<Invoice>;
    find(id: string): Promise<Invoice>;
}