import { IsISO8601, IsOptional } from "class-validator";
import { AttendanceAttributes } from "../interfaces/attendance.interface";

export class findAllAttendanceDto {
    @IsOptional()
    @IsISO8601()
    created_at?: AttendanceAttributes["created_at"] | string;
}
