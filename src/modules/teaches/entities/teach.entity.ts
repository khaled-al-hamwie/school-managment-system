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
import { Exam } from "src/modules/exams/entities/exam.entity";
import { Homework } from "src/modules/homeworks/entities/homework.entity";
import { Lecture } from "src/modules/lectures/entities/lecture.entity";
import { Subject } from "src/modules/subjects/entities/subject.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import {
    TeachAttributes,
    TeachCreationAttributes,
} from "../interfaces/teach.interface";

@Table
export class Teach
    extends Model<TeachAttributes, TeachCreationAttributes>
    implements TeachCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.MEDIUMINT.UNSIGNED,
    })
    teach_id?: TeachAttributes["teach_id"];

    @ForeignKey(() => Teacher)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    teacher_id: TeachAttributes["teacher_id"];

    @ForeignKey(() => Subject)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    subject_id: TeachAttributes["subject_id"];

    @BelongsTo(() => Teacher)
    teacher: Teacher;

    @BelongsTo(() => Subject)
    subject: Subject;

    @HasMany(() => Lecture)
    lectures: Lecture[];

    @HasMany(() => Homework)
    homeworks: Homework[];

    @HasMany(() => Exam)
    exams: Exam[];
}
