import { Body, Controller, Get, Post } from "@nestjs/common";
import { AttendancesService } from "./attendances.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";

@Controller("attendances")
export class AttendancesController {
    constructor(private readonly attendancesService: AttendancesService) {}

    @Post()
    create(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendancesService.create(createAttendanceDto);
    }

    @Get()
    findAll() {
        return this.attendancesService.findAll();
    }
}
