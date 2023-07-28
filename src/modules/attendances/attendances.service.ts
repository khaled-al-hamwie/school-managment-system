import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Record } from "../records/entities/record.entity";
import { StudentsService } from "../students/students.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { Attendance } from "./entities/attendance.entity";

@Injectable()
export class AttendancesService {
    constructor(
        @InjectModel(Attendance)
        private readonly AttendanceEntity: typeof Attendance,
        private readonly studentsService: StudentsService,
    ) {}
    async create(createAttendanceDto: CreateAttendanceDto) {
        const student = await this.studentsService.findOne({
            where: { student_id: createAttendanceDto.student_id },
            include: [{ model: Record, order: [["year", "DESC"]] }],
        });
        if (!student) throw new NotFoundException("student dont exist");
        this.AttendanceEntity.create({
            absence_reason: createAttendanceDto["reason"],
            record_id: student.records[0].record_id,
        });
        return "done";
    }

    findAll() {
        return `This action returns all attendances`;
    }
}
