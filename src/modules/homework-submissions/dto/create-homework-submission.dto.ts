import { IsUrl, MaxLength } from "class-validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { StudentAttributes } from "src/modules/students/interfaces/student.interface";
import { HomeworkSubmissionAttributes } from "../interfaces/homework-submission.interface";

export class CreateHomeworkSubmissionDto {
    @MaxLength(500)
    @IsUrl()
    drive_link: HomeworkSubmissionAttributes["drive_link"];

    @NumberValidator(1, 65535)
    homework_id: HomeworkSubmissionAttributes["homework_id"];

    student_id: StudentAttributes["student_id"];
}
