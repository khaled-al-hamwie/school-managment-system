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
import { GenderEnum } from "src/core/common/enums/gender.enum";
import tolowerCaseTransform from "src/core/common/transformers/tolowercase.transform";
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

    @ApiProperty({ type: "ISO8601 date", default: "2020-02-12" })
    @IsISO8601()
    birth_day: ManagerAttributes["birth_day"] | string;

    @ApiProperty({ enum: GenderEnum, default: "f" })
    @Transform(tolowerCaseTransform)
    @NameValidator(1, 2)
    @IsEnum(GenderEnum)
    gender: ManagerAttributes["gender"];

    @IsOptional()
    @NameValidator(2, 10)
    nationality?: ManagerAttributes["nationality"];

    @ApiProperty({ default: "0944332211" })
    @IsPhoneNumber("SY")
    phone_number: ManagerAttributes["phone_number"];

    @NameValidator(5, 45)
    location: ManagerAttributes["location"];

    @IsPositive()
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    salary: ManagerAttributes["salary"];
}
