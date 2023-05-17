import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Includeable, Order, WhereOptions } from "sequelize";
import { RoomAttributes } from "../rooms/interfaces/room.interface";
import { ScheduleDaysService } from "../schedule_days/schedule_days.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
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
        const u = await this.findOne({ room_id });
        console.info(u);
        return u;
        // this.ScheduleEntity.update(,{title})
    }

    remove(id: number) {
        return `This action removes a #${id} schedule`;
    }
}
// fri sat sun mon tue
// fri mon sat sun tue

// sat sun mon tue fri
