import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import ManagerGuard from "src/core/guards/manager.guard";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentsService } from "./students.service";

@Controller("students")
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}

	@UseGuards(ManagerGuard)
	@Post()
	create(@Body() createStudentDto: CreateStudentDto) {
		return this.studentsService.create(createStudentDto);
	}

	@Post("/login")
	@HttpCode(HttpStatus.OK)
	login(@Body() body: CreateAuthDto) {
		return this.studentsService.login(body);
	}

	@Get()
	findAll() {
		return this.studentsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return `${id} not implemented yet`;
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateStudentDto: UpdateStudentDto
	) {
		return this.studentsService.update(+id, updateStudentDto);
	}
}
