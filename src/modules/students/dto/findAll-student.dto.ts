import { IsEnum, IsISO8601, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "src/core/enums/gender.enum";
import { Gender } from "src/core/types/gender.type";

export class FindAllStudentDto {
	@IsOptional()
	@IsString()
	first_name: string;

	@IsOptional()
	@IsString()
	last_name: string;

	@IsOptional()
	@IsString()
	father_name: string;

	@IsOptional()
	@IsString()
	mother_name: string;

	@IsOptional()
	@IsEnum(GenderEnum)
	gender: Gender;

	@IsOptional()
	@IsISO8601()
	birth_day: string;
}
