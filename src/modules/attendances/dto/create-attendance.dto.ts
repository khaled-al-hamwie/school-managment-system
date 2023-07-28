import { IsOptional } from "class-validator";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";

export class CreateAttendanceDto {
    @NumberValidator(1, 2343)
    student_id: number;

    @IsOptional()
    @NameValidator(3, 245)
    reason: string;
}
