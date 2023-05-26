import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ClientModel from "../../client-adm/repository/client.model";
import InvoiceItemModel from "./invoice-product.model";
import InvoiceProductModel from "./invoice-product.model";

@Table({
    tableName: "invoice",
    timestamps: false
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull:false})
    id: string;

    @Column({allowNull:false})
    name: string;

    @Column({allowNull:false})
    document: string;

    @Column({allowNull: false})
    street: string;

    @Column({allowNull: false})
    number: string;

    @Column({allowNull: false})
    complement: string;

    @Column({allowNull: false})
    city: string;

    @Column({allowNull: false})
    state: string;

    @Column({allowNull: false})
    zipCode: string;
    
    @HasMany(() => InvoiceProductModel)
    items: InvoiceProductModel[];

    @Column({allowNull:false})
    createdAt: Date;

    @Column({allowNull:false})
    updatedAt: Date;
}