import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAttributeOptions, WhereOptions } from "sequelize";
import { LecturesService } from "../lectures/lectures.service";
import {
    DayDto,
    UpdateScheduleDto,
} from "../schedules/dto/update-schedule.dto";
import { CreateScheduleDayDto } from "./dto/create-schedule_day.dto";
import { UpdateScheduleDayDto } from "./dto/update-schedule_day.dto";
import { ScheduleDay } from "./entities/schedule_day.entity";
import { ScheduleDayAttributes } from "./interfaces/schedule_day.interface";

@Injectable()
export class ScheduleDaysService {
    constructor(
        @InjectModel(ScheduleDay)
        private readonly ScheduleDayEntity: typeof ScheduleDay,
        private readonly lecturesService: LecturesService
    ) {}
    async create(createScheduleDayDto: CreateScheduleDayDto) {
        const { days, lecture_number, rests, schedule_id, start_time } =
            createScheduleDayDto;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            let schedule_day = await this.ScheduleDayEntity.create({
                day,
                schedule_id,
                lecture_number,
                start_time,
            });
            await this.lecturesService.addLectures(
                start_time,
                lecture_number,
                schedule_day.schedule_day_id,
                rests
            );
        }
    }

    findAll(
        where: WhereOptions<ScheduleDayAttributes>,
        attributes?: FindAttributeOptions,
        limit?: number
    ) {
        return this.ScheduleDayEntity.findAll({
            where,
            limit,
            attributes,
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} scheduleDay`;
    }
    async update(body: UpdateScheduleDayDto) {
        const scheduleDays = await this.checkDay(body);

        for (let i = 0; i < body.days.length; i++) {
            let schedule_day = scheduleDays.find(
                (schedule_day_object) =>
                    schedule_day_object.day == body.days[i].day
            );
            await this.lecturesService.updateLectures({
                schedule_day_id: schedule_day.schedule_day_id,
                lectures: body.days[i].lectures,
            });
        }
    }

    private async checkDay(body: UpdateScheduleDayDto) {
        const scheduleDays = await this.findAll(
            { schedule_id: body.schedule_id },
            ["day", "schedule_day_id", "lecture_number"],
            body.days_count
        );
        const days = scheduleDays.map((day) => day.day);
        const error = [];
        body.days.forEach((day_object) => {
            if (this.scheduleNotIncludeDay(days, day_object))
                error.push(
                    `the day ${day_object.day} is not allowed provied a day from ${days}`
                );
            day_object.lectures.forEach((lecture) => {
                if (lecture.lecture_number > scheduleDays[0].lecture_number)
                    error.push(
                        `the lecture_number ${lecture.lecture_number} on the day ${day_object.day} is not allowed please provide a value <=${scheduleDays[0].lecture_number}`
                    );
            });
        });
        if (error.length >= 1) throw new ForbiddenException(error);
        return scheduleDays;
    }

    private scheduleNotIncludeDay(
        days: ("sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri")[],
        day_object: DayDto
    ) {
        return !days.includes(day_object.day);
    }

    remove(id: number) {
        return `This action removes a #${id} scheduleDay`;
    }
}
