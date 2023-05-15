import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Sequelize } from "sequelize-typescript";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { SCHEDULE_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { Lecture } from "../lectures/entities/lecture.entity";
import { ScheduleDay } from "../schedule_days/entities/schedule_day.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
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
    @Post("rooms/:room_id/schedules")
    create(
        @Param("room_id", ParseIntPipe) room_id: ScheduleAttributes["room_id"],
        @Body() createScheduleDto: CreateScheduleDto
    ) {
        return this.schedulesService.create(room_id, createScheduleDto);
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get("rooms/:room_id/schedules")
    findAllScheduleForRoom(
        @Param("room_id", ParseIntPipe) room_id: ScheduleAttributes["room_id"],
        @Query("current", new DefaultValuePipe(false), ParseBoolPipe)
        is_current: ScheduleAttributes["is_current"]
    ) {
        return this.schedulesService.findAll({ room_id, is_current }, [
            "schedule_id",
            "days_count",
            "title",
            "created_at",
            "updated_at",
        ]);
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get("rooms/schedules")
    findAll(
        @Query("current", new DefaultValuePipe(false), ParseBoolPipe)
        is_current: ScheduleAttributes["is_current"]
    ) {
        return this.schedulesService.findAll({ is_current }, [
            "room_id",
            "schedule_id",
            "days_count",
            "title",
            "created_at",
            "updated_at",
        ]);
    }

    @Get("rooms/schedules/:id")
    findOne(
        @Param("id", ParseIntPipe)
        schedule_id: ScheduleAttributes["schedule_id"]
    ) {
        return this.schedulesService.findOne(
            { schedule_id },
            [
                "schedule_id",
                "room_id",
                "title",
                "is_current",
                "created_at",
                "updated_at",
            ],
            [
                {
                    model: ScheduleDay,
                    attributes: { exclude: ["schedule_id"] },
                    include: [
                        {
                            model: Lecture,
                            attributes: { exclude: ["schedule_day_id"] },
                        },
                    ],
                },
            ]
        );
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
