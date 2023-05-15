import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { addTimes } from "src/core/common/transformers/addTimes.transform";
import { LecturesService } from "../lectures/lectures.service";
import { CreateScheduleDayDto } from "./dto/create-schedule_day.dto";
import { UpdateScheduleDayDto } from "./dto/update-schedule_day.dto";
import { ScheduleDay } from "./entities/schedule_day.entity";

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

    findAll() {
        return `This action returns all scheduleDays`;
    }

    findOne(id: number) {
        return `This action returns a #${id} scheduleDay`;
    }

    update(id: number, updateScheduleDayDto: UpdateScheduleDayDto) {
        return `This action updates a #${id} scheduleDay`;
    }

    remove(id: number) {
        return `This action removes a #${id} scheduleDay`;
    }
}
