import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/decorators/user.decorator";
import ManagerGuard from "src/core/guards/manager.guard";
import StudentGuard from "src/core/guards/student.guard";
import { ParseIntPagePipe } from "src/core/pipes/ParseIntPage.pipe";
import {
    PHONE_TAG,
    STUDENT_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { FindAllStudentDto } from "./dto/findAll-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentAttributes } from "./interfaces/student.interface";
import { StudentsService } from "./students.service";

@ApiTags(STUDENT_TAG)
@Controller("students")
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.create(createStudentDto);
    }

    @ApiTags(PHONE_TAG)
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    login(@Body() body: CreateAuthDto) {
        return this.studentsService.login(body);
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(
        @Query() query: FindAllStudentDto,
        @Query("page", ParseIntPagePipe) page: number = 0
    ) {
        return this.studentsService.findAll(query, page);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("profile")
    showProfile(
        @User("student_id") student_id: StudentAttributes["student_id"]
    ) {
        return this.studentsService.findOne({ student_id });
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) student_id: string) {
        const student = await this.studentsService.findOne({ student_id });
        if (!student) throw new NotFoundException("student dosen't exists");
        return student;
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) student_id: string,
        @Body() updateStudentDto: UpdateStudentDto
    ) {
        return this.studentsService.update(+student_id, updateStudentDto);
    }
}