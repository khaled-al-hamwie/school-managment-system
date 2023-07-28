import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { AttendancesService } from "./attendances.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";

@Controller("attendances")
export class AttendancesController {
    constructor(private readonly attendancesService: AttendancesService) {}

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendancesService.create(createAttendanceDto);
    }

    @Get()
    findAll() {
        return this.attendancesService.findAll();
    }
}
