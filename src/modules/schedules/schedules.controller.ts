import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { SCHEDULE_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import {
    scheduleAttributes,
    scheduleInclude,
    scheduleOrder,
} from "./constants";
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

    @Put("schedules/:id")
    addLectures(
        @Param("id", ParseIntPipe)
        schedule_id: ScheduleAttributes["schedule_id"],
        @Body() body: any
    ) {
        return "adding the lectures";
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.schedulesService.remove(+id);
    }
}
