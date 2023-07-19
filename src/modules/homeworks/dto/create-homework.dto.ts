import { IsValidDate } from "src/core/common/validators/date.validator";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { SubjectAttributes } from "src/modules/subjects/interfaces/subject.interface";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";
import { HomeworkAttributes } from "../interfaces/homework.interface";

export class CreateHomeworkDto {
    @NumberValidator(1, 65535)
    room_id: HomeworkAttributes["room_id"];
    @NumberValidator(1, 65535)
    subject_id: SubjectAttributes["subject_id"];
    @IsValidDate()
    deadline_date: HomeworkAttributes["deadline_date"];
    @NameValidator(1, 250)
    description: HomeworkAttributes["description"];
    teacher_id: TeacherAttributes["teacher_id"];
}
