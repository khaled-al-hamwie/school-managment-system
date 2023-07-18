import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Bus } from "src/modules/buses/entities/bus.entity";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import { Message } from "src/modules/messages/entities/message.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { Record } from "src/modules/records/entities/record.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Transaction } from "src/modules/transactions/entities/transaction.entity";
import {
    StudentAttributes,
    StudentCreationAttributes,
} from "../interfaces/student.interface";

@Table
export default class Student
    extends Model<StudentAttributes, StudentCreationAttributes>
    implements StudentCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    student_id?: StudentAttributes["student_id"];

    @ForeignKey(() => Credential)
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
    })
    credential_id: StudentAttributes["credential_id"];

    @ForeignKey(() => Room)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: true,
    })
    room_id?: StudentAttributes["room_id"];

    @ForeignKey(() => Bus)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: true,
    })
    bus_id?: StudentAttributes["bus_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    first_name: StudentAttributes["first_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    last_name: StudentAttributes["last_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    father_name: StudentAttributes["father_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    mother_name: StudentAttributes["mother_name"];

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birth_day: StudentAttributes["birth_day"];

    @Column({
        type: DataType.STRING(2),
        allowNull: false,
    })
    gender: StudentAttributes["gender"];

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
        defaultValue: "UK",
    })
    nationality?: StudentAttributes["nationality"];

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    phone_number: StudentAttributes["phone_number"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    location: StudentAttributes["location"];

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
    })
    registration_date?: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    points: StudentAttributes["points"];

    @BelongsTo(() => Credential)
    credentail: Credential;

    @BelongsTo(() => Room)
    room: Room;

    @BelongsTo(() => Bus)
    bus: Bus;

    @HasMany(() => Record)
    records: Record[];

    @HasMany(() => Message)
    messages: Message[];

    @HasMany(() => Transaction)
    transactions: Transaction[];

    @HasMany(() => Payment)
    payments: Payment[];
}
