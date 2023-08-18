import NameValidator from "src/core/common/validators/name.validator";
import { StudentAttributes } from "../interfaces/student.interface";

export class PutStudentDto {
    @NameValidator(0, 1500)
    token: StudentAttributes["fbt"];
}
