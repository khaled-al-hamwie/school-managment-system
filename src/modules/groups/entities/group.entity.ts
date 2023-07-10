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
import {
    GroupAttributes,
    GroupCreationAttributes,
} from "../interfaces/group.interface";

@Table
export class Group
    extends Model<GroupAttributes, GroupCreationAttributes>
    implements GroupCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    group_id?: GroupAttributes["group_id"];

    @ForeignKey(() => Room)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
    })
    room_id: GroupAttributes["room_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: GroupAttributes["name"];

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    picture_url?: string;

    @BelongsTo(() => Room)
    room: Room;
}
