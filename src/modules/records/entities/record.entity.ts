import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Class } from "src/modules/classes/entities/class.entity";
import Student from "src/modules/students/entities/student.entity";
import {
    RecordAttributes,
    RecordCreationAttributes,
} from "../interfaces/record.interface";

@Table
export class Record
    extends Model<RecordAttributes, RecordCreationAttributes>
    implements RecordCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
    })
    record_id?: RecordAttributes["record_id"];

    @ForeignKey(() => Class)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    class_id: RecordAttributes["class_id"];

    @ForeignKey(() => Student)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    student_id: number;

    @Column({
        type: DataType.STRING(9),
        allowNull: false,
    })
    year: RecordAttributes["year"];

    @BelongsTo(() => Class)
    class: Class;

    @BelongsTo(() => Student)
    student: Student;
}
