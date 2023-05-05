import {
    ClassAttributes,
    ClassCreationAttributes,
} from "../interfaces/class.interface";
import {
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Room } from "src/modules/rooms/entities/room.entity";

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
    class_id?: number;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.DECIMAL(9, 2),
        allowNull: false,
    })
    max_rooms: number;
    @HasMany(() => Room)
    rooms: Room[];
    // @HasMany(() => Subject)
    // subjects: Subject[];
}