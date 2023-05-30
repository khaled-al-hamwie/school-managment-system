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
import { User } from "src/core/common/decorators/user.decorator";
import ManagerGuard from "src/core/common/guards/manager.guard";
import StudentGuard from "src/core/common/guards/student.guard";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import {
    PHONE_TAG,
    STUDENT_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { Bus } from "../buses/entities/bus.entity";
import { Credential } from "../credentials/entities/credential.entity";
import { Record } from "../records/entities/record.entity";
import { Room } from "../rooms/entities/room.entity";
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
        @Query("page", ParseIntPagePipe) page: number
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
        return this.studentsService.findOne({
            where: { student_id },
            include: [
                { model: Credential, attributes: { exclude: ["password"] } },
                { model: Bus },
                { model: Room },
            ],
        });
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) student_id: string) {
        const student = await this.studentsService.findOne({
            where: { student_id },
            include: [
                { model: Credential },
                { model: Bus },
                { model: Room },
                { model: Record },
            ],
        });
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
