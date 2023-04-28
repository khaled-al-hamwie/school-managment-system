import { Optional } from "sequelize";

export interface ClassAttributes {
    class_id?: number;
    name: string;
    max_rooms: number;
}

export interface ClassCreationAttributes
    extends Optional<ClassAttributes, "class_id"> { }
