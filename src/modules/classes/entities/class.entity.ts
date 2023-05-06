import {
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Room } from "src/modules/rooms/entities/room.entity";
import {
    ClassAttributes,
    ClassCreationAttributes,
} from "../interfaces/class.interface";

@Table
export class Class
    extends Model<ClassAttributes, ClassCreationAttributes>
    implements ClassCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT,
    })
    class_id?: ClassAttributes["class_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: ClassAttributes["name"];

    @Column({
        type: DataType.TINYINT,
        allowNull: false,
    })
    max_rooms: ClassAttributes["max_rooms"];

    @HasMany(() => Room)
    rooms: Room[];
    // @HasMany(() => Subject)
    // subjects: Subject[];
}
