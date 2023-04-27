import { Optional } from "sequelize";

export interface SubjectAttributes {
    subject_id?: number;
    class_id: number;
    name: string;
    semester: number;
}

export interface SubjectCreationAttributes
    extends Optional<SubjectAttributes, "subject_id"> { }
