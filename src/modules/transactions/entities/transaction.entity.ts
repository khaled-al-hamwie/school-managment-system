import { Column, DataType, Model, Table } from "sequelize-typescript";
import {
    TransactionAttributes,
    TransactionCreationAttributes,
} from "../interfaces/transaction.interface";

@Table
export class Transaction
    extends Model<TransactionAttributes, TransactionCreationAttributes>
    implements TransactionCreationAttributes
{
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    })
    transaction_id?: TransactionAttributes["transaction_id"];

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    teacher_id!: TransactionAttributes["teacher_id"];

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    student_id!: TransactionAttributes["student_id"];

    @Column({
        type: DataType.FLOAT.UNSIGNED,
        allowNull: false,
    })
    value!: TransactionAttributes["value"];

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    reason!: TransactionAttributes["reason"];

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    created_at?: TransactionAttributes["created_at"];
}
