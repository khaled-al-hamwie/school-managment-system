import { IsEnum, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "src/core/common/enums/gender.enum";
import { TeacherAttributes } from "../interfaces/teacher.interface";

export class FindAllTeacherDto {
    @IsOptional()
    @IsString()
    first_name: TeacherAttributes["first_name"];

    @IsOptional()
    @IsString()
    last_name: TeacherAttributes["last_name"];

    @IsOptional()
    @IsString()
    middle_name: TeacherAttributes["middle_name"];

    @IsOptional()
    @IsEnum(GenderEnum)
    gender: TeacherAttributes["gender"];
}
