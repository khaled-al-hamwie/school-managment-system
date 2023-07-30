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
import { Class } from "src/modules/classes/entities/class.entity";
import { Grade } from "src/modules/grades/entities/grade.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import {
    ExamAttributes,
    ExamCreationAttributes,
} from "../interfaces/exam.interface";

@Table
export class Exam
    extends Model<ExamAttributes, ExamCreationAttributes>
    implements ExamCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER.UNSIGNED,
    })
    exam_id?: ExamAttributes["exam_id"];
    @ForeignKey(() => Class)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    class_id: ExamAttributes["class_id"];
    @ForeignKey(() => Teach)
    @Column({
        type: DataType.MEDIUMINT.UNSIGNED,
        allowNull: false,
    })
    teach_id: ExamAttributes["teach_id"];
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    exam_date: ExamAttributes["exam_date"];

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    exam_link: ExamAttributes["exam_link"];
    @BelongsTo(() => Class)
    class: Class;
    @BelongsTo(() => Teach)
    teach: Teach;

    @HasMany(() => Grade)
    grades: Grade[];
}
