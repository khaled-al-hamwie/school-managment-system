import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import removeCredentails from "src/core/transformers/removeCredentails.transform";
import { AuthService } from "../auth/auth.service";
import { CredentialsService } from "../credentials/credentials.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import Student from "./entities/student.entity";

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

	findAll() {
		return `This action returns all students`;
	}

	findOne(id: number) {
		return `This action returns a #${id} student`;
	}

	update(id: number, updateStudentDto: UpdateStudentDto) {
		return `This action updates a #${id} student`;
	}

	remove(id: number) {
		return `This action removes a #${id} student`;
	}
}
