import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { PHONE_TAG } from "src/core/swagger/constants/swagger.tags";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { CreateExamDto } from "./dto/create-exam.dto";
import { FindAllExamDto } from "./dto/findAll-exam.dto";
import { ExamsService } from "./exams.service";

@Controller("exams")
export class ExamsController {
    constructor(private readonly examsService: ExamsService) {}

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Post()
    create(
        @Body() createExamDto: CreateExamDto,
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        createExamDto.teacher_id = teacher_id;
        return this.examsService.create(createExamDto);
    }

    // teacher
    // by room
    // by subject
    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get()
    findAll(
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
        @Query() query: FindAllExamDto,
    ) {
        query.teacher_id = teacher_id;
        return this.examsService.findAll(query);
    }
}
