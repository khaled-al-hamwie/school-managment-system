import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Record } from "src/modules/records/entities/record.entity";
import {
    AttendanceAttributes,
    AttendanceCreationAttributes,
} from "../interfaces/attendance.interface";

@Table
export class Attendance
    extends Model<AttendanceAttributes, AttendanceCreationAttributes>
    implements AttendanceCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        autoIncrement: true,
    })
    attendance_id?: AttendanceAttributes["attendance_id"];

    @ForeignKey(() => Record)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    record_id: AttendanceAttributes["record_id"];

    @Column({
        type: DataType.STRING(245),
        allowNull: false,
        defaultValue: "no reason",
    })
    absence_reason?: AttendanceAttributes["absence_reason"];

    @CreatedAt
    @Column({
        allowNull: false,
        defaultValue: new Date(),
    })
    created_at?: Date;

    @BelongsTo(() => Record)
    record: Record;
}
