import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Payment } from "src/modules/payments/entities/payment.entity";
import {
    PriseAttributes,
    PriseCreationAttributes,
} from "../interfaces/prise.interface";

@Table({ tableName: "Prizes" })
export class Prise
    extends Model<PriseAttributes, PriseCreationAttributes>
    implements PriseCreationAttributes
{
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    })
    prise_id!: PriseAttributes["prise_id"];

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name!: PriseAttributes["name"];

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    details?: PriseAttributes["details"];

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    price!: PriseAttributes["price"];

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    created_at!: PriseAttributes["created_at"];

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    count!: PriseAttributes["count"];

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    picture?: PriseAttributes["picture"];

    @HasMany(() => Payment)
    payments: Payment[];
}
