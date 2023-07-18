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
import { Credential } from "src/modules/credentials/entities/credential.entity";
import { Message } from "src/modules/messages/entities/message.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import { Transaction } from "src/modules/transactions/entities/transaction.entity";
import {
    TeacherAttributes,
    TeacherCreationAttributes,
} from "../interfaces/teacher.interface";
@Table
export default class Teacher
    extends Model<TeacherAttributes, TeacherCreationAttributes>
    implements TeacherCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    teacher_id?: TeacherAttributes["teacher_id"];

    @ForeignKey(() => Credential)
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
    })
    credential_id: TeacherAttributes["credential_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    first_name: TeacherAttributes["first_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    middle_name: TeacherAttributes["middle_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    last_name: TeacherAttributes["last_name"];

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birth_day: TeacherAttributes["birth_day"];

    @Column({
        type: DataType.STRING(2),
        allowNull: false,
    })
    gender: TeacherAttributes["gender"];

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
        defaultValue: "UK",
    })
    nationality?: TeacherAttributes["nationality"];

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    phone_number: TeacherAttributes["phone_number"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    location: TeacherAttributes["location"];

    @Column({
        type: DataType.DECIMAL(9, 2),
        allowNull: false,
        validate: { min: 0 },
    })
    salary: TeacherAttributes["salary"];

    @BelongsTo(() => Credential)
    credentail: Credential;

    @HasMany(() => Teach)
    teaches: Teach[];

    @HasMany(() => Message)
    messages: Message[];

    @HasMany(() => Transaction)
    transactions: Transaction[];
}
