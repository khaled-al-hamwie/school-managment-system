import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { addTimes } from "src/core/common/transformers/addTimes.transform";
import { PHONE_TAG } from "src/core/swagger/constants/swagger.tags";
import { Lecture } from "../lectures/entities/lecture.entity";
import { Room } from "../rooms/entities/room.entity";
import { ScheduleDay } from "../schedule_days/entities/schedule_day.entity";
import { Schedule } from "../schedules/entities/schedule.entity";
import { Subject } from "../subjects/entities/subject.entity";
import Teacher from "../teachers/entities/teacher.entity";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { TeachInclude } from "./constants";
import { TeachesService } from "./teaches.service";

@Controller("teaches")
export class TeachesController {
    constructor(private readonly teachesService: TeachesService) {}

    // return all the teacher and what do they taech aka subject
    @Get()
    findAll() {
        return this.teachesService.findAll();
    }

    // another one get the teacher id and return what he teach and when
    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get("/teacher")
    async findTeacherTeach(
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"]
    ) {
        const teach = await this.teachesService.findAll({
            where: {
                teacher_id,
            },
            include: TeachInclude,
        });
        const t = teach.map((teach_object) => {
            return {
                // teach_id: teach_object.teach_id,
                // teacher_id: teach_object.teacher_id,
                // teacher_name:
                //     teach_object.teacher.first_name +
                //     " " +
                //     teach_object.teacher.last_name,
                // subject_id: teach_object.subject_id,

                lectures: teach_object.lectures.map((lec) => {
                    return {
                        day: lec.schedule_day.day,
                        room: lec.schedule_day.schedule.title,
                        subject_name: teach_object.subject.name,
                        start_time: lec.start_time,
                    };
                }),
            };
        });
        return t;
    }
}
