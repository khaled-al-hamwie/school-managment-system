import {
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import Student from "src/modules/students/entities/student.entity";
import {
    BusAttributes,
    BusCreationAttributes,
} from "../interfaces/bus.interface";

@Table
export class Bus
    extends Model<BusAttributes, BusCreationAttributes>
    implements BusCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    bus_id?: BusAttributes["bus_id"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    name: BusAttributes["name"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    bus_monitor_name: BusAttributes["bus_monitor_name"];

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    bus_monitor_phone_number: BusAttributes["bus_monitor_phone_number"];

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    arrival_time: BusAttributes["arrival_time"];

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    pick_up_time: BusAttributes["pick_up_time"];

    @Column({
        type: DataType.STRING(245),
        allowNull: true,
    })
    location_details?: BusAttributes["location_details"];

    @Column({
        type: DataType.DECIMAL(9, 2),
        allowNull: false,
        validate: { min: 0 },
    })
    semester_price: number;

    @Column({
        type: DataType.DECIMAL(9, 2),
        allowNull: false,
        validate: { min: 0 },
    })
    driver_fue: number;

    @HasMany(() => Student)
    students: Student[];
}
