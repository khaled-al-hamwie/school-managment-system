import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import ManagerGuard from "src/core/guards/manager.guard";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
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
		@Query("first_name") first_name: TeacherAttributes["first_name"],
		@Query("middle_name") middle_name: TeacherAttributes["middle_name"],
		@Query("last_name") last_name: TeacherAttributes["last_name"],
		@Query("gender") gender: TeacherAttributes["gender"],
		@Query("page") page: number
	) {
		return this.teachersService.findAll(
			{
				first_name,
				last_name,
				middle_name,
				gender,
			},
			page
		);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return "not done";
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
