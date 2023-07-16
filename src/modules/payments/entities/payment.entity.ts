import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Prise } from "src/modules/prizes/entities/prise.entity";
import Student from "src/modules/students/entities/student.entity";
import {
    PaymentAttributes,
    PaymentCreationAttributes,
} from "../interfaces/payment.interface";

@Table
export class Payment
    extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER.UNSIGNED,
    })
    payment_id!: PaymentAttributes["payment_id"];

    @ForeignKey(() => Prise)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    prise_id!: PaymentAttributes["prise_id"];

    @ForeignKey(() => Student)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    student_id!: PaymentAttributes["student_id"];

    @Column
    @Column({
        allowNull: false,
        defaultValue: new Date(),
    })
    created_at!: PaymentAttributes["created_at"];

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => Prise)
    prise: Prise;
}
