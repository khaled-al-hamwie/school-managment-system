import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { SubjectAttributes } from "src/modules/subjects/interfaces/subject.interface";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";
import { ExamAttributes } from "../interfaces/exam.interface";

export class FindAllExamDto {
    @IsOptional()
    @Transform(({ value }) => +value)
    @IsInt()
    room_id?: ExamAttributes["room_id"];

    @IsOptional()
    @Transform(({ value }) => +value)
    @IsInt()
    subject_id?: SubjectAttributes["subject_id"];
    teacher_id: TeacherAttributes["teacher_id"];
}
