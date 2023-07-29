import { IsISO8601, IsUrl, MaxLength } from "class-validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { SubjectAttributes } from "src/modules/subjects/interfaces/subject.interface";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";
import { ExamAttributes } from "../interfaces/exam.interface";

export class CreateExamDto {
    @NumberValidator(1, 65535)
    room_id: ExamAttributes["room_id"];
    @NumberValidator(1, 65535)
    subject_id: SubjectAttributes["subject_id"];
    @IsISO8601()
    exam_date: ExamAttributes["exam_date"] | string;
    @MaxLength(500)
    @IsUrl()
    exam_link: ExamAttributes["exam_link"];
    teacher_id: TeacherAttributes["teacher_id"];
}
