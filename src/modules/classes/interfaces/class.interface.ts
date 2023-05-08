import { Optional } from "sequelize";

export interface ClassAttributes {
    class_id?: number;
    name: string;
    number_of_lectures: number;
    lecture_length: number;
    rest_length: number;
}

export type ClassCreationAttributes = Optional<ClassAttributes, "class_id">;
