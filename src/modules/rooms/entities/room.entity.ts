import { Column, DataType, ForeignKey, PrimaryKey, BelongsTo, HasMany, Model, Table } from "sequelize-typescript";
import { Class } from "src/modules/classes/entities/class.entity";
import { RoomAttributes, RoomCreationAttributes } from "../interfaces/room.interface";

@Table
export class Room extends Model<RoomAttributes, RoomCreationAttributes>
    implements RoomCreationAttributes {
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT,
    })
    room_id?: number;
    @ForeignKey(() => Class)
    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    class_id: number;
    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    max_students: number;

    @BelongsTo(() => Class)
    class: Class;

    // @HasMany(() => Lecture)
    // lectures: Lecture;

}

