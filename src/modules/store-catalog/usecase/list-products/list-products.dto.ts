export interface ListProductsInputDTO {}

export interface ListProductsDTO {
    products: {
        id: string,
        name: string,
        description: string,
        salesPrice: number
    }[];
}
