import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import StudentGuard from "src/core/common/guards/student.guard";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import {
    HOMEWORK_TAG,
    PHONE_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { FindAllHomeworkDto } from "./dto/findAll-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { HomeworksService } from "./homeworks.service";
import { HomeworkAttributes } from "./interfaces/homework.interface";

@ApiTags(HOMEWORK_TAG)
@Controller("homeworks")
export class HomeworksController {
    constructor(private readonly homeworksService: HomeworksService) {}

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Post()
    create(
        @Body() createHomeworkDto: CreateHomeworkDto,
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        createHomeworkDto.teacher_id = teacher_id;
        return this.homeworksService.create(createHomeworkDto);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get()
    findAll(
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
        @Query() query: FindAllHomeworkDto,
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        return this.homeworksService.findAll(query, teacher_id, page);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("/student")
    findStudentHomeworks(
        @User("student_id") student_id: StudentAttributes["student_id"],
    ) {
        return this.homeworksService.findStudentHomeworks(student_id);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe)
        homework_id: HomeworkAttributes["homework_id"],
    ) {
        const homework = await this.homeworksService.findOne({ homework_id });
        if (!homework) throw new NotFoundException("home work doesn't exists");
        return homework;
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe)
        homework_id: HomeworkAttributes["homework_id"],
        @Body() updateHomeworkDto: UpdateHomeworkDto,
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        updateHomeworkDto["teacher_id"] = teacher_id;
        return this.homeworksService.update(homework_id, updateHomeworkDto);
    }
}
