import { PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { SubjectAttributes } from "../interfaces/subject.interface";
import { CreateSubjectDto } from "./create-subject.dto";

export class FindAllSubjectDto extends PartialType(CreateSubjectDto) {
    @Transform(({ value }) => +value)
    class_id?: SubjectAttributes["class_id"];

    @Transform(({ value }) => +value)
    semester?: SubjectAttributes["semester"];
}
