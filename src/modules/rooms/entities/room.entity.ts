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
import { Schedule } from "src/modules/schedules/entities/schedule.entity";
import {
    RoomAttributes,
    RoomCreationAttributes,
} from "../interfaces/room.interface";

@Table
export class Room
    extends Model<RoomAttributes, RoomCreationAttributes>
    implements RoomCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        autoIncrement: true,
    })
    room_id?: RoomAttributes["room_id"];

    @ForeignKey(() => Class)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    class_id: RoomAttributes["class_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: RoomAttributes["name"];

    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    student_count: RoomAttributes["student_count"];

    @BelongsTo(() => Class)
    class: Class;

    @HasMany(() => Schedule)
    scheduals: Schedule;
}
