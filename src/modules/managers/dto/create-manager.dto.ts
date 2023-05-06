import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPhoneNumber, IsPositive } from "class-validator";
import NameValidator from "src/core/common/validators/name.validator";
import { CreateCredentialDto } from "src/modules/credentials/dto/create-credential.dto";
import { ManagerAttributes } from "../interfaces/manager.interface";

export class CreateManagerDto extends CreateCredentialDto {
    @ApiProperty({ description: "the first name" })
    @NameValidator(5, 45)
    first_name: ManagerAttributes["first_name"];

    @NameValidator(5, 45)
    middle_name: ManagerAttributes["middle_name"];

    @NameValidator(5, 45)
    last_name: ManagerAttributes["last_name"];

    @ApiProperty({ default: "0944332211" })
    @IsPhoneNumber("SY")
    phone_number: ManagerAttributes["phone_number"];

    @NameValidator(5, 45)
    location: ManagerAttributes["location"];

    @IsPositive()
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    salary: ManagerAttributes["salary"];
}
