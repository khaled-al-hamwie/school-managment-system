import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { User } from "src/core/decorators/user.decorator";
import ManagerGuard from "src/core/guards/manager.guard";
import TeacherGuard from "src/core/guards/teacher.guard";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import ManagerPayload from "../auth/interfaces/manager.payload.interface";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
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

	@Get()
	findAll() {
		return this.teachersService.findAll();
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
