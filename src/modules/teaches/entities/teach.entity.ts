import {
    TeachAttributes,
    TeachCreationAttributes,
} from "../interfaces/teach.interface";
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
//  import{ Lecture } from "src/modules/lectures/entities/lecture.entity";

@Table
export class Teach
    extends Model<TeachAttributes, TeachCreationAttributes>
    implements TeachCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT,
    })
    teach_id?: number;

    @ForeignKey(() => Teacher)
    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    teacher_id: number;

    @ForeignKey(() => Subject)
    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    subject_id: number;

    @BelongsTo(() => Teacher)
    teacher: Teacher;

    @BelongsTo(() => Subject)
    subject: Subject;

    // @HasMany(() => Lecture)
    // lectures: Lecture[];
}
