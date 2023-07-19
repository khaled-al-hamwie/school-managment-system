import { IsBoolean, IsOptional } from "class-validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";
import { HomeworkSubmissionAttributes } from "../interfaces/homework-submission.interface";

export class PutHomeworkSubmissionDto {
    @IsOptional()
    @IsBoolean()
    is_checked: HomeworkSubmissionAttributes["is_checked"];

    @IsOptional()
    @NumberValidator(0, 100)
    grade: HomeworkSubmissionAttributes["grade"];

    teacher_id: TeacherAttributes["teacher_id"];
}
