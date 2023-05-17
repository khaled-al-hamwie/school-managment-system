import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { ScheduleDay } from "src/modules/schedule_days/entities/schedule_day.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import {
    LectureAttributes,
    LectureCreationAttributes,
} from "../interfaces/lecture.interface";

@Table
export class Lecture
    extends Model<LectureAttributes, LectureCreationAttributes>
    implements LectureCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    lecture_id?: LectureAttributes["lecture_id"];

    @ForeignKey(() => ScheduleDay)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    schedule_day_id: LectureAttributes["schedule_day_id"];

    @ForeignKey(() => Teach)
    @Column({
        type: DataType.MEDIUMINT.UNSIGNED,
        allowNull: true,
    })
    teach_id?: LectureAttributes["teach_id"];

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    start_time: LectureAttributes["start_time"];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_rest?: LectureAttributes["is_rest"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: true,
    })
    lecture_number?: LectureAttributes["lecture_number"];

    @BelongsTo(() => ScheduleDay)
    schedule_day: ScheduleDay;

    @BelongsTo(() => Teach)
    teach: Teach;
}
