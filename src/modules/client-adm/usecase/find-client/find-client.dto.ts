export interface FindClientInputDTO {
    id: string;
}

export interface FindClientOutputDTO {
    id: string;
    name: string;
    address: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}