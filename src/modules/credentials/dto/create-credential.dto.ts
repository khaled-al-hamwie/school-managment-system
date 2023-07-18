import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, NotContains } from "class-validator";
import NameValidator from "src/core/common/validators/name.validator";
import { CredentialAttributes } from "../interfaces/credential.interface";

export class CreateCredentialDto {
    @ApiProperty({
        description: "the user email",
        default: "testseeder1@test.com",
    })
    @IsEmail()
    email: CredentialAttributes["email"];

    @ApiProperty({
        description: "the user password",
        default: "12312121212121212345",
    })
    @NotContains(" ", { message: "password should not contain a space" })
    @NameValidator(8, 40)
    password: CredentialAttributes["password"];

    @ApiProperty({
        description: "the user password",
        default: "testseeder1",
    })
    @NotContains(" ", { message: "user_name should not contain a space" })
    @NameValidator(3, 45)
    user_name: CredentialAttributes["user_name"];
}
