import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    ArrayMinSize,
    ArrayUnique,
    IsEnum,
    IsISO8601,
    IsInt,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    Max,
    Min,
} from "class-validator";
import { GenderEnum } from "src/core/common/enums/gender.enum";
import tolowerCaseTransform from "src/core/common/transformers/tolowercase.transform";
import NameValidator from "src/core/common/validators/name.validator";
import { CreateCredentialDto } from "src/modules/credentials/dto/create-credential.dto";
import { SubjectAttributes } from "src/modules/subjects/interfaces/subject.interface";
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

    @IsOptional()
    @ArrayUnique()
    @ApiProperty({ minimum: 1, maximum: 65535, default: [12, 20] })
    @IsInt({ each: true })
    @Min(1, { each: true })
    @Max(65535, { each: true })
    @ArrayMinSize(1)
    subject_ids?: SubjectAttributes["subject_id"][];
}
