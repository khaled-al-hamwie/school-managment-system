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
import TeacherGuard from "src/core/guards/teacher.guard";
import {
    PHONE_TAG,
    TEACHER_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
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
        @Query("page", ParseIntPipe) page: number
    ) {
        return this.teachersService.findAll(query, page);
    }
    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get("profile")
    showProfile(
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"]
    ) {
        return this.teachersService.findOne({ teacher_id });
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) teacher_id: TeacherAttributes["teacher_id"]
    ) {
        const teacher = await this.teachersService.findOne({ teacher_id });
        if (!teacher) throw new NotFoundException("teacher does'nt exists");
        return teacher;
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) teacher_id: string,
        @Body() updateTeacherDto: UpdateTeacherDto
    ) {
        return this.teachersService.update(+teacher_id, updateTeacherDto);
    }
}
