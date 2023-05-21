
import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import { HomeworkAttributes, HomeworkCreationAttributes } from "../interfaces/homework.interface";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";

@Table
export class Homework
    extends Model<HomeworkAttributes, HomeworkCreationAttributes>
    implements HomeworkCreationAttributes {
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    homework_id?: HomeworkAttributes['homework_id'];
    @ForeignKey(() => Room)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    room_id: HomeworkAttributes['room_id'];
    @ForeignKey(() => Teach)
    @Column({
        type: DataType.MEDIUMINT.UNSIGNED,
        allowNull: false,
    })
    teach_id: HomeworkAttributes['teach_id'];
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at: HomeworkAttributes['created_at'];
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    deadline_date: HomeworkAttributes['created_at'];
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: HomeworkAttributes['description'];
    @BelongsTo(() => Room)
    room: Room;
    @BelongsTo(() => Teach)
    teach: Teach;
    // has many homework submissions..
}
