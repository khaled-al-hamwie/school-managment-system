import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsISO8601, IsOptional, IsPhoneNumber } from "class-validator";
import { GenderEnum } from "src/core/enums/gender.enum";
import tolowerCaseTransform from "src/core/transformers/tolowercase.transform";
import NameValidator from "src/core/validators/name.validator";
import { CreateCredentialDto } from "src/modules/credentials/dto/create-credential.dto";
import { StudentAttributes } from "../interfaces/student.interface";

export class CreateStudentDto extends CreateCredentialDto {
	@ApiProperty({
		description: "The first name of the student",
		type: String,
		minimum: 3,
		maximum: 16,
	})
	@NameValidator(3, 16)
	first_name: StudentAttributes["first_name"];

	@NameValidator(3, 16)
	last_name: StudentAttributes["last_name"];

	@NameValidator(3, 16)
	father_name: StudentAttributes["father_name"];

	@NameValidator(3, 16)
	mother_name: StudentAttributes["mother_name"];

	@IsISO8601()
	birth_day: StudentAttributes["birth_day"] | string;

	@Transform(tolowerCaseTransform)
	@NameValidator(1, 2)
	@IsEnum(GenderEnum)
	gender: StudentAttributes["gender"];

	@IsOptional()
	@NameValidator(2, 10)
	nationality?: StudentAttributes["nationality"];

	@IsPhoneNumber("SY")
	phone_number: StudentAttributes["phone_number"];

	@NameValidator(5, 45)
	location: StudentAttributes["location"];
}
