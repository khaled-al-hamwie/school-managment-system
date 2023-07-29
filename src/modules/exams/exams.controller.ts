import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateExamDto } from "./dto/create-exam.dto";
import { ExamsService } from "./exams.service";

@Controller("exams")
export class ExamsController {
    constructor(private readonly examsService: ExamsService) {}

    // teacher
    @Post()
    create(@Body() createExamDto: CreateExamDto) {
        return this.examsService.create(createExamDto);
    }
    // teacher
    @Get()
    findAll() {
        return this.examsService.findAll();
    }
}
