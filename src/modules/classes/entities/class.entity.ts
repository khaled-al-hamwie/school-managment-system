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
        type: DataType.SMALLINT.UNSIGNED,
    })
    class_id?: ClassAttributes["class_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: ClassAttributes["name"];

    @Column({
        type: DataType.STRING(9),
        allowNull: false,
    })
    year: ClassAttributes["year"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    number_of_lectures: number;

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    lecture_length: number;

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    rest_length: number;
    @HasMany(() => Room)
    rooms: Room[];
    // @HasMany(() => Subject)
    // subjects: Subject[];
}
