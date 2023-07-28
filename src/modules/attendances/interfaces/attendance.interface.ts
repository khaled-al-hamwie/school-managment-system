import { Optional } from "sequelize";

export interface AttendanceAttributes {
    attendance_id?: number;
    record_id: number;
    created_at?: Date;
    absence_reason?: string;
}
export type AttendanceCreationAttributes = Optional<
    AttendanceAttributes,
    "attendance_id"
>;
