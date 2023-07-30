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
import { Attendance } from "src/modules/attendances/entities/attendance.entity";
import { Class } from "src/modules/classes/entities/class.entity";
import { Grade } from "src/modules/grades/entities/grade.entity";
import { HomeworkSubmission } from "src/modules/homework-submissions/entities/homework-submission.entity";
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

    @HasMany(() => HomeworkSubmission)
    homework_submissions: HomeworkSubmission[];

    @HasMany(() => Attendance)
    attendances: Attendance[];

    @HasMany(() => Grade)
    grades: Grade[];
}
