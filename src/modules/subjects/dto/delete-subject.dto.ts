import { PickType } from "@nestjs/swagger";
import { CreateSubjectDto } from "./create-subject.dto";

export class DeleteSubjectDto extends PickType(CreateSubjectDto, [
    "teacher_ids",
]) {}
