import { Optional } from "sequelize";
import { SubjectAttributes } from "src/modules/subjects/interfaces/subject.interface";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";

export interface TeachAttributes {
    teach_id?: number;
    teacher_id: TeacherAttributes["teacher_id"];
    subject_id: SubjectAttributes["subject_id"];
}

export type TeachCreationAttributes = Optional<TeachAttributes, "teach_id">;
