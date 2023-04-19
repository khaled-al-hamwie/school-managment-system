import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ValidationError, WhereOptions } from "sequelize";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import Teacher from "./entities/teacher.entity";
import { TeacherAttributes } from "./interfaces/teacher.interface";

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
					description: "Conflict",
				});
			}
		}
	}

	async login(body: CreateAuthDto) {
		const credentail = await this.credentailsService.verify(body);
		const teacher = await this.findOne({
			credential_id: credentail.credential_id,
		});
		if (!teacher) {
			throw new ForbiddenException("credentials don't match", {
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

	async findOne(options: WhereOptions<TeacherAttributes>) {
		return this.TeacherEntity.findOne({
			where: options,
			limit: 1,
		});
	}

	async update(
		teacher_id: TeacherAttributes["teacher_id"],
		updateTeacherDto: UpdateTeacherDto
	) {
		const teacher = await this.findOne({ teacher_id });
		if (!teacher) throw new NotFoundException("teacher dosen't exists");
		(await teacher.update(updateTeacherDto)).save();
		if (updateTeacherDto.password)
			this.credentailsService.update(
				teacher.credential_id,
				updateTeacherDto.password
			);
		return "done";
	}

	remove(id: number) {
		return `This action removes a #${id} teacher`;
	}
}
