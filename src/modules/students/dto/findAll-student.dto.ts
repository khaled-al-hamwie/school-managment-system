import { IsEnum, IsISO8601, IsOptional, IsString } from "class-validator";

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
	@IsEnum(["f", "m"])
	gender: "f" | "m";

	@IsOptional()
	@IsISO8601()
	birth_day: string;
}
