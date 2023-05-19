import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import ManagerGuard from "src/core/common/guards/manager.guard";
import StudentGuard from "src/core/common/guards/student.guard";
import { SCHEDULE_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import {
    scheduleAttributes,
    scheduleInclude,
    scheduleOrder,
} from "./constants";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { ScheduleAttributes } from "./interfaces/schedule.interface";
import { SchedulesService } from "./schedules.service";

@ApiTags(SCHEDULE_TAG)
@Controller()
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get("schedules")
    findAll() {
        return this.schedulesService.findAll(
            { is_current: true },
            scheduleAttributes
        );
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get("schedules/:id")
    findOne(
        @Param("id", ParseIntPipe)
        schedule_id: ScheduleAttributes["schedule_id"]
    ) {
        return this.schedulesService.findOne(
            { schedule_id },
            scheduleAttributes,
            scheduleInclude,
            scheduleOrder
        );
    }
    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("schedules/student")
    findStudentSchedule(@User("student_id") room_id) {
        return this.schedulesService.findOne(
            { room_id },
            scheduleAttributes,
            scheduleInclude,
            scheduleOrder
        );
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch("schedules/:id")
    update(
        @Param("id", ParseIntPipe)
        schedule_id: ScheduleAttributes["schedule_id"],
        @Body() body: UpdateScheduleDto
    ) {
        return this.schedulesService.updateSchedule(schedule_id, body);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.schedulesService.remove(+id);
    }
}
