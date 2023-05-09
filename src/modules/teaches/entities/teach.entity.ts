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
import { Subject } from "src/modules/subjects/entities/subject.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import {
    TeachAttributes,
    TeachCreationAttributes,
} from "../interfaces/teach.interface";
//  import{ Lecture } from "src/modules/lectures/entities/lecture.entity";

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

    // @HasMany(() => Lecture)
    // lectures: Lecture[];
}
