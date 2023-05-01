import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
	IsEnum,
	IsISO8601,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsPositive,
} from "class-validator";
import { GenderEnum } from "src/core/enums/gender.enum";
import tolowerCaseTransform from "src/core/transformers/tolowercase.transform";
import NameValidator from "src/core/validators/name.validator";
import { CreateCredentialDto } from "src/modules/credentials/dto/create-credential.dto";
import { TeacherAttributes } from "../interfaces/teacher.interface";

export class CreateTeacherDto extends CreateCredentialDto {
	@NameValidator(3, 16)
	first_name: TeacherAttributes["first_name"];

	@NameValidator(3, 16)
	middle_name: TeacherAttributes["middle_name"];

	@NameValidator(3, 16)
	last_name: TeacherAttributes["last_name"];

	@ApiProperty({ type: "ISO8601 date", default: "2020-02-12" })
	@IsISO8601()
	birth_day: TeacherAttributes["birth_day"] | string;

	@ApiProperty({ enum: GenderEnum, default: "f" })
	@Transform(tolowerCaseTransform)
	@NameValidator(1, 2)
	@IsEnum(GenderEnum)
	gender: TeacherAttributes["gender"];

	@IsOptional()
	@NameValidator(2, 10)
	nationality?: TeacherAttributes["nationality"];

	@ApiProperty({ default: "0944332211" })
	@IsPhoneNumber("SY")
	phone_number: TeacherAttributes["phone_number"];

	@NameValidator(5, 45)
	location: TeacherAttributes["location"];

	@IsPositive()
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	salary: TeacherAttributes["salary"];
}
