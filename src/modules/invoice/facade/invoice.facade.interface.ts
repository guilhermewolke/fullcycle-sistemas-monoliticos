export interface FindInvoiceFacadeInputDTO {
    id: string;
}

export interface FindInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipcode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}

export interface GenerateInvoiceFacadeInputDTO {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface GenerateInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}

export default interface InvoiceFacadeInterface {
    generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO>;
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
}