import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Exam } from "src/modules/exams/entities/exam.entity";
import { Record } from "src/modules/records/entities/record.entity";
import {
    GradeAttributes,
    GradeCreationAttributes,
} from "../interfaces/grade.interface";

@Table
export class Grade
    extends Model<GradeAttributes, GradeCreationAttributes>
    implements GradeCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
    })
    grade_id?: GradeAttributes["grade_id"];

    @ForeignKey(() => Exam)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    exam_id: GradeAttributes["exam_id"];

    @ForeignKey(() => Record)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    record_id: GradeAttributes["record_id"];

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: true,
    })
    grade: GradeAttributes["grade"];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    checked: GradeAttributes["checked"];

    @BelongsTo(() => Exam)
    exam: Exam;

    @BelongsTo(() => Record)
    record: Record;
}
