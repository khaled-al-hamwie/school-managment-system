import { IsEnum, IsISO8601, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "src/core/enums/gender.enum";
import { StudentAttributes } from "../interfaces/student.interface";

export class FindAllStudentDto {
	@IsOptional()
	@IsString()
	first_name: StudentAttributes["first_name"];

	@IsOptional()
	@IsString()
	last_name: StudentAttributes["last_name"];

	@IsOptional()
	@IsString()
	father_name: StudentAttributes["father_name"];

	@IsOptional()
	@IsString()
	mother_name: StudentAttributes["mother_name"];

	@IsOptional()
	@IsEnum(GenderEnum)
	gender: StudentAttributes["gender"];
}
