import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateStudentDto } from "./create-student.dto";

export class UpdateStudentDto extends PartialType(
    OmitType(CreateStudentDto, ["user_name", "email"])
) {}
