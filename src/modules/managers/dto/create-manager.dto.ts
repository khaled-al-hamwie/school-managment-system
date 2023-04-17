import { IsNumber, IsPhoneNumber, IsPositive } from "class-validator";
import NameValidator from "src/core/validators/name.validator";
import { CreateCredentialDto } from "src/modules/credentials/dto/create-credential.dto";
import { ManagerAttributes } from "../interfaces/manager.interface";

export class CreateManagerDto extends CreateCredentialDto {
	@NameValidator(5, 45)
	first_name: ManagerAttributes["first_name"];

	@NameValidator(5, 45)
	middle_name: ManagerAttributes["middle_name"];

	@NameValidator(5, 45)
	last_name: ManagerAttributes["last_name"];

	@IsPhoneNumber("SY")
	phone_number: ManagerAttributes["phone_number"];

	@NameValidator(5, 45)
	location: ManagerAttributes["location"];

	@IsPositive()
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	salary: ManagerAttributes["salary"];
}
