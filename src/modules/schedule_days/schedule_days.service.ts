import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions, Op } from "sequelize";
import { Lecture } from "../lectures/entities/lecture.entity";
import { LecturesService } from "../lectures/lectures.service";
import { DayDto, LectureDto } from "../schedules/dto/update-schedule.dto";
import { TeachesService } from "../teaches/teaches.service";
import { CreateScheduleDayDto } from "./dto/create-schedule_day.dto";
import { UpdateScheduleDayDto } from "./dto/update-schedule_day.dto";
import { ScheduleDay } from "./entities/schedule_day.entity";
import { ScheduleDayAttributes } from "./interfaces/schedule_day.interface";

@Injectable()
export class ScheduleDaysService {
    constructor(
        @InjectModel(ScheduleDay)
        private readonly ScheduleDayEntity: typeof ScheduleDay,
        private readonly lecturesService: LecturesService,
        private readonly teachesService: TeachesService,
    ) {}
    async create(createScheduleDayDto: CreateScheduleDayDto) {
        const { days, lecture_number, rests, schedule_id, start_time } =
            createScheduleDayDto;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const schedule_day = await this.ScheduleDayEntity.create({
                day,
                schedule_id,
                lecture_number,
                start_time,
            });
            await this.lecturesService.addLectures(
                start_time,
                lecture_number,
                schedule_day.schedule_day_id,
                rests,
            );
        }
    }

    findAll(options: FindOptions<ScheduleDayAttributes>) {
        return this.ScheduleDayEntity.findAll(options);
    }

    async update(body: UpdateScheduleDayDto) {
        const scheduleDays = await this.checkDay(body);
        for (let i = 0; i < body.days.length; i++) {
            const schedule_day = scheduleDays.find(
                (schedule_day_object) =>
                    schedule_day_object.day == body.days[i].day,
            );
            await this.lecturesService.updateLectures({
                schedule_day_id: schedule_day.schedule_day_id,
                lectures: body.days[i].lectures,
            });
        }
    }

    private async checkDay(body: UpdateScheduleDayDto) {
        const scheduleDays = await this.findAll({
            where: { schedule_id: body.schedule_id },
            attributes: ["day", "schedule_day_id", "lecture_number"],
            limit: body.days_count,
        });
        const days = scheduleDays.map((day) => day.day);
        const error = [];
        for (let i = 0; i < body.days.length; i++) {
            const day_object = body.days[i];
            if (this.scheduleNotIncludeDay(days, day_object))
                error.push(
                    `the day ${day_object.day} is not allowed provied a day from ${days}`,
                );
            await this.checkLecturesLength(day_object, scheduleDays, error);
        }
        console.info("here the errror iarr", error);
        if (error.length >= 1) throw new ForbiddenException(error);
        return scheduleDays;
    }

    private async checkLecturesLength(
        day_object: DayDto,
        scheduleDays: ScheduleDay[],
        error: any[],
    ) {
        for (let i = 0; i < day_object.lectures.length; i++) {
            const lecture = day_object.lectures[i];

            if (lecture.lecture_number > scheduleDays[0].lecture_number)
                error.push(
                    `the lecture_number ${lecture.lecture_number} on the day ${day_object.day} is not allowed please provide a value <=${scheduleDays[0].lecture_number}`,
                );
            await this.checkTeacherTeachOnSameDay(
                day_object.day,
                lecture,
                error,
            );
        }
    }

    private scheduleNotIncludeDay(
        days: ("sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri")[],
        day_object: DayDto,
    ) {
        return !days.includes(day_object.day);
    }

    async checkTeacherTeachOnSameDay(
        day: "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri",
        lecture: LectureDto,
        error: any[],
    ) {
        if (lecture.teach_id == 0) return;
        const teacher_id = (
            await this.teachesService.checkTeach(lecture.teach_id)
        ).teacher_id;
        const teaches_ids = (
            await this.teachesService.findAll({ where: { teacher_id } })
        ).map((teach_object) => teach_object.teach_id);
        const lecture_in_time = await this.findAll({
            where: { day },
            include: [
                {
                    model: Lecture,
                    where: {
                        lecture_number: lecture.lecture_number,
                        teach_id: {
                            [Op.in]: teaches_ids,
                        },
                    },
                },
            ],
        });
        if (lecture_in_time.length >= 1) {
            error.push(
                `the teach on day ${day} on lecture_number ${lecture.lecture_number} with the teach ${lecture.teach_id} has a conflict with other lecture with id ${lecture_in_time[0].lectures[0].lecture_id}`,
            );
        }
    }

    async remove(schedule_id: ScheduleDayAttributes["schedule_id"]) {
        await this.findAll({ where: { schedule_id } }).then(async (records) => {
            for (let i = 0; i < records.length; i++) {
                const schedule_day = records[i];
                await this.lecturesService.remove(schedule_day.schedule_day_id);
                await schedule_day.destroy();
            }
        });
    }
}
