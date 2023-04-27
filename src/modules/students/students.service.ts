import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import removeCredentails from "src/core/transformers/removeCredentails.transform";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import Student from "./entities/student.entity";
import { StudentAttributes } from "./interfaces/student.interface";

@Injectable()
export class StudentsService {
	constructor(
		@InjectModel(Student) private readonly StudentEntity: typeof Student,
		private readonly credentailsService: CredentialsService,
		private readonly authService: AuthService
	) {}

	async create(createStudentDto: CreateStudentDto) {
		const credentail = await this.credentailsService.create({
			email: createStudentDto.email,
			user_name: createStudentDto.user_name,
			password: createStudentDto.password,
		});
		removeCredentails(createStudentDto);
		this.StudentEntity.create({
			credential_id: credentail.credential_id,
			...createStudentDto,
		});
		return "done";
	}

	async login(body: CreateAuthDto) {
		const credentail = await this.credentailsService.verify(body);
		const student = await this.findOne({
			credential_id: credentail.credential_id,
		});
		if (!student)
			throw new ForbiddenException("credentials don't match", {
				description: "Forbidden",
			});

		return this.authService.signToken({
			credentail_id: credentail.credential_id,
			student_id: student.student_id,
			user_name: credentail.user_name,
		});
	}

	findAll() {
		return `This action returns all students`;
	}

	async findOne(options: WhereOptions<StudentAttributes>) {
		return this.StudentEntity.findOne({
			where: options,
			limit: 1,
		});
	}

	async update(
		student_id: StudentAttributes["student_id"],
		updateStudentDto: UpdateStudentDto
	) {
		const student = await this.findOne({ student_id });
		if (!student) throw new NotFoundException("student dosen't exists");
		student.update(updateStudentDto).then((output) => output.save());
		if (updateStudentDto.password)
			this.credentailsService.update(
				student.credential_id,
				updateStudentDto.password
			);
		return "done";
	}
}
