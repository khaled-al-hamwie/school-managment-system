import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import {
    PHONE_TAG,
    TEACHE_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { Subject } from "../subjects/entities/subject.entity";
import Teacher from "../teachers/entities/teacher.entity";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { TeachInclude } from "./constants";
import { TeachesService } from "./teaches.service";

@ApiTags(TEACHE_TAG)
@Controller("teaches")
export class TeachesController {
    constructor(private readonly teachesService: TeachesService) {}

    @ApiTags(WEB_TAG, PHONE_TAG)
    @Get()
    findAll() {
        return this.teachesService.findAll({
            include: [
                {
                    model: Teacher,
                },
                { model: Subject },
            ],
        });
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get("/teacher")
    async findTeacherTeach(
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        const teach = await this.teachesService.findAll({
            where: {
                teacher_id,
            },
            include: TeachInclude,
        });
        const t = teach
            .map((teach_object) =>
                teach_object.lectures.map((lec) => {
                    return {
                        day: lec.schedule_day.day,
                        room: lec.schedule_day.schedule.title,
                        subject_name: teach_object.subject.name,
                        start_time: lec.start_time,
                        lecture_number: lec.lecture_number,
                    };
                }),
            )
            .filter((arr) => arr.length > 1)[0];
        return t;
    }
}
