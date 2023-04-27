import { Transform } from "class-transformer";
import {
	IsISO8601,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsPositive,
} from "class-validator";
import tolowerCaseTransform from "src/core/transformers/tolowercase.transform";
import NameValidator from "src/core/validators/name.validator";
import { CreateManagerDto } from "src/modules/managers/dto/create-manager.dto";
import { TeacherAttributes } from "../interfaces/teacher.interface";

export class CreateTeacherDto extends CreateManagerDto {
	@NameValidator(3, 16)
	first_name: TeacherAttributes["first_name"];

	@NameValidator(3, 16)
	middle_name: TeacherAttributes["middle_name"];

	@NameValidator(3, 16)
	last_name: TeacherAttributes["last_name"];

	@IsISO8601()
	birth_day: TeacherAttributes["birth_day"] | string;

	@Transform(tolowerCaseTransform)
	@NameValidator(1, 2)
	gender: TeacherAttributes["gender"];

	@IsOptional()
	@NameValidator(2, 10)
	nationality?: TeacherAttributes["nationality"];

	@IsPhoneNumber("SY")
	phone_number: TeacherAttributes["phone_number"];

	@NameValidator(5, 45)
	location: TeacherAttributes["location"];

	@IsPositive()
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	salary: TeacherAttributes["salary"];
}
