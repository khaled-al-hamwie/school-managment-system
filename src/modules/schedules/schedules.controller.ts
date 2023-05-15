import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { SCHEDULE_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { ScheduleAttributes } from "./interfaces/schedule.interface";
import { SchedulesService } from "./schedules.service";

@ApiTags(SCHEDULE_TAG)
@Controller("rooms/:room_id/schedules")
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(
        @Param("room_id", ParseIntPipe) room_id: ScheduleAttributes["room_id"],
        @Body() createScheduleDto: CreateScheduleDto
    ) {
        return this.schedulesService.create(room_id, createScheduleDto);
    }

    @Get()
    findAll() {
        return this.schedulesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.schedulesService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateScheduleDto: UpdateScheduleDto
    ) {
        return this.schedulesService.update(+id, updateScheduleDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.schedulesService.remove(+id);
    }
}
