import {
	ConflictException,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ValidationError } from "sequelize";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import Teacher from "./entities/teacher.entity";

@Injectable()
export class TeachersService {
	constructor(
		@InjectModel(Teacher) private readonly TeacherEntity: typeof Teacher,
		private readonly credentailsService: CredentialsService,
		private readonly authService: AuthService
	) {}
	async create(createTeacherDto: CreateTeacherDto) {
		const credentail = await this.credentailsService.create({
			email: createTeacherDto.email,
			user_name: createTeacherDto.user_name,
			password: createTeacherDto.password,
		});
		try {
			await this.TeacherEntity.create({
				credential_id: credentail.credential_id,
				first_name: createTeacherDto.first_name,
				middle_name: createTeacherDto.middle_name,
				last_name: createTeacherDto.last_name,
				location: createTeacherDto.location,
				phone_number: createTeacherDto.phone_number,
				salary: createTeacherDto.salary,
				birth_day: createTeacherDto.birth_day,
				gender: createTeacherDto.gender,
				nationality: createTeacherDto.nationality,
			});
			return "done";
		} catch (error) {
			if (error instanceof ValidationError) {
				this.credentailsService.remove(credentail.credential_id);
				throw new ConflictException([error.errors[0].message], {
					description: "Forbidden",
				});
			}
		}
	}

	async login(body: CreateAuthDto) {
		const credentail = await this.credentailsService.verify(body);
		const teacher = await this.TeacherEntity.findOne({
			where: {
				credential_id: credentail.credential_id,
			},
		});
		if (!teacher) {
			throw new ForbiddenException("account don't exist", {
				description: "Forbidden",
			});
		}
		return this.authService.signToken({
			credentail_id: credentail.credential_id,
			teacher_id: teacher.teacher_id,
			user_name: credentail.user_name,
		});
	}

	findAll() {
		return `This action returns all teachers`;
	}

	findOne(id: number) {
		return `This action returns a #${id} teacher`;
	}

	update(id: number, updateTeacherDto: UpdateTeacherDto) {
		return `This action updates a #${id} teacher`;
	}

	remove(id: number) {
		return `This action removes a #${id} teacher`;
	}
}
