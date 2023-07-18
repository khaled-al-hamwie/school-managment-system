import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { HomeworkSubmissionsService } from "./homework-submissions.service";

@Controller("homework-submissions")
export class HomeworkSubmissionsController {
    constructor(
        private readonly homeworkSubmissionsService: HomeworkSubmissionsService,
    ) {}

    // student
    @Post()
    create(@Body() createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
        return this.homeworkSubmissionsService.create(
            createHomeworkSubmissionDto,
        );
    }

    // teacher / student
    @Get()
    findAll() {
        return this.homeworkSubmissionsService.findAll();
    }

    // teacher
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.homeworkSubmissionsService.findOne(+id);
    }
}
