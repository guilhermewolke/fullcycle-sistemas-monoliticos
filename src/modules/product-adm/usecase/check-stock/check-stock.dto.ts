export interface CheckStockInputDTO {
    productId: string;
}

export interface CheckStockOutputDTO {
    id: string;
    stock: number;
}