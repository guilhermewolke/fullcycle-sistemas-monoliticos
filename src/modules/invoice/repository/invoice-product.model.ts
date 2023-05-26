import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import ProductModel from "../../store-catalog/repository/product.model";
import Product from "../../store-catalog/domain/product.entity";

@Table({
    tableName: "invoice_item",
    timestamps: false
})
export default class InvoiceProductModel extends Model {

    @PrimaryKey
    @Column({allowNull: false, autoIncrement: true})
    declare id: number;

    @ForeignKey(() => InvoiceModel)
    @Column({allowNull: false})
    invoice_id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    price: number;
}