import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RoomsService } from "../rooms/rooms.service";
import { ScheduleDaysService } from "../schedule_days/schedule_days.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Schedule } from "./entities/schedule.entity";
import { ScheduleAttributes } from "./interfaces/schedule.interface";

@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedule) private readonly ScheduleEntity: typeof Schedule,
        private readonly roomsService: RoomsService,
        private readonly scheduleDaysService: ScheduleDaysService
    ) {}
    async create(
        room_id: ScheduleAttributes["room_id"],
        createScheduleDto: CreateScheduleDto
    ) {
        await this.roomsService.checkRoom(room_id);
        this.createAsyncSchedule(createScheduleDto, room_id);
        return "done";
    }

    private async createAsyncSchedule(
        createScheduleDto: CreateScheduleDto,
        room_id: number
    ) {
        const { title, days, lecture_number, rests, school_start } =
            createScheduleDto;

        const schedule = await this.ScheduleEntity.create({
            days_count: days.length,
            lecture_length: 45,
            rest_length: 15,
            room_id,
            title,
        });
        await this.scheduleDaysService.create({
            days,
            lecture_number,
            rests: rests,
            schedule_id: schedule.schedule_id,
            start_time: school_start,
        });
    }

    findAll() {
        return `This action returns all schedules`;
    }

    findOne(id: number) {
        return `This action returns a #${id} schedule`;
    }

    update(id: number, updateScheduleDto: UpdateScheduleDto) {
        return `This action updates a #${id} schedule`;
    }

    remove(id: number) {
        return `This action removes a #${id} schedule`;
    }
}
