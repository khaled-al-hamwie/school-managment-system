import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
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
    room_id: number;
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT,
    })
    lecture_id?: number;

    // @ForeignKey(() => Room)
    // @Column({
    //     type: DataType.SMALLINT,
    //     allowNull: false,
    // })
    // room_id: number;

    @ForeignKey(() => Teach)
    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    teach_id: number;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    day: number;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    period: number;

    // @BelongsTo(() => Room)
    // room: Room;

    @BelongsTo(() => Teach)
    teach: Teach;
}
