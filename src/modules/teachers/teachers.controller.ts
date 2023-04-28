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
import { User } from "src/core/decorators/user.decorator";
import ManagerGuard from "src/core/guards/manager.guard";
import TeacherGuard from "src/core/guards/teacher.guard";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { FindAllTeacherDto } from "./dto/findAll-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { TeacherAttributes } from "./interfaces/teacher.interface";
import { TeachersService } from "./teachers.service";

@Controller("teachers")
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	@UseGuards(ManagerGuard)
	@Post()
	create(@Body() createTeacherDto: CreateTeacherDto) {
		return this.teachersService.create(createTeacherDto);
	}

	@Post("/login")
	@HttpCode(HttpStatus.OK)
	login(@Body() body: CreateAuthDto) {
		return this.teachersService.login(body);
	}

	@UseGuards(ManagerGuard)
	@Get()
	findAll(
		@Query() query: FindAllTeacherDto,
		@Query("page", ParseIntPipe) page: number
	) {
		return this.teachersService.findAll(query, page);
	}

	@UseGuards(TeacherGuard)
	@Get("profile")
	showProfile(
		@User("teacher_id") teacher_id: TeacherAttributes["teacher_id"]
	) {
		return this.teachersService.findOne({ teacher_id });
	}

	@UseGuards(ManagerGuard)
	@Get(":id")
	async findOne(
		@Param("id", ParseIntPipe) teacher_id: TeacherAttributes["teacher_id"]
	) {
		const teacher = await this.teachersService.findOne({ teacher_id });
		if (!teacher) throw new NotFoundException("teacher does'nt exists");
		return teacher;
	}

	@UseGuards(ManagerGuard)
	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) teacher_id: string,
		@Body() updateTeacherDto: UpdateTeacherDto
	) {
		return this.teachersService.update(+teacher_id, updateTeacherDto);
	}
}
