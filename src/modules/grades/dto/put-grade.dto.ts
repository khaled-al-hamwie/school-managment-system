import { IsBoolean } from "class-validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { GradeAttributes } from "../interfaces/grade.interface";

export class PutGradeDto {
    @NumberValidator(0, 100)
    grade: GradeAttributes["grade"];

    @IsBoolean()
    checked: GradeAttributes["checked"];
}
