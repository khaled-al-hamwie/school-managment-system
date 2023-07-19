import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import StudentGuard from "src/core/common/guards/student.guard";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { PHONE_TAG } from "src/core/swagger/constants/swagger.tags";
import { Record } from "../records/entities/record.entity";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { HomeworkSubmissionsService } from "./homework-submissions.service";
import { HomeworkSubmissionAttributes } from "./interfaces/homework-submission.interface";

@Controller("homework-submissions")
export class HomeworkSubmissionsController {
    constructor(
        private readonly homeworkSubmissionsService: HomeworkSubmissionsService,
    ) {}

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Post()
    create(
        @Body() createHomeworkSubmissionDto: CreateHomeworkSubmissionDto,
        @User("student_id") student_id: StudentAttributes["student_id"],
    ) {
        createHomeworkSubmissionDto["student_id"] = student_id;
        return this.homeworkSubmissionsService.create(
            createHomeworkSubmissionDto,
        );
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("/student")
    async findStudentSubmissions(
        @User("student_id") student_id: StudentAttributes["student_id"],
    ) {
        const submissions =
            await this.homeworkSubmissionsService.findStudentSubmission(
                student_id,
            );
        if (submissions.length == 0) {
            throw new NotFoundException("no submission made yet");
        }
        return submissions;
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get(":id")
    async findHomeworkSubmession(
        @Param("id", ParseIntPipe)
        homework_id: HomeworkSubmissionAttributes["homework_id"],
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        console.info("hi");
        const submissions =
            await this.homeworkSubmissionsService.findHomewordSubmission(
                homework_id,
                teacher_id,
            );
        return submissions;
    }
}
