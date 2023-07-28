import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Op } from "sequelize";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { Class } from "../classes/entities/class.entity";
import { Record } from "../records/entities/record.entity";
import Student from "../students/entities/student.entity";
import { AttendancesService } from "./attendances.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { findAllAttendanceDto } from "./dto/findAll-attendance.dto";

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

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(@Query() query: findAllAttendanceDto) {
        return this.attendancesService.findAll({
            where: {
                created_at: query["created_at"]
                    ? { [Op.gt]: new Date(query["created_at"]) }
                    : {
                          [Op.gt]: new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                          ),
                      },
            },
            include: [
                {
                    model: Record,
                    include: [
                        {
                            model: Class,
                        },
                        { model: Student },
                    ],
                },
            ],
        });
    }
}
