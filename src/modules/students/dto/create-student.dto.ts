import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsISO8601, IsOptional, IsPhoneNumber } from "class-validator";
import { GenderEnum } from "src/core/common/enums/gender.enum";
import tolowerCaseTransform from "src/core/common/transformers/tolowercase.transform";
import NameValidator from "src/core/common/validators/name.validator";
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

    @ApiProperty({ type: "ISO8601 date", default: "2020-02-12" })
    @IsISO8601()
    birth_day: StudentAttributes["birth_day"] | string;

    @ApiProperty({ enum: GenderEnum, default: "f" })
    @Transform(tolowerCaseTransform)
    @NameValidator(1, 2)
    @IsEnum(GenderEnum)
    gender: StudentAttributes["gender"];

    @IsOptional()
    @NameValidator(2, 10)
    nationality?: StudentAttributes["nationality"];

    @ApiProperty({ default: "0944332211" })
    @IsPhoneNumber("SY")
    phone_number: StudentAttributes["phone_number"];

    @NameValidator(5, 45)
    location: StudentAttributes["location"];
}
