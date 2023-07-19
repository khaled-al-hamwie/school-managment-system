import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import StudentGuard from "src/core/common/guards/student.guard";
import { PHONE_TAG } from "src/core/swagger/constants/swagger.tags";
import { Record } from "../records/entities/record.entity";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { HomeworkSubmissionsService } from "./homework-submissions.service";

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

    // teacher
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.homeworkSubmissionsService.findOne(+id);
    }
}
