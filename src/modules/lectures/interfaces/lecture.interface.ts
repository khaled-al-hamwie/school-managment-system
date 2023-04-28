import { Optional } from "sequelize";

export interface LectureAttributes {
    lecture_id?: number;
    room_id: number;
    teach_id: number;
    day: number;
    period: number;
}

export interface LectureCreationAttributes
    extends Optional<LectureAttributes, "lecture_id"> { }
