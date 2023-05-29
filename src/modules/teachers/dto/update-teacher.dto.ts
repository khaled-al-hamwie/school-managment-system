import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTeacherDto } from "./create-teacher.dto";

export class UpdateTeacherDto extends PartialType(
    OmitType(CreateTeacherDto, ["user_name", "email"])
) {}
