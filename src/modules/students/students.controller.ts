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
	UseGuards,
} from "@nestjs/common";
import { User } from "src/core/decorators/user.decorator";
import ManagerGuard from "src/core/guards/manager.guard";
import StudentGuard from "src/core/guards/student.guard";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentAttributes } from "./interfaces/student.interface";
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

	@UseGuards(ManagerGuard)
	@Get()
	findAll() {
		return this.studentsService.findAll();
	}

	@UseGuards(StudentGuard)
	@Get("profile")
	showProfile(
		@User("student_id") student_id: StudentAttributes["student_id"]
	) {
		return this.studentsService.findOne({ student_id });
	}

	@UseGuards(ManagerGuard)
	@Get(":id")
	async findOne(@Param("id", ParseIntPipe) student_id: string) {
		const student = await this.studentsService.findOne({ student_id });
		if (!student) throw new NotFoundException("student dosen't exists");
		return student;
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) student_id: string,
		@Body() updateStudentDto: UpdateStudentDto
	) {
		return this.studentsService.update(+student_id, updateStudentDto);
	}
}
