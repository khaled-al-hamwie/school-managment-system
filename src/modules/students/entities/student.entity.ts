import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Gender } from "src/core/common/types/gender.type";
import { Credential } from "src/modules/credentials/entities/credential.entity";
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
        type: DataType.SMALLINT,
    })
    student_id?: number;

    @ForeignKey(() => Credential)
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
    })
    credential_id: number;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    first_name: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    last_name: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    father_name: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    mother_name: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birth_day: Date;

    @Column({
        type: DataType.STRING(2),
        allowNull: false,
    })
    gender: Gender;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
        defaultValue: "UK",
    })
    nationality?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    phone_number: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    location: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
    })
    registration_date?: Date;

    @BelongsTo(() => Credential)
    credentail: Credential;
}
