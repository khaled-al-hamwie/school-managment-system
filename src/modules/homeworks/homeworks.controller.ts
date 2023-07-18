import {
    Body,
    Controller,
    Delete,
    Get,
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
        @Query() query: FindAllHomeworkDto,
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        return this.homeworksService.findAll(query, page);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get(":id")
    findOne(
        @Param("id", ParseIntPipe)
        homework_id: HomeworkAttributes["homework_id"],
    ) {
        return this.homeworksService.findOne({ homework_id });
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe)
        homework_id: HomeworkAttributes["homework_id"],
        @Body() updateHomeworkDto: UpdateHomeworkDto,
    ) {
        return this.homeworksService.update(homework_id, updateHomeworkDto);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Delete(":id")
    remove(
        @Param("id", ParseIntPipe)
        homework_id: HomeworkAttributes["homework_id"],
    ) {
        return this.homeworksService.remove(+homework_id);
    }
    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("/student/:id")
    findStudentHomeworks(
        @Param("id", ParseIntPipe) student_id: StudentAttributes["student_id"],
    ) {
        return this.homeworksService.findStudentHomeworks(+student_id);
    }
}
