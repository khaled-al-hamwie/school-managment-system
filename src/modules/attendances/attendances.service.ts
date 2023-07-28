import { Injectable } from "@nestjs/common";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";

@Injectable()
export class AttendancesService {
    create(createAttendanceDto: CreateAttendanceDto) {
        return "This action adds a new attendance";
    }

    findAll() {
        return `This action returns all attendances`;
    }
}
