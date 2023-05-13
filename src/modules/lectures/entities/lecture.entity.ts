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
import { Room } from "src/modules/rooms/entities/room.entity";
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

    @ForeignKey(() => Room)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    room_id: LectureAttributes["room_id"];

    @ForeignKey(() => Teach)
    @Column({
        type: DataType.MEDIUMINT.UNSIGNED,
        allowNull: true,
    })
    teach_id?: LectureAttributes["teach_id"];

    @Column({
        type: DataType.ENUM(...DAY),
        allowNull: false,
    })
    day: LectureAttributes["day"];

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    start_time: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_rest?: boolean;

    @BelongsTo(() => Room)
    room: Room;

    @BelongsTo(() => Teach)
    teach: Teach;
}
