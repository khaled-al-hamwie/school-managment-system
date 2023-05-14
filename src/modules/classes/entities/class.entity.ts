import {
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Subject } from "src/modules/subjects/entities/subject.entity";
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
        type: DataType.SMALLINT.UNSIGNED,
    })
    class_id?: ClassAttributes["class_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: ClassAttributes["name"];

    @HasMany(() => Room)
    rooms: Room[];

    @HasMany(() => Subject)
    subjects: Subject[];
}
