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
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import {
    PHONE_TAG,
    TEACHER_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { Credential } from "../credentials/entities/credential.entity";
import { Subject } from "../subjects/entities/subject.entity";
import { Teach } from "../teaches/entities/teach.entity";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { FindAllTeacherDto } from "./dto/findAll-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { TeacherAttributes } from "./interfaces/teacher.interface";
import { TeachersService } from "./teachers.service";

@ApiTags(TEACHER_TAG)
@Controller("teachers")
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teachersService.create(createTeacherDto);
    }

    @ApiTags(PHONE_TAG)
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    login(@Body() body: CreateAuthDto) {
        return this.teachersService.login(body);
    }
    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(
        @Query() query: FindAllTeacherDto,
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        return this.teachersService.findAll(query, page);
    }
    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get("profile")
    showProfile(
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        return this.teachersService.findOne({
            where: { teacher_id },
            include: [
                { model: Credential, attributes: { exclude: ["password"] } },
                { model: Teach, include: [{ model: Subject }] },
            ],
        });
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) teacher_id: TeacherAttributes["teacher_id"],
    ) {
        const teacher = await this.teachersService.findOne({
            where: { teacher_id },
            include: [
                { model: Credential, attributes: { exclude: ["password"] } },
                { model: Teach, include: [{ model: Subject }] },
            ],
        });
        if (!teacher) throw new NotFoundException("teacher does'nt exists");
        return teacher;
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) teacher_id: string,
        @Body() updateTeacherDto: UpdateTeacherDto,
    ) {
        return this.teachersService.update(+teacher_id, updateTeacherDto);
    }
}
