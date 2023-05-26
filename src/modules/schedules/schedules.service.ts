import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Includeable, Order, WhereOptions } from "sequelize";
import { saveModel } from "src/core/common/transformers/modelSave";
import { RoomAttributes } from "../rooms/interfaces/room.interface";
import { ScheduleDaysService } from "../schedule_days/schedule_days.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Schedule } from "./entities/schedule.entity";
import {
    ScheduleAttributes,
    ScheduleCreationAttributes,
} from "./interfaces/schedule.interface";

@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedule) private readonly ScheduleEntity: typeof Schedule,
        private readonly scheduleDaysService: ScheduleDaysService
    ) {}
    async create(
        room_id: ScheduleAttributes["room_id"],
        title: ScheduleAttributes["title"],
        createScheduleDto: CreateScheduleDto
    ) {
        const { days, lecture_number, rests, school_start } = createScheduleDto;

        const schedule = await this.ScheduleEntity.create({
            days_count: days.length,
            lecture_length: 45,
            rest_length: 15,
            room_id,
            title,
            is_current: true,
        });
        await this.scheduleDaysService.create({
            days,
            lecture_number,
            rests: rests,
            schedule_id: schedule.schedule_id,
            start_time: school_start,
        });
    }

    findAll(
        where: WhereOptions<ScheduleAttributes>,
        attributes?: (keyof ScheduleCreationAttributes)[]
    ) {
        return this.ScheduleEntity.findAll({
            where,
            attributes,
        });
    }

    findOne(
        where: WhereOptions<ScheduleAttributes>,
        attributes?: (keyof ScheduleCreationAttributes)[],
        include?: Includeable | Includeable[],
        order?: Order
    ) {
        return this.ScheduleEntity.findOne({
            where,
            attributes,
            include,
            order,
        });
    }

    async update(
        room_id: RoomAttributes["room_id"],
        title: ScheduleAttributes["title"]
    ) {
        const schedule = await this.findOne({ room_id });
        schedule.update({ title }).then(saveModel);
    }

    async updateSchedule(
        schedule_id: ScheduleAttributes["schedule_id"],
        updateScheduleDto: UpdateScheduleDto
    ) {
        const schedule = await this.checkSchedule(schedule_id);
        await this.scheduleDaysService.update({
            ...updateScheduleDto,
            schedule_id,
            days_count: schedule.days_count,
        });
        return "done";
    }

    async checkSchedule(schedule_id: ScheduleAttributes["schedule_id"]) {
        const schedule = await this.findOne({ schedule_id });
        if (!schedule) {
            throw new NotFoundException("schedule does'nt exist");
        }
        return schedule;
    }
    async remove(room_id: ScheduleAttributes["room_id"]) {
        await this.findOne({ room_id }).then(async (schedule) => {
            await this.scheduleDaysService.remove(schedule.schedule_id);
            await schedule.destroy();
        });
    }
}
