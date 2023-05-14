import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import { Room } from "src/modules/rooms/entities/room.entity";
import { ScheduleDay } from "src/modules/schedule_days/entities/schedule_day.entity";
import {
    ScheduleAttributes,
    ScheduleCreationAttributes,
} from "../interfaces/schedule.interface";

@Table
export class Schedule
    extends Model<ScheduleAttributes, ScheduleCreationAttributes>
    implements ScheduleCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        autoIncrement: true,
    })
    schedule_id?: ScheduleAttributes["schedule_id"];

    @ForeignKey(() => Room)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    room_id: ScheduleAttributes["room_id"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    title: ScheduleAttributes["title"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    lecture_length: ScheduleAttributes["lecture_length"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    rest_length: ScheduleAttributes["rest_length"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    days_count: ScheduleAttributes["days_count"];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_current: ScheduleAttributes["is_current"];

    @CreatedAt
    @Column({
        allowNull: false,
        defaultValue: new Date(),
    })
    created_at: Date;

    @UpdatedAt
    @Column({
        allowNull: false,
        defaultValue: new Date(),
    })
    updated_at: Date;

    @BelongsTo(() => Room)
    room: Room;

    @HasMany(() => ScheduleDay)
    schedule_days: ScheduleDay[];
}
