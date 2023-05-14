import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { DAY } from "src/core/common/types/day.type";
import { Schedule } from "src/modules/schedules/entities/schedule.entity";
import {
    ScheduleDayAttributes,
    ScheduleDayCreationAttributes,
} from "../interfaces/schedule_day.interface";

@Table
export class ScheduleDay
    extends Model<ScheduleDayAttributes, ScheduleDayCreationAttributes>
    implements ScheduleDayCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    schedule_day_id?: ScheduleDayAttributes["schedule_day_id"];

    @ForeignKey(() => Schedule)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    schedule_id: ScheduleDayAttributes["schedule_id"];

    @Column({
        type: DataType.ENUM(...DAY),
        allowNull: false,
    })
    day: ScheduleDayAttributes["day"];

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    start_time: ScheduleDayAttributes["start_time"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    lecture_number: ScheduleDayAttributes["lecture_number"];

    @BelongsTo(() => Schedule)
    schedule: Schedule;
}
