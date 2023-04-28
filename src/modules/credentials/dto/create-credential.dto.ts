import { IsEmail, NotContains } from "class-validator";
import NameValidator from "src/core/validators/name.validator";
import { CredentialAttributes } from "../interfaces/credential.interface";

export class CreateCredentialDto {
	@IsEmail()
	email: CredentialAttributes["email"];

	@NotContains(" ", { message: "password should not contain a space" })
	@NameValidator(20, 40)
	password: CredentialAttributes["password"];

	@NotContains(" ", { message: "user_name should not contain a space" })
	@NameValidator(3, 45)
	user_name: CredentialAttributes["user_name"];
}
