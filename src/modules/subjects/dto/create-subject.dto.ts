import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { SubjectAttributes } from "../interfaces/subject.interface";

export class CreateSubjectDto {
    @NameValidator(3, 16)
    name: SubjectAttributes["name"];

    @NumberValidator(1, 65536)
    class_id: SubjectAttributes["class_id"];

    @NumberValidator(1, 10)
    semester: SubjectAttributes["semester"];
}
