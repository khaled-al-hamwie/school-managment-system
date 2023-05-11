import { ApiProperty } from "@nestjs/swagger";
import {
    ArrayMinSize,
    ArrayUnique,
    IsInt,
    IsOptional,
    Max,
    Min,
} from "class-validator";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";
import { SubjectAttributes } from "../interfaces/subject.interface";

export class CreateSubjectDto {
    @NameValidator(3, 26)
    name: SubjectAttributes["name"];

    @NumberValidator(1, 65536)
    class_id: SubjectAttributes["class_id"];

    @NumberValidator(1, 10)
    semester: SubjectAttributes["semester"];

    @IsOptional()
    @ArrayUnique()
    @ApiProperty({ minimum: 1, maximum: 65535, default: [12, 20] })
    @IsInt({ each: true })
    @Min(1, { each: true })
    @Max(65535, { each: true })
    @ArrayMinSize(1)
    teacher_ids?: TeacherAttributes["teacher_id"][];
}
