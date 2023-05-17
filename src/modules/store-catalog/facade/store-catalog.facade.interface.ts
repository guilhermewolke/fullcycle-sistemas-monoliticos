export interface FindStoreCatalogFacadeInputDTO {
    id: string;
}

export interface FindStoreCatalogFacadeOutputDTO {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface ListStoreCatalogFacadeOutputDTO {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export interface StoreCatalogFacadeInterface {
    find(id: any): Promise<FindStoreCatalogFacadeOutputDTO>;
    findAll(): Promise<ListStoreCatalogFacadeOutputDTO>;
}